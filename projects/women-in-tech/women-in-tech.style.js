import styled, { css } from "styled-components";

export const Article = styled.article`
  margin-bottom: 5rem;
`;

export const RowContainer = ({ children, cssStyles }) => (
  <div
    css={css`
      margin: 0 auto;
      ${cssStyles}
    `}
    className="row-container">
    {children}
  </div>
);

export const Title = ({ children }) => styled.h1``;

export const CenteredImage = ({ alt, src, ...imageProps }) => (
  <div
    css={css`
      display: flex;
      justify-content: center;
      margin: 2rem 0;

      img {
        max-width: 90%;
      }
    `}>
    <img alt={alt} src={src} {...imageProps} />
  </div>
);

export const Subtitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
`;

export const Paragraph = ({ children }) => <p className="">{children}</p>;

export const GraphicContainer = ({ children }) => (
  <div
    className="row-container"
    css={css`
      margin: 0 auto 2rem auto;
      max-width: 95%;
      display: flex;
      justify-content: center;

      @media (min-width: 768px) {
        min-height: 80vh;
        svg {
          height: calc(50vh + 300px);
        }
      }
    `}>
    {children}
  </div>
);

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

  .author {
    display: block;
    font-size: 1.2rem;
    font-weight: normal;
    margin-top: 1rem;
    a {
      color: #2a9faa;
    }
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
