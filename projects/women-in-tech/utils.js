const TABLE_CONSTANTS = {
  BOTTOM: 942,
  TOP: 83,
  // 1% in table is equal to near 8.6 points:
  // (BOTTOM - TOP) / 100 => (942 - 83) / 100
  PERCENTAGE_IN_POINTS: 8.62
};

export const buildPath = (xValues, yValues) => {
  const startX = xValues[yValues[0].date];
  const startY = getVerticalPointFromPercentage(yValues[0].value);

  let string = `M ${startX} ${startY} L`;
  yValues.slice(1).forEach((entry) => {
    string += `${xValues[entry.date]} ${getVerticalPointFromPercentage(entry.value)} `;
  });

  return string.slice(0, -1);
};

const getVerticalPointFromPercentage = (percentage) => {
  const { BOTTOM, PERCENTAGE_IN_POINTS } = TABLE_CONSTANTS;

  return (BOTTOM - percentage * PERCENTAGE_IN_POINTS).toFixed(2);
};
