import React from "react";
import PropTypes from "prop-types";
import { scaleLinear } from "d3-scale";
import { AnimatePresence, motion } from "framer-motion";
import treeCover from "./treeCover";
import treeCoverLoss from "./treeCoverLoss";

const COLORS = ["#99B898", "#E84A5F", "#FF847C"];

export const AmazonasMap = ({ currentYear = 2001 }) => {
  const xScale = scaleLinear().domain([0, 20]).range([165, 373]);
  const yScale = scaleLinear().domain([0, 20]).range([25, 247]);

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
                r={3}
                cy={yScale(y)}
                cx={xScale(x)}
                fill={treeLossValue ? COLORS[Math.trunc(treeLossValue / 2)] : COLORS[0]}
                fillOpacity={treeLossValue > 2 ? 0.5 : 0.7}
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
  xTitle: PropTypes.string,
  yTitle: PropTypes.string,
  colorTitle: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.any),
  values: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        label: PropTypes.string,
        property: PropTypes.string
      })
    )
  ),
  height: PropTypes.number,
  width: PropTypes.number,
  colors: PropTypes.object
};
