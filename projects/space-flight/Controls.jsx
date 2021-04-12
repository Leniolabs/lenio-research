import * as React from "react";
import PropTypes from "prop-types";

export const Controls = ({ x, y, onBack, onForward }) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle cx={10} r={10} fill="red" onClick={onBack} />
      <circle cx={30} r={10} fill="blue" onClick={onForward} />
    </g>
  );
};

Controls.propTypes = {
  onBack: PropTypes.func,
  onForward: PropTypes.func,
  x: PropTypes.number,
  y: PropTypes.number
};
