import PropTypes from "prop-types";
import styled, { css } from "styled-components";

export const GraphicColors = Object.freeze({
  RED: "#ee1f48",
  LIGHT_GREY: "#d3d3d3",
  DARK_GREY: "#2b2c2b",
  BLACK: "#010101",
  GREY: "#6b6c6c",
  DARK_BLUE: "#14192e",
  WHITE: "#fffefa",
  CYAN: "#32aab3"
});

export const Presentation = styled.section`
  background: #fffbf0 url("/static/bg-women-in-tech.svg") repeat-x bottom center;
  background-size: cover;
  padding: 4rem 0 20rem;
  position: relative;
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

  .author {
    display: block;
    font-size: 1.2rem;
    font-weight: normal;
    margin-top: 1rem;
    a {
      color: #2a9faa;
    }
    + a {
      color: inherit;
      font-size: 0.8rem;
      font-weight: normal;
      opacity: 0.8;
      position: absolute;
      bottom: -24px;
      right: 10px;
      text-decoration: none;
      &:hover {
        opacity: 1;
      }
    }
  }
`;

export const Article = styled.article`
  background-color: white;
  padding: 5rem 0;
`;

export const Title = styled.h1``;

export const Subtitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
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
    stroke: ${GraphicColors.DARK_GREY};
  }
  .st2,
  .st4 {
    stroke: ${GraphicColors.LIGHT_GREY};
    stroke-width: 0.5;
  }
  .st4 {
    stroke-dasharray: 3.0099, 4.0132;
  }
  .st6 {
    stroke: ${GraphicColors.BLACK};
    stroke-miterlimit: 10;
  }
  .st6,
  .st7 {
    fill: ${GraphicColors.BLACK};
  }
  .st11 {
    font-size: 11px;
  }
  .st14 {
    font-size: 12px;
    fill: ${GraphicColors.GREY};
  }
  .st15 {
    fill: ${GraphicColors.DARK_BLUE};
  }
  .st19 {
    font-size: 18px;
  }
`;

export const NormalPath = (props) => <path {...props} />;

export const HighlightedPath = (props) => (
  <path
    fill="none"
    style={{
      stroke: GraphicColors.RED,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeMiterlimit: 10,
      strokeWidth: 3,
      fill: "none"
    }}
    {...props}
  />
);

export const Paragraph = styled.p``;

export const RowContainer = ({ children }) => (
  <div
    css={css`
      margin: 0 auto;
      p {
        line-height: 1.5;
      }
    `}
    className="row-container">
    {children}
  </div>
);

RowContainer.propTypes = { children: PropTypes.any };

export const CenteredImage = ({ alt, src, figCaption, ...imageProps }) => (
  <div
    css={css`
      display: flex;
      align-items: center;
      flex-direction: column;
      margin: 2rem 0;

      img {
        max-width: 90%;
      }
    `}>
    <img alt={alt} src={src} {...imageProps} />
    {figCaption && <FigCaption>{figCaption}</FigCaption>}
  </div>
);

CenteredImage.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
  figCaption: PropTypes.string
};

export const GraphicContainer = ({ children }) => (
  <div
    className="row-container"
    css={css`
      margin: 0 auto 2rem auto;
      max-width: 95%;
      display: flex;
      flex-direction: column;
      align-items: center;
      svg {
        border: 1px solid #ffdfaa;
      }

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

export const FigCaption = styled.figcaption`
  font-size: 0.85em;
  font-style: italic;
  margin-top: 0.6rem;
  text-align: center;
`;

GraphicContainer.propTypes = { children: PropTypes.any };
