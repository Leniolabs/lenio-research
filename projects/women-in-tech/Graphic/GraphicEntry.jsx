import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { css } from "styled-components";
import { GraphicConstants } from "../utils";
import { GraphicColors, HighlightedPath, NormalPath } from "../women-in-tech.style";

const { RIGHT_LIMIT } = GraphicConstants;

const GraphicEntry = ({ onTextClick, highlight, pathData, textData }) => {
  const PathComponent = highlight ? HighlightedPath : NormalPath;

  const { path, ...pathProps } = pathData;
  const { value: textValue, translateY, ...textProps } = textData;

  return (
    <motion.g
      css={css`
        cursor: pointer;
      `}>
      <PathComponent d={path} {...pathProps} />
      <text
        onClick={onTextClick}
        transform={`translate(${RIGHT_LIMIT - 10} ${translateY + 4})`}
        {...textProps}
        style={{ fill: highlight ? GraphicColors.RED : null }}>
        {textValue}
      </text>
    </motion.g>
  );
};

GraphicEntry.propTypes = {
  onTextClick: PropTypes.func,
  highlight: PropTypes.bool,
  pathData: PropTypes.shape({
    path: PropTypes.string
  }),
  textData: PropTypes.shape({
    value: PropTypes.string,
    translateY: PropTypes.number
  })
};

export default GraphicEntry;
