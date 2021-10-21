/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { scaleLinear } from "d3-scale";
import { AnimatePresence, motion } from "framer-motion";
import treeCover from "./treeCover";
import treeCoverLoss from "./treeCoverLoss";

const COLORS = ["#FFFFFF", "#99B898", "#FECEAB", "#FF847C", "#ff0000"];

export const AmazonasMap = ({ currentYear = 2001 }) => {
  const xScale = scaleLinear().domain([0, 40]).range([60, 550]);
  const yScale = scaleLinear().domain([0, 40]).range([110, 660]);

  const dataIndex = currentYear - 2001;

  const lossData = React.useMemo(() => {
    const l = treeCoverLoss[dataIndex];
    return l || treeCoverLoss[treeCoverLoss.length - 1];
  }, [currentYear]);

  const colorScale = (value) => {
    if(value > 0.6) return 4
    if(value > 0.3) return 3
    if(value > 0.1) return 2
    return 1
  };

  return (
    <>
      <motion.g transform="translate(400, 245) scale(1.05)">
        <AnimatePresence>
          {treeCover.map(({ x, y, z, rainforest }, index) => {
            if (!z || !rainforest) return null;

            const treeLossValue = colorScale(lossData.find((row) => row.x === x && row.y === y)?.z);

            return (
              <motion.circle
                key={`circle_${index}`}
                cy={yScale(y)}
                cx={xScale(x)}
                animate={{
                  fill: treeLossValue ? COLORS[treeLossValue] : COLORS[0],
                  // fillOpacity: treeLossValue > 2 ? 0.5 : 0.7,
                  r: treeLossValue > 2 ? 4 : 5
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
