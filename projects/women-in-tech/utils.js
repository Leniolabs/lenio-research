import { scaleLinear, scaleQuantize } from "d3-scale";
import { getScaledArray } from "./slotUtils";

export const GraphicConstants = Object.freeze({
  BOTTOM_LIMIT: 942,
  TOP_LIMIT: 83,
  LEFT_LIMIT: 136,
  RIGHT_LIMIT: 782
});

export const buildPath = (xValues, yValues) => {
  const startX = xValues[yValues[0].date].value;
  const startY = getVerticalPointFromPercentage(yValues[0].value);

  let string = `M ${startX} ${startY} L`;
  yValues.slice(1).forEach((entry) => {
    string += `${xValues[entry.date].value} ${getVerticalPointFromPercentage(entry.value)} `;
  });

  return string.slice(0, -1);
};

export const getVerticalPointFromPercentage = (percentage) => {
  const { TOP_LIMIT, BOTTOM_LIMIT } = GraphicConstants;
  const getVerticalPoint = scaleLinear().domain([0, 100]).range([BOTTOM_LIMIT, TOP_LIMIT]);

  return getVerticalPoint(percentage);
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

export const getLastItemVerticalPoint = (yPoints, numOfSlots) => {
  const { BOTTOM_LIMIT, TOP_LIMIT } = GraphicConstants;
  const lastYPercentage = yPoints[yPoints.length - 1].value;
  const verticalPoint = getVerticalPointFromPercentage(lastYPercentage);

  const getDiscretePosition = scaleQuantize()
    .domain([TOP_LIMIT, BOTTOM_LIMIT])
    .range(getScaledArray(numOfSlots));

  const discreteYPos = getDiscretePosition(verticalPoint);

  return buildMeasureYCoordinate(Math.abs(discreteYPos - numOfSlots), numOfSlots);
};
