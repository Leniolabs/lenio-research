import React from "react";
import PropTypes from "prop-types";

export const Legend = ({ title, data }) => {
  return (
    <p className="legends">
      <span>{title}</span>
      <br />
      {data.map((row) => {
        return (
          <React.Fragment key={row.name}>
            <span>
              <svg viewBox="0 0 20 20" width="15" height="15">
                <circle cx="10" cy="10" r="8" fill={row.color} />
              </svg>{" "}
              <span style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{row.name}</span>
                {!!row.value && <span>{(row.value * 100).toFixed(2)} %</span>}
              </span>
            </span>
          </React.Fragment>
        );
      })}
    </p>
  );
};

Legend.propTypes = {
  title: PropTypes.string,
  data: PropTypes.any
};
