import React from "react";
import PropTypes from "prop-types";

const DEFAULT_OPTIONS = { maximumFractionDigits: 1 };

export const NumberFormatter = ({
  number,
  divided,
  locale = "es-CL",
  options = DEFAULT_OPTIONS
}) => {
  if (divided && divided.condition(number)) {
    return (
      <span>
        {(number / divided.divisor).toLocaleString(locale, options)} {divided.indicator}
      </span>
    );
  }
  return <span>{number.toLocaleString(locale, options)}</span>;
};

NumberFormatter.propTypes = {
  number: PropTypes.number,
  divided: PropTypes.shape({
    divisor: PropTypes.number,
    indicator: PropTypes.string,
    condition: PropTypes.func
  }),
  locale: PropTypes.string,
  options: PropTypes.any
};
