import treeCoverTarget from "./treeCoverTarget";
import { data } from "../data";
import newTreeCoverLoss from "./newTreeCoverLoss";

export const colorScale = (value) => {
  if (value > 0.6) return 4;
  if (value > 0.3) return 3;
  if (value > 0.1) return 2;
  return 1;
};

export const colorDivisions = [1, 2, 3, 4];

export const TOTAL_AREA = 748 * 10000; // each dot is 10000km2 in the Ecuador

const randomizedTreeCoverTarget = treeCoverTarget.map((value) => {
  if (value === 0.75) {
    return 0.4 + Math.random() * 0.35;
  }
  return value;
});

export const interpolateTreeCover = (previousTreeCover) => {
  return previousTreeCover.map((prevValue, index) => {
    return (randomizedTreeCoverTarget[index] - prevValue) * 0.05 + prevValue;
  });
};

const temp = {};

data.forEach(({ year }) => {
  if (year < 2021) {
    temp[year] = newTreeCoverLoss[year];
  } else {
    temp[year] = interpolateTreeCover(temp[year - 1]);
  }
});

export const interpolatedCoverLoss = temp;
