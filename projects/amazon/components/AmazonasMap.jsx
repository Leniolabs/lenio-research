/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { scaleLinear } from "d3-scale";
import { AnimatePresence, motion } from "framer-motion";
import { colorScale } from "./utils";
import newTreeCover from "./newTreeCover";

const COLORS = ["#FFFFFF", "#99B898", "#FECEAB", "#FF847C", "#ff0000"];

// Mention that we are using the utilities D3.
// Mention that the data is in the range 0-40.

export const AmazonasMap = ({ lossData }) => {
  const xScale = scaleLinear().domain([0, 40]).range([60, 550]);
  const yScale = scaleLinear().domain([0, 40]).range([110, 660]);

  return (
    <>
      <motion.g transform="translate(400, 245) scale(1.05)" tabIndex="0">
        <AnimatePresence>
          {newTreeCover.map(({ x, y }, index) => {
            const treeLossValue = colorScale(lossData[index]);

            return (
              <motion.circle
                key={`circle_${index}`}
                cy={yScale(y)}
                cx={xScale(x)}
                animate={{
                  fill: treeLossValue ? COLORS[treeLossValue] : COLORS[0],
                  r: treeLossValue > 2 ? 5 : 4
                }}
                transition={{ duration: 0.25, type: "spring", stiffness: 20 }}
              />
            );
          })}
        </AnimatePresence>
      </motion.g>
    </>
  );
};

AmazonasMap.propTypes = {
  lossData: PropTypes.arrayOf(PropTypes.any)
};
