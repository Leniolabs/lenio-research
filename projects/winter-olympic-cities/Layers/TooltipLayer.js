import * as React from "react";
import { Popup } from "maplibre-gl";

export function useTooltipLayer(map, cities) {
  const [id] = React.useState("tooltip-layer");

  const geojson = React.useMemo(() => {
    return {
      type: "FeatureCollection",
      features: cities.map((city) => {
        const [lng, lat] = city.coordinates;
        return {
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [lng - 0.5, lat - 0.5],
                [lng + 0.5, lat - 0.5],
                [lng + 0.5, lat + 0.5],
                [lng - 0.5, lat + 0.5]
              ]
            ]
          },
          properties: {
            ...city,
            lat,
            lng
          },
          type: "Feature"
        };
      })
    };
  }, [cities]);

  React.useEffect(() => {
    if (map) {
      const source = {
        type: "geojson",
        data: null
      };

      const layer = {
        id,
        type: "fill-extrusion",
        source: id,
        paint: {
          "fill-extrusion-color": "#ff0000",
          "fill-extrusion-height": 500000,
          "fill-extrusion-base": 0,
          "fill-extrusion-opacity": 0
        }
      };

      map.addSource(id, source).addLayer(layer);

      const popup = new Popup({
        closeButton: false,
        closeOnClick: false,
        anchor: "left",
        offset: [10, -30]
      });

      const handleMouseEnter = (e) => {
        map.getCanvas().style.cursor = "pointer";

        const coordinates = [e.features[0].properties.lng, e.features[0].properties.lat];
        const { name, year, days, light } = e.features[0].properties;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        popup
          .setLngLat(coordinates)
          .setHTML(
            `<div class="tooltip-content">
                <div class="tooltip-title">${name} (${year})</div>
                <div># Days < 0°C: <b>${days.toFixed(0)}</b></div>
                <div>Suitable host: <b>${light ? "YES" : "NO"}</b></div>
            </div>`
          )
          .addTo(map);
      };

      const handleMouseLeave = (e) => {
        console.log(e);
        map.getCanvas().style.cursor = "";
        popup.remove();
      };

      map.on("mouseenter", id, handleMouseEnter);
      map.on("mouseleave", id, handleMouseLeave);

      return () => {
        if (map.getSource(id)) {
          map.removeLayer(id).removeSource(id);
          map.off("mouseenter", id, handleMouseEnter);
          map.off("mouseleave", id, handleMouseLeave);
        }
      };
    }
  }, [map, id]);

  React.useEffect(() => {
    if (map) {
      map.getSource(id)?.setData(geojson);
    }
  }, [id, map, geojson]);

  return null;
}
