import { LEGEND_COLORS } from "./constants";
import { linearFit } from "./linearfits";

export const generateLegendMapping = (names, values, colors = LEGEND_COLORS) => {
  return names.map((name, idx) => {
    return { name, color: colors[idx], value: values ? values[idx] : undefined };
  });
};

export const generateScatterPlotData = (data, x, y, z) => {
  return data.map((row) => {
    return {
      state: row.State,
      code: row.code,
      x: row[x],
      y: row[y],
      z: row[z]
    };
  });
};

export const getLinearFitForPair = (a, b, startX = 0, endX = 60) => {
  const [slope, ord] = linearFit[`${a}, ${b}`];
  const f = (x) => x * slope + ord;
  let endY = f(endX);
  let startY = f(startX);
  if (startY < 0) {
    startX = (0 - ord) / slope;
    startY = f(startX);
  }
  if (endY > 80) {
    endX = (80 - ord) / slope;
    endY = f(endX);
  }
  if (endY < 0) {
    endX = (0 - ord) / slope;
    endY = f(endX);
  }
  return { x1: startX, y1: f(startX), x2: endX, y2: endY };
};
