import * as React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useSVGMorph } from "./useSVGMorph";

export const State = ({ shape, hexPath, shapePath, stroke = "#e91ecc", fillColor = "#d8c2ff" }) => {
  const d = useSVGMorph(shape === "hex" ? hexPath : shapePath, {
    duration: 0.5
  });

  return (
    <motion.g>
      <motion.path d={d} fill={fillColor} stroke={stroke} strokeWidth="1" />
    </motion.g>
  );
};

State.propTypes = {
  shape: PropTypes.string,
  hexPath: PropTypes.string,
  shapePath: PropTypes.string,
  stroke: PropTypes.string,
  fillColor: PropTypes.string
};
