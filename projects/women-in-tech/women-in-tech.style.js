import styled, { css } from "styled-components";

export const Title = styled.h1``;

export const Subtitle = styled.h2``;

export const Paragraph = styled.p``;

export const GraphicContainer = styled.div`
  margin: 0 auto 8rem auto;
  max-width: 95%;
  height: 90vh;
  display: flex;
  justify-content: center;

  svg {
    height: calc(50vh + 300px);
  }

  @media (min-width: 1024px) {
    margin-bottom: 10rem;
  }
`;

export const Presentation = styled.section`
  background-size: 220px;
  padding: 4rem 0 6rem;
  text-align: center;

  @media (min-width: 768px) {
    margin-bottom: 5rem;
  }

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
    fill: #6b6c6c;
  }
  .st15 {
    fill: #14192e;
  }
  .st19 {
    font-size: 18px;
  }
`;
