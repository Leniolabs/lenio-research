import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import PropTypes from "prop-types";

export const Scaler = ({ position, scale, diameter, children, y = 300, scaleRadius = false }) => {
  const controls = useAnimation();
  const oldPosition = React.useRef(scale(position));
  const oldRadius = React.useRef(scale(diameter));
  React.useEffect(() => {
    controls.start({
      translateX: scale(position),
      scale: scaleRadius ? scale(scale.domain()[0] + diameter) : 1,
      y,
      transition: { duration: 0.75 }
    });
    oldPosition.current = scale(position);
    oldRadius.current = scale(diameter);
    console.log(scale(position), scale(diameter), controls);
  }, [position, scale, diameter]);

  return (
    <motion.g
      initial={{ translateX: 0, scale: 1, y }}
      animate={controls}
      transition={{
        type: "spring",
        damping: 50,
        duration: 0.4
      }}
      // stroke="#233042"
      // strokeWidth=".5"
      >
      {children}
    </motion.g>
  );
};

Scaler.propTypes = {
  position: PropTypes.number,
  scale: PropTypes.func,
  diameter: PropTypes.number,
  children: PropTypes.node,
  y: PropTypes.number,
  scaleRadius: PropTypes.bool
};
