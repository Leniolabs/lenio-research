import { INNER_HEX_COLORS } from "../constants";

export const howToPaintHexes = (hexes, data, labelIdx) => {
  // data should be numbers that sum 1
  let accumulated = 0;
  let currentDivision = 0;

  const copy = [...data];
  const BACKGROUND_COLORS = [...INNER_HEX_COLORS];

  if (labelIdx !== undefined) {
    const aux = data[0];
    copy[0] = data[labelIdx];
    copy[labelIdx] = aux;
    BACKGROUND_COLORS.fill("#FFFFFF", 1, 5);
    BACKGROUND_COLORS[0] = INNER_HEX_COLORS[labelIdx];
  }

  const divisions = copy.map((v, idx, arr) => arr.slice(0, idx + 1).reduce((a, b) => a + b, 0));
  return hexes.map((hex) => {
    if (hex.length < 5) {
      // hex is just half of it
      accumulated += 0.02;
    } else {
      accumulated += 0.04;
    }
    if (accumulated > divisions[currentDivision]) {
      currentDivision += 1;
    }

    return BACKGROUND_COLORS[currentDivision];
  });
};
