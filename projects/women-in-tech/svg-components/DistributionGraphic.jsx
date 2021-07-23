import * as React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  DistributionContainer,
  DistributionFooter,
  DistributionMeasures,
  DistributionTitle,
  CareerEntry
} from "./graphic-fragments";
import { buildPath, GraphicConstants, getLastItemVerticalPoint } from "../utils";

const { RIGHT_LIMIT } = GraphicConstants;

const DistributionGraphic = ({ data, ...extraProps }) => {
  const {
    measures,
    measures: { xPoints },
    entries
  } = data;

  return (
    <DistributionContainer {...extraProps}>
      <DistributionTitle />

      {/* Entries Evolution + Career */}
      {entries.map((entry) => {
        const { yPoints, ...pathData } = entry.path;
        const path = buildPath(xPoints, yPoints);
        const lastPointY = getLastItemVerticalPoint(yPoints, yPoints.length * 2);

        return (
          <CareerEntry
            key={entry.text.value}
            onClick={(e) => console.log(e.currentTarget.closest("g"))}>
            <path {...pathData} d={path} />
            <text {...entry.text} transform={`translate(${RIGHT_LIMIT - 10} ${lastPointY})`}>
              {entry.text.value}
            </text>
          </CareerEntry>
        );
      })}

      <DistributionMeasures measures={measures} />
      <DistributionFooter />
    </DistributionContainer>
  );
};

const { shape, arrayOf, number, string } = PropTypes;

DistributionGraphic.propTypes = {
  data: shape({
    entries: arrayOf(
      shape({
        text: shape({
          children: string,
          transform: string,
          className: string
        }),
        path: shape({
          className: string,
          data: arrayOf(
            shape({
              date: string,
              value: number
            })
          )
        })
      })
    ),
    xPoints: PropTypes.any
  })
};

export default DistributionGraphic;
