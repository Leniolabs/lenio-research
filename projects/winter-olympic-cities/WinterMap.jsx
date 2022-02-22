import * as React from "react";
import { Map, Popup } from "maplibre-gl";
import { scaleLinear } from "d3-scale";
import "maplibre-gl/dist/maplibre-gl.css";

import cities from "./cities.json";
import snow from "./snow.json";

import { useHeatmap, useTorchLayer, useSnowLayer, useTooltipLayer } from "./Layers";
import { MapContainer } from "./winter-olympic-cities.style";

//https://impactlab.org/map/#usmeas=absolute&usyear=2020-2039&gmeas=absolute&gyear=1986-2005&tab=global&gvar=tasmin-under-32F

export function WinterMap({ region, daysThreshold, year, percentile, position, onPositionChange }) {
  const [map, setMap] = React.useState();

  React.useEffect(() => {
    const _map = new Map({
      container: "map-container",
      pitch: 60,
      antialias: true,
      zoom: 2.3,
      center: [-35, 0], //[0, 50],
      bearing: 15,
      renderWorldCopies: false,
      minZoom: 2,
      maxZoom: 4,
      style: {
        version: 8,
        sources: {
          background: {
            type: "raster",
            tiles: ["https://s.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png"],
            scheme: "xyz",
            tileSize: 512
          },
          openmaptiles: {
            url: "https://api.maptiler.com/tiles/v3/tiles.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
            type: "vector"
          }
        },
        layers: [
          {
            id: "background",
            type: "raster",
            source: "background",
            minzoom: 0,
            maxzoom: 10
          }
        ]
      }
    });

    _map.on("load", () => {
      setMap(_map);
    });
  }, []);

  React.useEffect(() => {
    if (onPositionChange) {
      const handler = (e) => {
        const { lng, lat } = map.getCenter();
        const zoom = map.getZoom();
        onPositionChange({ center: [lng, lat], zoom });
      };

      map?.on("moveend", handler);

      return () => {
        map?.off("moveend", handler);
      };
    }
  }, [map, onPositionChange, region]);

  React.useEffect(() => {
    if (map) {
      console.log(position);
      map.flyTo(position);
    }
  }, [map, position]);

  const snowPoints = React.useMemo(() => {
    return snow.map(([lng, lat, ...rest]) => {
      const y_2005 = rest[0 + percentile];
      const y_2039 = rest[3 + percentile];
      const y_2059 = rest[6 + percentile];
      const y_2099 = rest[9 + percentile];

      let amount = 0;

      if (year <= 2039) {
        amount = scaleLinear().range([y_2005, y_2039]).domain([2005, 2039])(year);
      } else if (year <= 2059) {
        amount = scaleLinear().range([y_2039, y_2059]).domain([2039, 2059])(year);
      } else if (year <= 2099) {
        amount = scaleLinear().range([y_2059, y_2099]).domain([2059, 2099])(year);
      }

      return [lng, lat, amount];
    });
  }, [year, percentile]);

  useSnowLayer(map, daysThreshold, snowPoints);

  const torches = React.useMemo(() => {
    return cities.map((city) => {
      const [lng, lat] = city.coordinates;

      const snow = snowPoints.find(
        ([slng, slat]) => slng - 1 < lng && slng + 1 > lng && slat - 1 < lat && slat + 1 > lat
      );

      return {
        ...city,
        coordinates: [lng, lat],
        light: snow && snow[2] >= daysThreshold,
        days: snow[2]
      };
    });
  }, [cities, snowPoints, daysThreshold]);

  useTorchLayer(map, torches);

  useHeatmap(map, snowPoints, daysThreshold);
  useTooltipLayer(map, torches);

  return <MapContainer id="map-container" />;
}
