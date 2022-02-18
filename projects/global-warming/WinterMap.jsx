import * as React from "react";
import { Map } from "maplibre-gl";
import { scaleLinear } from "d3-scale";

import cities from "./cities.json";
import snow from "./snow.json";

import { useHeatmap, useTorchLayer, useSnowLayer } from "./Layers";
import { MapContainer } from "./global-warming.style";

//https://impactlab.org/map/#usmeas=absolute&usyear=2020-2039&gmeas=absolute&gyear=1986-2005&tab=global&gvar=tasmin-under-32F

export function WinterMap({ region, daysThreshold, year, percentile }) {
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
          cities: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: cities.map((city) => ({
                geometry: {
                  type: "Point",
                  coordinates: city.coordinates
                },
                properties: {
                  ...city
                },
                type: "Feature"
              }))
            }
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
    if (map) {
      switch (region.value) {
        case "NA":
          map.flyTo({
            zoom: 4,
            center: [-100, 40]
          });
          break;
        case "EU":
          map.flyTo({
            zoom: 4,
            center: [20, 50]
          });
          break;
        case "ASIA":
          map.flyTo({
            zoom: 4,
            center: [125, 40]
          });
          break;
        default:
          map.flyTo({
            zoom: 1,
            center: [-35, 0]
          });
          break;
      }
    }
  }, [map, region]);

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
        coordinates: [lng, lat],
        light: snow && snow[2] >= daysThreshold
      };
    });
  }, [cities, snowPoints, daysThreshold]);

  useTorchLayer(map, torches);

  useHeatmap(map, snowPoints, daysThreshold);

  return <MapContainer id="map-container" />;
}
