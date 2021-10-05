import { motion } from "framer-motion";
import styled from "styled-components";

export const Layout = styled.div`
  background-color: #1c1427;
  color: #fff;
  position: relative;
  display: grid;
  grid-template-rows: 160px 1fr 80px;
  min-height: 100vh;
  @media (max-width: 728px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
`;

export const Header = styled.header`
  position: relative;
`;

export const GithubContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export const MainAmazon = styled.main`
  background-color: #1c1427;
`;

export const LegendBox = styled.div`
  align-items: center;
  background-color: #1c1427;
  border: 1px solid #fff;
  display: flex;
  justify-content: center;
  margin: auto;
  padding: 0.5rem;
  max-width: max-content;
  div {
    align-items: center;
    display: flex;
    margin-right: 1rem;
  }
`;

export const Footer = styled.footer`
  background-color: #1c1427;
  color: #fcfcf4;
  padding: 2rem;
  text-align: right;
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

export const FirstSection = styled.section`
  margin-bottom: 5rem;
  min-height: 35vh;
  text-align: center;
  h1 {
    font-size: 3.2rem;
    line-height: 1;
    margin: 0 auto 0.5rem;
  }
  h2 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-top: 0;
  }
`;

export const GraphicSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 2rem;
  .sidebar {
    h3 {
      font-size: 1.4rem;
      font-weight: 700;
      text-align: center;
    }
    .side-box {
      border: 1px solid #fff;
    }
    svg {
    }
  }
  svg {
    margin-right: 2rem;
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

export const SourceLink = styled.a`
  text-decoration: none;
  color: #2c9faa;
  cursor: pointer;
`;
