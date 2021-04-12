import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import PropTypes from "prop-types";
import { TRANSITION_DURATION } from "./constants";

export const Tick = ({ position }) => {
  const controls = useAnimation();
  const oldPosition = React.useRef(position);
  React.useEffect(() => {
    controls.start({
      d: `M${position},0L${position},5`,
      transition: { duration: TRANSITION_DURATION }
    });
    oldPosition.current = position;
  }, [position]);
  return (
    <motion.path
      // initial={{ d: `M${oldPosition.current},0L${oldPosition.current},5`}}
      animate={controls}
      transition={{
        type: "spring",
        damping: 50,
        stiffness: 200
      }}
      stroke="white"
      strokeWidth="2"
    />
  );
};

Tick.propTypes = {
  position: PropTypes.number
};

export const DistanceText = ({ position, distance }) => {
  const controls = useAnimation();
  const oldPosition = React.useRef(position);
  React.useEffect(() => {
    controls.start({
      translateX: position,
      transition: { duration: TRANSITION_DURATION }
    });
    oldPosition.current = position;
  }, [position]);
  return (
    <motion.text
      // initial={{ d: `M${oldPosition.current},0L${oldPosition.current},5`}}
      animate={controls}
      transition={{
        type: "spring",
        damping: 50,
        stiffness: 200
      }}
      stroke="white"
      textAnchor="middle"
      fill="white"
      dy={-5}>
      {distance}
    </motion.text>
  );
};

DistanceText.propTypes = {
  position: PropTypes.number,
  distance: PropTypes.number
};

export const DistanceMarker = ({ scale, point1, point2, x = 20, y = 380 }) => {
  // use scale to put the vertical lines
  const [start, setStart] = React.useState(point1 < point2 ? point1 : point2);
  const [end, setEnd] = React.useState(point1 > point2 ? point1 : point2);
  const controls = useAnimation();

  React.useEffect(() => {
    setStart(point1 < point2 ? point1 : point2);
    setEnd(point1 > point2 ? point1 : point2);
  }, [point1, point2]);

  React.useEffect(() => {
    const start = point1 < point2 ? point1 : point2;
    const end = point1 > point2 ? point1 : point2;
    controls.start({
      d: `M${scale(start)},0L${scale(end) + 1}, 0`,
      transition: { duration: TRANSITION_DURATION }
    });
  }, [scale, start, end]);
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
      <Tick position={scale(start)} />
      <Tick position={scale(end)} />
      <DistanceText
        position={scale(start + (end - start) / 2)}
        distance={`${end - start}km`}></DistanceText>
    </motion.g>
  );
};

DistanceMarker.propTypes = {
  scale: PropTypes.any,
  length: PropTypes.number,
  point1: PropTypes.number,
  point2: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
};
