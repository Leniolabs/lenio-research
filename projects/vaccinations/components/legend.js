import * as React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { CONTINENT_COLOR_MAP } from "@projects/constants";

const LegendsContainer = styled.div``;
const Element = styled.span`
  align-items: center;
  color: #5a60ab;
  display: inline-flex;
  font-size: 1rem;
  margin: 1rem;
  svg {
    margin-right: 0.5rem;
  }
`;
const LegendCircle = styled.circle`
  fill: ${(props) => props.fill};
  stroke: #5a60ab;
`;

export const Legend = ({ series = CONTINENT_COLOR_MAP }) => {
  return (
    <LegendsContainer>
      {Object.keys(series)
        .filter((key) => key !== "undefined")
        .map((key) => {
          return (
            <Element key={`legend-element-${key}`}>
              <svg width="20" height="20" overflow="visible" viewBox="0 0 20 20">
                <LegendCircle cx="10" cy="10" r="8" fill={series[key]} />
              </svg>{" "}
              {key}
            </Element>
          );
        })}
      <Element>
        <svg width="20" height="20" viewBox="0 0 20 20" overflow="visible">
          <rect x="2" width="18" height="20" fill="#dce4fc" stroke="#5a60ab" />
          <line x1="2" y1="10" x2="20" y2="10" stroke="#5a60ab" strokeWidth="3" />
        </svg>{" "}
        People vaccinated
      </Element>
    </LegendsContainer>
  );
};

Legend.propTypes = {
  series: PropTypes.any
};
