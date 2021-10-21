export const colorScale = (value) => {
  if (value > 0.6) return 4;
  if (value > 0.3) return 3;
  if (value > 0.1) return 2;
  return 1;
};

export const colorDivisions = [1, 2, 3, 4];

export const TOTAL_AREA = 748 * 10000; // each dot is 10000km2 in the Ecuador
