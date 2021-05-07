import { LEGEND_COLORS } from "./constants";

export const generateLegendMapping = (names, values, colors = LEGEND_COLORS) => {
  return names.map((name, idx) => {
    return { name, color: colors[idx], value: values ? values[idx] : undefined };
  });
};

export const generateScatterPlotData = (data, x, y, z) => {
  return data.map((row) => {
    return {
      code: row.code,
      x: row[x],
      y: row[y],
      z: row[z]
    };
  });
};
