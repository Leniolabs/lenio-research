import * as React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { CONTINENT_COLOR_MAP } from "@projects/colorMappers";

const LegendsContainer = styled.div``;
const Element = styled.span`
  align-items: center;
  color: #5a60ab;
  display: inline-flex;
  font-size: 1rem;
  margin: 0.5rem 1rem 0.5rem 0;
  svg {
    margin-right: 0.3rem;
  }
  ${({ onSeriesClick }) =>
    onSeriesClick &&
    css`
      cursor: pointer;
    `}
`;
const LegendCircle = styled.circle`
  fill: ${(props) => props.fill};
  stroke: #5a60ab;
`;

export const Legend = ({ series = CONTINENT_COLOR_MAP, onSeriesClick, legendFilter }) => {
  return (
    <LegendsContainer>
      {Object.keys(series)
        .filter((key) => key !== "undefined")
        .filter((key) => (legendFilter ? key === legendFilter : true))
        .map((key) => {
          return (
            <Element key={`legend-element-${key}`} onClick={() => onSeriesClick(key)}>
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
      {legendFilter && (
        <Element onClick={() => onSeriesClick(null)}>
          <svg width="20" height="20" viewBox="0 0 20 20" overflow="visible">
            <line x1="6" y1="16" x2="16" y2="6" stroke="#5a60ab" strokeWidth="3" />
            <line x1="6" y1="6" x2="16" y2="16" stroke="#5a60ab" strokeWidth="3" />
          </svg>{" "}
          Clear Filters
        </Element>
      )}
    </LegendsContainer>
  );
};

Legend.propTypes = {
  series: PropTypes.any,
  onSeriesClick: PropTypes.func,
  legendFilter: PropTypes.bool
};
