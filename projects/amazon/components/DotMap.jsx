import React from "react";
import PropTypes from "prop-types";
import { scaleLinear } from "d3-scale";
import { AnimatePresence, FramerTreeLayoutContext, motion } from "framer-motion";
import usePrevious from "utils/usePrevious";
import { dotData } from "./sampleData";

const DATA_SHAPE = [35, 30];
const COLORS = ["rgb(27,17,39)", "rgb(138,32,75)", "rgb(247,130,52)"];
const OPACITIES = [0.5, 0.5, 1];

const circleVariants = {
  v1: { fill: COLORS[1], r: 2.5 },
  v2: { fill: COLORS[2], r: 2.75 },
};

export const DotMap = ({ data = dotData, height, width }) => {
  const xScale = React.useMemo(() => {
    return scaleLinear().domain([0, DATA_SHAPE[0]]).range([200, 400]);
  });

  const yScale = React.useMemo(() => {
    return scaleLinear().domain([0, DATA_SHAPE[1]]).range([4, 200]);
  });

  return (
    <>
      <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="40 0 600 600">
        <AnimatePresence>
          {data.map((elem, elemIdx) => {
            if (elem.value === "0") return null;
            return (
              <motion.circle
                key={`circle_${elemIdx}`}
                cy={yScale(elem.y)}
                cx={xScale(elem.x)}
                variants={circleVariants}
                animate={`v${elem.value}`}
                transition={{ duration: 0.25, type: "spring", stiffness: 20 }}
              />
            );
          })}
        </AnimatePresence>
      </motion.svg>
    </>
  );
};

DotMap.propTypes = {
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
