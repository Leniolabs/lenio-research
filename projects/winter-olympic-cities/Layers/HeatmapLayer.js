import { Map } from "maplibre-gl";
import React from "react";

export function useHeatmap(map, snowPoints, daysThreshold) {
  const [id] = React.useState("heatmap-layer");

  const geojson = React.useMemo(() => {
    return {
      type: "FeatureCollection",
      features: snowPoints.map(([lng, lat, value]) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [lng, lat]
        },
        properties: {
          value: value / (daysThreshold || 1)
        }
      }))
    };
  }, [snowPoints, daysThreshold]);

  React.useEffect(() => {
    if (map) {
      const source = {
        type: "geojson",
        data: null
      };

      const layer = {
        id,
        type: "heatmap",
        source: id,
        maxZoom: 10,
        paint: {
          "heatmap-weight": [
            "interpolate",
            ["linear"],
            ["get", "value"],
            0,
            0,
            30 / 60,
            0,
            60 / 60,
            0.005,
            90 / 60,
            0.0315,
            120 / 60,
            0.025,
            240 / 60,
            0.05
          ],
          "heatmap-intensity": 1.6,
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(234, 234, 234, 0)",
            0.2,
            "rgb(162, 225, 223)",
            0.4,
            "rgb(111, 208, 214)",
            0.6,
            "rgb(85, 199, 210)",
            0.8,
            "rgb(75, 193, 210)",
            1,
            "rgb(65, 186, 209)"
          ],
          "heatmap-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            30,
            2,
            30,
            3,
            60,
            5,
            180,
            10,
            1000
          ],
          "heatmap-opacity": 1
        }
      };

      map.addSource(id, source).addLayer(layer);

      return () => {
        if (map.getSource(id)) {
          map.removeLayer(id).removeSource(id);
        }
      };
    }
  }, [map, id]);

  React.useEffect(() => {
    if (map) {
      map.getSource(id)?.setData(geojson);

      map
        .getLayer(id)
        .setPaintProperty("heatmap-weight", [
          "interpolate",
          ["linear"],
          ["get", "value"],
          0,
          0,
          30 / (daysThreshold || 1),
          0,
          60 / (daysThreshold || 1),
          0.005,
          90 / (daysThreshold || 1),
          0.0315,
          120 / (daysThreshold || 1),
          0.025,
          240 / (daysThreshold || 1),
          0.05
        ]);
    }
  }, [id, map, geojson, daysThreshold || 1]);

  return null;
}
