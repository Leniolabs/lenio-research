import { INNER_HEX_COLORS } from "../constants";

export const howToPaintHexes = (hexes, data) => {
  // data should be numbers that sum 1
  let accumulated = 0;
  let currentDivision = 0;

  const divisions = data.map((v, idx, arr) => arr.slice(0, idx + 1).reduce((a, b) => a + b, 0));
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
    return INNER_HEX_COLORS[currentDivision];
  });
};
