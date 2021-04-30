import React from "react";
import PropTypes from "prop-types";

export const Legend = ({ data }) => {
  return (
    <p>
      {data.map((row) => {
        return (
          <React.Fragment key={row.name}>
            <svg viewBox="0 0 20 20" width="15" height="15">
              <circle cx="10" cy="10" r="8" fill={row.color} />
            </svg>{" "}
            {row.name}
            <br />
          </React.Fragment>
        );
      })}
    </p>
  );
};

Legend.propTypes = {
  data: PropTypes.any
};
