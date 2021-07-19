import styled, { css } from "styled-components";

export const GraphicContainer = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 0 auto 8rem auto;
`;

export const Presentation = styled.section`
  background-size: 220px;
  padding: 4rem 0 6rem;
  margin-bottom: 5rem;
  text-align: center;
  * {
    margin: 0;
  }
  h1 {
    font-size: 3.2rem;
    line-height: 1;
  }
  p {
    font-size: 1.4rem;
    margin-top: 1rem;
  }
`;

export const svgStyles = css`
  .st1,
  .st2,
  .st4 {
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .st1 {
    opacity: 0.3;
    stroke-miterlimit: 10;
    stroke: #2b2c2b;
  }
  .st2,
  .st4 {
    stroke: #d3d3d3;
    stroke-width: 0.5;
  }
  .st4 {
    stroke-dasharray: 3.0099, 4.0132;
  }
  .st6 {
    stroke: #010101;
    stroke-miterlimit: 10;
  }
  .st6,
  .st7 {
    fill: #010101;
  }
  .st11 {
    font-size: 11px;
  }
  .st14 {
    font-size: 12px;
  }
  .st15 {
    fill: #14192e;
  }
  .st17 {
    fill: #6b6c6c;
  }
  .st19 {
    font-size: 18px;
  }
`;
