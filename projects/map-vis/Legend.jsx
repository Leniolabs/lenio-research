import React from "react";
import PropTypes from "prop-types";

export const Legend = ({ title, data, shape, onSetIndex }) => {
  return (
    <p className="legends">
      <h3>{title}</h3>
      {data.map((row, index) => {
        return (
          <React.Fragment key={row.name}>
            <div className="legend-row" onClick={shape === "hex" ? () => onSetIndex(index) : () => {}}>
              <svg viewBox="0 0 20 20" width="15" height="15">
                <circle cx="10" cy="10" r="8" fill={row.color} />
              </svg>{" "}
              <span className={shape === "hex" ? "legend-data clickable-legend" : "legend-data"}>
                <span className="legend-name">{row.name}</span>
                <span className="legend-number">
                  {!!row.value && <span>{(row.value * 100).toFixed(2)} %</span>}
                </span>
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </p>
  );
};

Legend.propTypes = {
  title: PropTypes.string,
  data: PropTypes.any,
  shape: PropTypes.string,
  onSetIndex: PropTypes.func
};
