/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { scaleLinear } from "d3-scale";
import { AnimatePresence, motion } from "framer-motion";
import treeCover from "./treeCover";
import treeCoverLoss from "./treeCoverLoss";

const COLORS = ["#FFFFFF", "#99B898", "#FECEAB", "#FF847C", "#E84A5F"];

export const AmazonasMap = ({ currentYear = 2001 }) => {
  const xScale = scaleLinear().domain([0, 20]).range([60, 550]);
  const yScale = scaleLinear().domain([0, 20]).range([110, 660]);

  const dataIndex = currentYear - 2001;

  const lossData = React.useMemo(() => {
    const l = treeCoverLoss[dataIndex];
    return l || treeCoverLoss[treeCoverLoss.length - 1];
  }, [currentYear]);

  console.log(lossData);

  return (
    <>
      <motion.g>
        <AnimatePresence>
          {treeCover.map(({ x, y, z, rainforest }, index) => {
            if (!z || !rainforest) return null;

            const treeLossValue = lossData.find((row) => row.x === x && row.y === y)?.z;
            console.log(treeLossValue);
            return (
              <motion.circle
                key={`circle_${index}`}
                cy={yScale(y)}
                cx={xScale(x)}
                animate={{
                  fill: treeLossValue ? COLORS[treeLossValue] : COLORS[0],
                  // fillOpacity: treeLossValue > 2 ? 0.5 : 0.7,
                  r: treeLossValue > 2 ? 10 : 11
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
