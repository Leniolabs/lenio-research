const TableConstants = {
  BOTTOM_LIMIT: 942,
  TOP_LIMIT: 83,
  LEFT_LIMIT: 136,
  RIGHT_LIMIT: 782,
  // 1% in table is equal to near 8.6 points:
  // (BOTTOM_LIMIT - TOP_LIMIT) / 100 => (942 - 83) / 100
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
  const { BOTTOM_LIMIT, PERCENTAGE_IN_POINTS } = TableConstants;

  return (BOTTOM_LIMIT - percentage * PERCENTAGE_IN_POINTS).toFixed(2);
};

export const buildMeasureXCoordinate = (index, numOfElements) => {
  const { RIGHT_LIMIT, LEFT_LIMIT } = TableConstants;
  const spaceBetweenPoints = (RIGHT_LIMIT - LEFT_LIMIT) / (numOfElements - 1);

  return (LEFT_LIMIT + spaceBetweenPoints * index).toFixed(2);
};
