/* eslint-disable no-unused-vars */
import * as React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { polygonCentroid } from "d3-polygon";
import { useSVGMorph } from "./useSVGMorph";
import { toPathString } from "flubber";
import { exactRing, parse } from "./svgUtils";

import { generateBigHex, generateHexGrid } from "./Hexes/generateHexes";
import { howToPaintHexes } from "./Hexes/paintHexes";
import { INNER_HEX_DEFAULT_COLOR } from "./constants";

const gridVariants = {
  hex: { opacity: 0.9 },
  shape: { opacity: 0 }
};

export const State = ({
  children,
  name,
  shape,
  hexPath,
  shapePath,
  opacity = 1,
  stroke = "#FF5B3A",
  hexCorner,
  size,
  fillColor = "#f1f1f1",
  data = [],
  onMouseEnter = () => null,
  onMouseOut = () => null
}) => {
  const d = useSVGMorph(shape === "hex" ? hexPath : shapePath, {
    duration: 0.5
  });

  const [hexCentroid, setHexCentroid] = React.useState(polygonCentroid(exactRing(parse(hexPath))));
  const [shapeCentroid, setShapeCentroid] = React.useState(
    polygonCentroid(exactRing(parse(shapePath)))
  );

  const shapeVariants = React.useMemo(() => {
    return {
      hex: {
        stroke: fillColor
      },
      shape: {
        stroke
      }
    };
  }, [fillColor]);

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
      <motion.text fontSize={10} dy={3} textAnchor="middle">
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
    if (hexGrid && data) {
      return howToPaintHexes(hexGrid, data);
    }
    return [];
  }, [hexGrid, data]);

  return (
    <motion.g>
      <motion.path
        animate={shape}
        variants={shapeVariants}
        d={d}
        fill={fillColor}
        opacity={opacity}
        stroke={stroke}
        strokeWidth="2"
        onMouseEnter={onMouseEnter}
        onMouseOut={onMouseOut}
      />
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
              fill={hexGridValues[idx] || INNER_HEX_DEFAULT_COLOR}
              opacity={opacity}
              stroke={hexGridValues[idx] || INNER_HEX_DEFAULT_COLOR}
              // stroke={stroke}
              strokeWidth="0.3px"
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
  hexCorner: PropTypes.arrayOf(PropTypes.number),
  data: PropTypes.arrayOf(PropTypes.number),
  onMouseEnter: PropTypes.func,
  onMouseOut: PropTypes.func
};
