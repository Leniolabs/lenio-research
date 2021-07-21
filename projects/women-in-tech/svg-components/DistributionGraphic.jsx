import * as React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  DistributionContainer,
  DistributionFooter,
  DistributionMeasures,
  DistributionTitle
} from "./graphic-fragments";

const DistributionGraphic = ({ data, ...extraProps }) => {
  return (
    <DistributionContainer {...extraProps}>
      <DistributionTitle />

      {/* Entries Evolution + Career */}
      {data.map(({ path, text }) => (
        <motion.g key={text.children}>
          <path {...path} />
          <text {...text} />
        </motion.g>
      ))}

      <DistributionMeasures />
      <DistributionFooter />
    </DistributionContainer>
  );
};

DistributionGraphic.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.shape({
        children: PropTypes.string,
        transform: PropTypes.string,
        className: PropTypes.string
      }),
      path: PropTypes.shape({
        d: PropTypes.string,
        className: PropTypes.string
      })
    })
  )
};

export default DistributionGraphic;
