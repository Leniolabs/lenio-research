import styled, { css } from "styled-components";

export const LegendsContainer = styled.div``;
export const Element = styled.span`
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
export const LegendCircle = styled.circle`
  fill: ${(props) => props.fill};
  stroke: #5a60ab;
`;
