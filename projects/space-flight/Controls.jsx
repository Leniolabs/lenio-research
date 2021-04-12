import * as React from "react";
import PropTypes from "prop-types";

export const Controls = ({ x, y, onBack, onForward }) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect class="btn-prev" x="-120" y="-40" width="100" height="40" rx="5" fill="#9831ff" onClick={onBack}/>
      <text x="-95" y="-12"
        fill="white"
          font-family="Source Sans Pro"
          font-weight="600"
          font-size="24">
      Prev
    </text>
      <rect class="btn-next" y="-40" width="100" height="40" rx="5" fill="#009396" onClick={onForward}/>
      <text x="24" y="-12"
        fill="white"
        font-family="Source Sans Pro"
        font-weight="600"
        font-size="24">
      Next
    </text>
    </g>
  );
};

Controls.propTypes = {
  onBack: PropTypes.func,
  onForward: PropTypes.func,
  x: PropTypes.number,
  y: PropTypes.number
};
