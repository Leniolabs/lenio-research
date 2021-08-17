import { scaleLinear } from "d3-scale";

export const GraphicConstants = Object.freeze({
  BOTTOM_LIMIT: 942,
  TOP_LIMIT: 83,
  LEFT_LIMIT: 136,
  RIGHT_LIMIT: 782
});

export const buildPath = (xValues, yValues, { yDomain = [0, 100] }) => {
  const startX = xValues[yValues[0].date].value;
  const startY = getVerticalPointFromDomain(yDomain, yValues[0].value);

  let string = `M ${startX} ${startY} L`;
  yValues.slice(1).forEach((entry) => {
    string += `${xValues[entry.date].value} ${getVerticalPointFromDomain(yDomain, entry.value)} `;
  });

  return string.slice(0, -1);
};

export const getVerticalPointFromDomain = (domain, input) => {
  const { TOP_LIMIT, BOTTOM_LIMIT } = GraphicConstants;
  const getVerticalPoint = scaleLinear().domain(domain).range([BOTTOM_LIMIT, TOP_LIMIT]);

  return getVerticalPoint(input);
};

export const buildMeasureXCoordinate = (index, numOfElements) => {
  const { RIGHT_LIMIT, LEFT_LIMIT } = GraphicConstants;

  const getMeasureX = scaleLinear()
    .domain([0, numOfElements - 1])
    .range([LEFT_LIMIT, RIGHT_LIMIT]);

  return getMeasureX(index);
};

export const buildMeasureYCoordinate = (index, numOfElements) => {
  const { BOTTOM_LIMIT, TOP_LIMIT } = GraphicConstants;

  const getMeasureY = scaleLinear()
    .domain([0, numOfElements - 1])
    .range([BOTTOM_LIMIT, TOP_LIMIT]);

  return getMeasureY(index);
};

export const getLastItem = (arr) => arr[arr.length - 1];
