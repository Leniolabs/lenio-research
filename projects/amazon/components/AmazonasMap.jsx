/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { scaleLinear } from "d3-scale";
import { AnimatePresence, motion } from "framer-motion";
import treeCover from "./treeCover";
import treeCoverLoss from "./treeCoverLoss";

const COLORS = ["#7dc77f", "#f1364f", "#fe844a"];

export const AmazonasMap = ({ currentYear = 2001 }) => {
  const xScale = scaleLinear().domain([0, 20]).range([60, 550]);
  const yScale = scaleLinear().domain([0, 20]).range([110, 660]);

  const dataIndex = currentYear - 2001;

  const lossData = treeCoverLoss[dataIndex];

  return (
    <>
      <motion.g>
        <AnimatePresence>
          {treeCover.map(({ x, y, z, rainforest }, index) => {
            if (!z) return null;

            const treeLossValue = lossData.find((row) => row.x === x && row.y === y)?.z;

            return (
              <motion.circle
                key={`circle_${index}`}
                r={10}
                cy={yScale(y)}
                cx={xScale(x)}
                animate={{
                  fill: treeLossValue ? COLORS[Math.trunc(treeLossValue / 2)] : COLORS[0],
                  fillOpacity: treeLossValue > 2 ? 0.5 : 0.7
                }}
                // animate={`v${elem.value}`}
                // transition={{ duration: 0.25, type: "spring", stiffness: 20 }}
              />
            );
          })}
        </AnimatePresence>
      </motion.g>
    </>
  );
};

AmazonasMap.propTypes = {
  currentYear: PropTypes.number
};
