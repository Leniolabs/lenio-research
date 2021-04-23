/* eslint-disable no-unused-vars */
import * as React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { polygonCentroid } from "d3-polygon";
import { useSVGMorph } from "./useSVGMorph";
import { toPathString } from "flubber";
import { exactRing, parse } from "./svgUtils";

import { generateBigHex, generateHexGrid } from "./Hexes/generateHexes";

const gridVariants = {
  hex: { opacity: 0.75 },
  shape: { opacity: 0 }
};

export const State = ({
  children,
  name,
  shape,
  hexPath,
  shapePath,
  opacity = 1,
  stroke = "#e8e6e6",
  hexCorner,
  size,
  fillColor = "#f1f1f1"
}) => {
  const d = useSVGMorph(shape === "hex" ? hexPath : shapePath, {
    duration: 0.5
  });

  const [hexCentroid, setHexCentroid] = React.useState(polygonCentroid(exactRing(parse(hexPath))));
  const [shapeCentroid, setShapeCentroid] = React.useState(
    polygonCentroid(exactRing(parse(shapePath)))
  );

  const [textVariants, setTextVariants] = React.useState({
    hex: {
      x: polygonCentroid(exactRing(parse(hexPath)))[0],
      y: polygonCentroid(exactRing(parse(hexPath)))[1]
    },
    shape: {
      x: polygonCentroid(exactRing(parse(shapePath)))[0],
      y: polygonCentroid(exactRing(parse(shapePath)))[1]
    }
  });

  React.useEffect(() => {
    const centroidHex = polygonCentroid(exactRing(parse(hexPath)));
    const centroidShape = polygonCentroid(exactRing(parse(shapePath)));
    setHexCentroid(centroidHex);
    setShapeCentroid(centroidShape);
    setTextVariants({
      hex: {
        x: centroidHex[0],
        y: centroidHex[1],
        opacity: 1
      },
      shape: {
        x: centroidShape[0],
        y: centroidShape[1],
        opacity: 0
      }
    });
  }, [shape, hexPath, shapePath]);

  const Name = ({ name }) => {
    return (
      <motion.text fontSize={4} dy={2} textAnchor="middle">
        {name}
      </motion.text>
    );
  };

  const hexGrid = React.useMemo(() => {
    if (hexCorner && size) {
      const newGrid = generateHexGrid({
        size: size,
        topLeftCorner: hexCorner
      });
      return newGrid;
    }
    return [];
  }, []);

  const hexGridValues = React.useMemo(() => {
    if (hexGrid) {
      const limit = Math.random() * hexGrid.length;
      return hexGrid.map((v, idx) => (idx < limit ? "#e3da80" : "#a8bc5b"));
    }
    return [];
  }, []);

  return (
    <motion.g>
      <motion.path d={d} fill={fillColor} opacity={opacity} stroke={stroke} strokeWidth="0.1px" />
      <motion.g
        initial={shape}
        animate={shape}
        transition={{ duration: 0.25, delay: shape === "hex" ? 0.5 : 0 }}
        variants={gridVariants}>
        {hexGrid.map((miniHex, idx) => {
          return (
            <motion.path
              key={`minihex-${name}-${idx}`}
              d={toPathString(miniHex)}
              fill={hexGridValues[idx]}
              opacity={opacity}
              stroke={stroke}
              strokeWidth="0.1px"
            />
          );
        })}
      </motion.g>
      <motion.g
        initial={shape}
        animate={shape}
        transition={{ duration: 0.5 }}
        variants={textVariants}
        fontSize={4}
        dy={2}
        textAnchor="middle">
        {children ? children : <Name name={name} />}
      </motion.g>
    </motion.g>
  );
};

State.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  shape: PropTypes.string,
  hexPath: PropTypes.string,
  shapePath: PropTypes.string,
  stroke: PropTypes.string,
  fillColor: PropTypes.string,
  opacity: PropTypes.number,
  size: PropTypes.number,
  hexCorner: PropTypes.arrayOf(PropTypes.number)
};
