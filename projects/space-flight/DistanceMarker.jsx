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

export const DistanceText = ({ position, distance, width }) => {
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
      fontSize={width > 800 ? "1.2rem" : 14}
      dy={-5}>
      {distance}
    </motion.text>
  );
};

DistanceText.propTypes = {
  position: PropTypes.number,
  distance: PropTypes.number,
  width: PropTypes.number
};

export const DistanceMarker = ({ scale, earthPosition, point2, x = 0, y = 500, width }) => {
  // use scale to put the vertical lines
  const [start, setStart] = React.useState(earthPosition < point2 ? earthPosition : point2);
  const [end, setEnd] = React.useState(earthPosition > point2 ? earthPosition : point2);
  const [deltaStart, setDeltaStart] = React.useState(earthPosition < point2 ? 14 : 0);
  const [deltaEnd, setDeltaEnd] = React.useState(earthPosition > point2 ? 14 : 0);
  const controls = useAnimation();

  React.useEffect(() => {
    setStart(earthPosition < point2 ? earthPosition : point2);
    setEnd(earthPosition > point2 ? earthPosition : point2);
    setDeltaStart(earthPosition < point2 ? 14 : 0);
    setDeltaEnd(earthPosition > point2 ? 14 : 0);
  }, [earthPosition, point2]);

  React.useEffect(() => {
    controls.start({
      d: `M${(scale(start) > 0 ? scale(start) : 0) + deltaStart},0L${scale(end) + 1 + deltaEnd}, 0`,
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
      <Tick position={scale(start) > 0 ? scale(start) + deltaStart : 0} />
      <Tick position={scale(end) > 0 ? scale(end) + deltaEnd : scale.domain()[1]} />
      <DistanceText
        width={width}
        position={scale(start + (end - start) / 2)}
        distance={`${(end - start).toLocaleString()}km`}></DistanceText>
    </motion.g>
  );
};

DistanceMarker.propTypes = {
  scale: PropTypes.any,
  length: PropTypes.number,
  earthPosition: PropTypes.number,
  point2: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number
};
