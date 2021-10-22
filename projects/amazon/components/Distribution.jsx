import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

export const Distribution = ({ percentage }) => {
  return (
    <div className="side-box">
      <h3>Deforestation <span>(%)</span></h3>
      <svg viewBox="0 0 40 40" className="donut" aria-labelledby="title desc" role="img" tabIndex="0">
        <title id="title">Donut chart</title>
        <desc id="desc">Donut chart showing percentage of deforestation in Amazon increasing by year.</desc>
        <g strokeWidth="3" transform="rotate(-90 20 20)">
          <circle
            cx="20"
            cy="20"
            r="15.92"
            strokeDasharray="100 0"
            stroke="var(--amazongreen, #99B898)">
            <title id="title">Forest area</title>
          </circle>
          <motion.circle
            cx="20"
            cy="20"
            r="15.92"
            animate={{
              strokeDasharray: `${percentage} 100`
            }}
            stroke="var(--amazonred, #E84A5F)">
            <title id="title">Deforestation</title>
          </motion.circle>

        </g>
        <text x="20" y="23" fill="#fff" fontSize=".6rem" textAnchor="middle">
          {percentage.toFixed(1)}%
        </text>
      </svg>
    </div>
  );
};

Distribution.propTypes = {
  percentage: PropTypes.number
};
