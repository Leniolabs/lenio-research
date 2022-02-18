import * as React from "react";
import * as THREE from "three";
import { MercatorCoordinate } from "maplibre-gl";

import { GLTFLoader } from "./GLTFLoader.js";
import { FontLoader } from "./FontLoader.js";
import { TextGeometry } from "./TextGeometry.js";

const modelURL = "/static/models/torch.glb";
const fontURL = "/static/models/droid_sans_regular.typeface.json";

function getSpriteMatrix(sprite, center) {
  const { model, position, altitude } = sprite;
  const { scale, rotate } = model;
  const rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), rotate[0]);
  const rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), rotate[1]);
  const rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), rotate[2]);

  const coord = MercatorCoordinate.fromLngLat(position, altitude);
  const modelScale = coord.meterInMercatorCoordinateUnits() * scale; // this one

  return new THREE.Matrix4()
    .makeTranslation(coord.x - center.x, coord.y - center.y, coord.z - center.z)
    .scale(new THREE.Vector3(modelScale, -modelScale, modelScale / 2)) // this one
    .multiply(rotationX)
    .multiply(rotationY)
    .multiply(rotationZ);
}

export function useTorchLayer(map, torches) {
  const [id] = React.useState("torch-layer");
  const mixer = React.useRef([]);
  const objects = React.useRef([]);
  const [model, setModel] = React.useState();
  const [font, setFont] = React.useState();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    let loader = new GLTFLoader();
    loader.load(modelURL, function (obj) {
      console.log(obj);
      setModel(obj);
    });

    const fontLoader = new FontLoader();
    fontLoader.load(fontURL, function (font) {
      setFont(font);
    });
  }, []);

  const customLayer = React.useMemo(() => {
    return {
      id,
      type: "custom",
      renderingMode: "3d",
      subframe: 0,
      handler: 0,

      onAdd: function (map, gl) {
        this.modelConfig = {
          scale: 50000,
          rotate: [Math.PI / 2, 0, 0]
        };

        this.camera = new THREE.Camera();

        this.center = MercatorCoordinate.fromLngLat(map.getCenter(), 0);
        const { x, y, z } = this.center;

        this.cameraTransform = new THREE.Matrix4().makeTranslation(x, y, z);

        this.scene = new THREE.Scene();

        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);

        var directionalLight2 = new THREE.DirectionalLight(0xffffff);
        directionalLight2.position.set(0, 70, 100).normalize();
        this.scene.add(directionalLight2);

        this.map = map;

        this.renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true
        });

        // this.renderer.gammaOutput = true;
        //   this.renderer.gammaFactor = 2.2;

        this.renderer.autoClear = false;

        const fontMaterials = [
          new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
          new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
        ];

        const labels = torches.map((torch) => {
          const scene = new TextGeometry(torch.name || "Hola", {
            font: font,

            size: 1.5,
            height: 1,
            curveSegments: 4,

            bevelThickness: 0.005,
            bevelSize: 0.01,
            bevelEnabled: true
          });

          const textMesh = new THREE.Mesh(scene, fontMaterials);

          scene.applyMatrix4(
            getSpriteMatrix(
              {
                model: this.modelConfig,
                position: {
                  lng: torch.coordinates[0] + 0.5,
                  lat: torch.coordinates[1] + 0.5
                },
                altitude: 0
              },
              this.center
            )
          );

          textMesh.position.z = 0;

          // textMesh.rotation.x = 0;
          // textMesh.rotation.y = Math.PI * 2;

          return textMesh;
        });

        objects.current = torches.map((torch) => {
          const scene = model.scene.clone();

          scene.children[0].children[0].children[0].children[0].children[0].visible = !!torch.light;

          scene.applyMatrix4(
            getSpriteMatrix(
              {
                model: this.modelConfig,
                position: {
                  lng: torch.coordinates[0],
                  lat: torch.coordinates[1]
                },
                altitude: 0
              },
              this.center
            )
          );

          return scene;
        });

        mixer.current = [];
        objects.current.forEach((obj) => {
          this.scene.add(obj);

          mixer.current.push(new THREE.AnimationMixer(obj));
        });
        labels.forEach((label) => {
          this.scene.add(label);
        });

        model.animations.forEach((clip) => {
          mixer.current.forEach((mixer) => {
            mixer.clipAction(clip).play();
          });
        });

        setMounted(true);
      },
      render: function (gl, matrix) {
        this.camera.projectionMatrix = new THREE.Matrix4()
          .fromArray(matrix)
          .multiply(this.cameraTransform);
        this.renderer.state.reset();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
      }
    };
  }, [id, model, font]);

  React.useEffect(() => {
    if (map && id && customLayer) {
      map.addLayer(customLayer);

      return () => {
        if (map && id) {
          map.removeLayer(id);
          setMounted(false);
        }
      };
    }
  }, [map, id, customLayer]);

  React.useEffect(() => {
    if (mounted) {
      var butt_clock = new THREE.Clock();
      function render_butt() {
        const delta = butt_clock.getDelta();
        for (var i = 0; i < mixer.current.length; i++) {
          if (mixer.current[i] != null) mixer.current[i].update(delta * 2);
        }
        requestAnimationFrame(render_butt);
      }
      render_butt();
    }
  }, [mounted]);

  React.useEffect(() => {
    if (mounted) {
      objects.current.forEach((scene, i) => {
        scene.children[0].children[0].children[0].children[0].children[0].visible =
          !!torches[i].light;
      });
    }
  }, [torches]);
}
