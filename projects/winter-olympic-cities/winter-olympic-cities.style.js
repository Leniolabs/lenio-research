import { motion } from "framer-motion";
import styled from "styled-components";

export const Layout = styled.div`
  background-color: #1c1427;
  color: #fff;
  position: relative;
  display: grid;
  grid-template-rows: 100px 1fr 120px;
  min-height: 100vh;
  overflow: hidden;
`;

export const Header = styled.header`
  position: relative;
  z-index: 1;
  > div {
    padding: 1rem;
  }
`;

export const GithubContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  &:hover path {
    fill: var(--amazonyellow);
  }
`;

export const MainGlobalWarming = styled.main`
  background-color: #1c1427;
`;

export const LegendBox = styled.div`
  align-items: center;
  background-color: #1c1427;
  border: 1px solid #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: auto;
  position: relative;
  max-width: max-content;
  position: absolute;
  bottom: 5rem;
  left: 0;
  max-width: 300px;
  @media (max-width: 640px) {
    bottom: 0;
  }
  div {
    align-items: center;
    display: flex;
    margin-right: 1rem;
  }
`;

export const FirstSection = styled.section`
  text-align: center;
  position: relative;
  z-index: 1;
  h1 {
    font-size: 2.4rem;
    line-height: 1;
    margin: 0 auto 0.5rem;
    @media (max-width: 640px) {
      font-size: 2.2rem;
      margin-top: 2rem;
    }
  }
  h2 {
    font-size: 1.1rem;
    font-weight: 500;
    margin-top: 0;
  }
`;

export const GraphicSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding: 0 2rem;
  @media (max-width: 640px) {
    padding: 0 1rem;
  }
  .map-container {
    flex: 1 1 auto;
    position: relative;
    > svg {
      margin-top: -50px;
      max-width: 540px;
      width: 100%;
      @media (max-width: 640px) {
        margin-left: -140px;
        max-width: 400px;
      }
    }
  }
  .map-hover path {
    opacity: 0;
    fill: transparent;
    stroke: #f8f8f0;
    stroke-miterlimit: 10;
    stroke-width: 0.125;
    &.slim-stroke {
      stroke-width: 0.5;
    }
    &:hover {
      opacity: 1;
      stroke: white;
    }
  }
  .sidebar {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    .side-box {
      border: 1px solid rgba(255, 255, 255, 0.5);
      padding: 1rem;
      text-align: center;
      margin: 2rem 0 0 auto;
      max-width: 300px;
      width: 100%;
      @media (max-width: 640px) {
        margin: 2rem auto 0;
      }
      h3 {
        background-color: #1c1427;
        font-size: 1.4rem;
        font-weight: 700;
        margin: -2rem auto 0;
        max-width: max-content;
        padding: 0 0.5rem;
        text-align: center;
        span {
          font-weight: normal;
        }
      }
      .donut {
        max-height: 220px;
        circle {
          fill: transparent;
        }
      }
      .flex-shapes {
        align-items: center;
        display: flex;
      }
      .how-many-shapes {
        margin: auto;
        max-width: 110px;
      }
      .howmanynumber {
        background-color: var(--amazonlightpurple);
        border-radius: 4px;
        flex: 1 1 100%;
        font-size: 1.8rem;
        margin: 0 auto;
        padding: 1rem 0.5rem;
        .howmany-text {
          background: rgba(29, 19, 39, 0.5);
          display: block;
          font-size: 1rem;
          margin: -1rem -1rem 0.5rem;
          padding: 0.2rem 0.2rem 0.5rem;
        }
      }
    }
  }
  .counter {
    margin-top: -4rem;
    width: 600px;
    @media (max-width: 640px) {
      order: -1;
      margin-top: 1rem;
      width: 90vw;
    }
    .year {
      font-size: 5rem;
      font-weight: 700;
      line-height: 1;
      margin: 0 0 0 1rem;
    }
    .km {
      font-weight: 700;
      margin: 0 0 0 1rem;
    }
    .km-lost {
      font-size: 2rem;
      margin-right: 0.8rem;
    }
    .km-total {
      color: var(--amazongreen);
      font-size: 1.2rem;
      margin-left: 0.2rem;
    }
    .player {
      svg {
        margin-top: -1rem;
        max-width: 700px;
        width: 100%;
      }
      .play-btn {
        cursor: pointer;
        fill: white;
        &:hover path,
        &:focus path {
          fill: var(--amazongreen);
        }
      }
    }
  }
`;

export const Footer = styled.footer`
  color: #fcfcf4;
  display: flex;
  flex-direction: column;
  margin-top: auto;
  padding: 1rem;
  z-index: 1;
  .footnote {
    font-size: 1rem;
    margin: 0;
    text-align: right;
    a {
      color: #3baacd;
      text-decoration: underline;
      &:hover {
        color: #feceab;
      }
    }
  }
`;

export const CreatedByContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  div,
  a {
    font-size: 1rem;
    margin: 0 1rem 0 0;
  }
`;

export const TimelineSection = styled.section`
  margin: 2rem auto 4rem;
  max-width: 70em;
`;

export const LineContainer = styled.div`
  width: 100%;
  height: 90px;
  li {
    background-image: none !important;
  }
`;

export const LineGraphicContainer = styled.div`
  background-color: #f9f3e4;
  padding: 0 2rem;
`;

export const TimelineSubtitle = styled.h2`
  font-size: 2.2rem;
  font-weight: normal;
  text-align: center;
  width: 100%;
`;
export const AmazonContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 16px;
  margin: 2rem auto;
  max-width: 60em;
  @media (min-width: 728px) {
    grid-template-columns: repeat(1, minmax(350px, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
`;

export const Card = styled(motion.div)`
  background-color: #343763;
  padding: 2rem;
  position: relative;
  width: 80vw;
  p {
    font-size: 1rem;
    margin-top: 0;
    svg {
      margin-right: 5px;
    }
  }
  blockquote {
    font-size: 1.2rem;
    margin: 0;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    span {
      display: block;
      font-size: 1rem;
      font-style: italic;
      font-weight: 600;
      margin-top: 1rem;
      text-align: right;
    }
  }
  .logo {
    position: absolute;
    bottom: 1rem;
    left: 2rem;
    max-height: 14%;
    width: 14%;
  }
  a {
    color: #2c9faa;
    display: block;
    font-size: 1rem;
    font-weight: 600;
    text-align: right;
  }
  .image-wrapper {
    position: absolute;
    bottom: 1rem;
    left: 2rem;
    width: 10%;
    min-height: 10%;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
`;
export const AnimationContainer = styled.div`
  overflow: hidden;
  min-height: 200px;
`;
export const PlayBtn = styled.button`
  background-color: transparent;
  border: 2px solid #2c9faa;
  border-radius: 6px;
  color: #45486d;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.2rem 1rem 0.3rem;
  transition: 0.3s ease all;
  &.btn-graphic {
    margin: 0 0 0.5rem 2rem;
  }
  &:hover {
    background-color: #2c9faa;
    color: white;
  }
`;

export const HowManyOptionsContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 10px;
  margin: 10px 0;
  button {
    background-color: var(--amazonlightpurple);
    border: 0;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-size: 1rem;
    padding: 5px 10px;
    &:hover,
    &:focus,
    &.active {
      background-color: #3baacc;
    }
  }
`;

export const SourceLink = styled.a`
  text-decoration: none;
  color: #2c9faa;
  cursor: pointer;
`;

export const MapContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  background: #262626;

  .maplibregl-control-container {
    display: none;
  }

  .maplibregl-popup {
    pointer-events: none;
    .maplibregl-popup-content {
      padding: 10px 10px;

      .tooltip-content {
        color: black;
        font-size: 14px;

        .tooltip-title {
          font-size: 16px;
        }
      }
    }
  }
`;

export const ControlsWrapper = styled.div`
  align-items: end;
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 20px;
  bottom: 0;
  transform: translate(0, -50%);
  width: max-content;
  pointer-events: none;

  & > div {
    pointer-events: all;
  }
  .winter-select {
    color: #45486d;
    cursor: pointer;
    margin: 1rem 0.5rem 0 1rem;
    max-width: 280px;
    width: 100%;
    > div {
      max-width: 280px;
      width: 100%;
    }
  }
  .counter {
    text-align: right;
    width: 600px;
    @media (max-width: 640px) {
      margin-top: 1rem;
      width: 90vw;
    }
    .year {
      pointer-events: none;
      font-size: 4rem;
      font-weight: 700;
      line-height: 1;
      margin: 0 0 0 1rem;
    }
    .player {
      svg {
        margin-top: -1rem;
        max-width: 700px;
        width: 100%;
      }
      .play-btn {
        cursor: pointer;
        fill: white;
        &:hover path,
        &:focus path {
          fill: var(--amazongreen);
        }
      }
    }
  }
`;
