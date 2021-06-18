import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { mapDatesToGraphic } from "../components/utils";
import { green, red, yellow, black } from "./line-graphic-colors";

export const LineGraphic = ({ details }) => {
  const [arrayDates, setArrayDates] = useState([]);
  const [xValue, setXvalue] = useState(1);

  useEffect(() => {
    if (details) {
      setArrayDates(mapDatesToGraphic(details));
    }
  }, [details]);

  // useEffect(() => {
  //   setValue();
  // }, []);

  // const setValue = () => {
  //   if (arrayDates.length < 25) {
  //     setXvalue((prev) => prev + 37.2);
  //   }
  // };

  console.log(`xValue`, xValue);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 928.3 29.8">
      {arrayDates &&
        arrayDates.map((item) => {
          const { status, date } = item;
          return (
            // eslint-disable-next-line react/jsx-key
            <rect
              id={date}
              width="37.2"
              height="18.6"
              x={xValue}
              y="5.6"
              fill={
                (status === "home" && green) ||
                (status === "hybrid" && yellow) ||
                (status === "office" && red)
              }
              stroke={black}
              strokeWidth=".3"
            />
          );
        })}
      <line x1="149.2" x2="149.2" y2="29.8" fill="none" stroke={black} strokeWidth=".3" />
      <line x1="593.8" x2="593.8" y2="29.8" fill="none" stroke={black} strokeWidth=".3" />
      <line x1="389.2" x2="389.2" y2="29.8" fill="none" stroke={black} strokeWidth="2" />
    </svg>
  );
};

LineGraphic.prototype = {
  home: PropTypes.array,
  office: PropTypes.array,
  hybrid: PropTypes.array
};
