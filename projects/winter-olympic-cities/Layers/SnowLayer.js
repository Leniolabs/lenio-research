import * as React from "react";
import * as THREE from "three";
import { MercatorCoordinate } from "maplibre-gl";

export function useSnowLayer(map, threshold, snowPoints) {
  const [id] = React.useState("snow-layer");
  const ids = React.useRef([]);
  const particles = React.useRef([]);
  const velocities = React.useRef([]);

  const [mounted, setMounted] = React.useState(false);

  const animationFrame = React.useRef(null);

  const customLayer = React.useMemo(() => {
    return {
      id,
      type: "custom",
      renderingMode: "3d",
      subframe: 0,
      handler: 0,

      onAdd: function (map, gl) {
        this.map = map;

        this.center = MercatorCoordinate.fromLngLat(map.getCenter(), 0);
        const { x, y, z } = this.center;

        this.cameraTransform = new THREE.Matrix4().makeTranslation(x, y, z);

        this.scene = new THREE.Scene();

        this.scene.fog = new THREE.Fog(0x000036, 0, 2);

        this.camera = new THREE.Camera();

        this.renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true,
          alpha: true
        });
        this.renderer.shadowMap.enabled = true;

        this.renderer.autoClear = false;

        const ambientLight = new THREE.AmbientLight(0x666666);
        this.scene.add(ambientLight);

        const geometry = new THREE.PlaneGeometry(0.0001, 0.0001);
        const material = new THREE.MeshBasicMaterial({
          color: 0x000000,
          side: THREE.DoubleSide
        });
        const plane = new THREE.Mesh(geometry, material);
        plane.position.set(0, 0, 0);
        this.scene.add(plane);

        const points = [];
        for (let i = 0; i < snowPoints.length; i++) {
          const [lng, lat, amount] = snowPoints[i];

          for (let j = 0; j < 10; j++) {
            const dx = Math.random() * 2 - 1;
            const dy = Math.random() * 2 - 1;

            const _lng = (() => {
              if (lng + dx < -180) return -180;
              if (lng + dx > 180) return 180;
              return lng + dx;
            })();

            const _lat = (() => {
              if (lat + dy < -90) return -90;
              if (lat + dy > 90) return 90;
              return lat + dy;
            })();

            const coord = MercatorCoordinate.fromLngLat([_lng, _lat], Math.random() * 5000000);

            points.push({
              id: `${lng}-${lat}`,
              position: new THREE.Vector3(coord.x - this.center.x, coord.y - this.center.y, coord.z)
            });
          }
        }

        particles.current = [];
        points.forEach((point, i) => {
          const geometry = new THREE.SphereGeometry(0.0001 * Math.random() + 0.0001, 10, 10);
          const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            opacity: 0,
            transparent: true
          });
          const sphere = new THREE.Mesh(geometry, material);

          sphere.position.set(point.position.x, point.position.y, point.position.z);

          ids.current.push(point.id);
          particles.current.push(sphere);
          if (sphere.material.opacity > 0) {
            this.scene.add(sphere);
          }
        });

        velocities.current = [];
        for (let i = 0; i < points.length; i++) {
          const x = Math.random() * 0.1 - 0.05;
          const y = Math.random() * 0.1 - 0.05;
          const z = Math.random() * 0.0001 + 0.0001;
          const particle = new THREE.Vector3(x, y, z);
          velocities.current.push(particle);
        }

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
  }, []);

  React.useEffect(() => {
    if (map && id) {
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
      const dict = snowPoints.reduce((r, [lng, lat, amount]) => {
        const id = `${lng}-${lat}`;
        r[id] = amount;
        return r;
      }, {});

      ids.current.forEach((id, i) => {
        const v = dict[id];
        if (particles.current[i]) {
          if (v && v > threshold) {
            if (particles.current[i].material.opacity === 0) {
              customLayer.scene.add(particles.current[i]);
            }
            particles.current[i].material.opacity = 0.5;
          } else {
            particles.current[i].material.opacity = 0;
            customLayer.scene.remove(particles.current[i]);
          }
        }
      });

      function animate(timeStamp) {
        if (particles.current) {
          const posArr = particles.current;
          const velArr = velocities.current;

          const t = (d) => (timeStamp % (2 * 50000 * d)) / (50000 * d);

          for (let i = 0; i < posArr.length; i++) {
            if (posArr[i].material.opacity) {
              let { x, y, z } = posArr[i].position;
              const velocity = velArr[i];

              if (z <= 0) {
                z = 0;
                if (Math.random() < 0.001) {
                  z = Math.random() * 0.3;
                }
              } else {
                x += Math.sin(2 * Math.PI * t(velocity.x)) * velocity.x * 0.001;
                y += Math.cos(2 * Math.PI * t(velocity.y)) * velocity.y * 0.001;
                z += -velocity.z;
              }
              posArr[i].position.set(x, y, z);
            }
          }
          animationFrame.current = requestAnimationFrame(animate);
        }
      }

      animate(0);

      return () => {
        if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      };
    }
  }, [snowPoints, threshold, mounted]);
}
