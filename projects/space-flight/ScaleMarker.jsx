import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import PropTypes from "prop-types";
import { Tick } from "./DistanceMarker";

export const ScaleMarker = ({ scale, x, y }) => {
  // use scale to put the vertical lines
  const controls = useAnimation();
  const [tickCalc, setTickCalc] = React.useState(0);
  React.useEffect(() => {
    controls.start({
      d: `M0,0L${scale(scale.domain()[0] + 0.05 * tickCalc) + 1}, 0`
    });
    setTickCalc(scale.domain()[1] - scale.domain()[0]);
  }, [scale]);
  return (
    <motion.g transform={`translate(${x}, ${y})`}>
      <motion.path
        // initial={{ d: `M0,0L${scale(50) + 1}, 0` }}
        animate={controls}
        stroke="white"
        strokeWidth="2"
        transition={{
          type: "spring",
          damping: 50,
          stiffness: 200
        }}
      />
      <path d={`M1,0L1,5`} stroke="white" strokeWidth="2"></path>
      <Tick position={scale(scale.domain()[0] + 0.01 * tickCalc)} />
      <Tick position={scale(scale.domain()[0] + 0.02 * tickCalc)} />
      <Tick position={scale(scale.domain()[0] + 0.03 * tickCalc)} />
      <Tick position={scale(scale.domain()[0] + 0.04 * tickCalc)} />
      <Tick position={scale(scale.domain()[0] + 0.05 * tickCalc)} />
    </motion.g>
  );
};

ScaleMarker.propTypes = {
  scale: PropTypes.any,
  length: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
};
