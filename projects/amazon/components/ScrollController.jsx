import React from "react";
import PropTypes from "prop-types";
import {
  AnimatePresence,
  FramerTreeLayoutContext,
  motion,
  useElementScroll,
  useTransform,
  useSpring
} from "framer-motion";

export const ScrollController = ({ elem }) => {
  const ref = React.useRef();
  const { scrollYProgress } = useElementScroll(ref);
  const yRange = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
  const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 });
  console.log(yRange);

  return (
    <div style={{ height: "80vh", overflow: "scroll" }} ref={ref}>
      <div style={{ height: "200vh" }}>
        <motion.div
          style={{
            width: "80vw",
            height: "80vh",
            backgroundColor: "red",
            y: pathLength < 0.33 ? 0 : "-100vh"
          }}
        />
        <motion.div
          style={{
            width: "80vw",
            height: "80vh",
            backgroundColor: "blue",
            y: (pathLength >= 0.33) & (pathLength < 0.66) ? 0 : "-100vh"
          }}
        />
        <motion.div
          style={{
            width: "80vw",
            height: "80vh",
            backgroundColor: "green",
            y: pathLength >= 0.66 ? 0 : "-100vh"
          }}
        />
      </div>
    </div>
  );
};

ScrollController.propTypes = {};
