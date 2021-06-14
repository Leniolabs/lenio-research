import styled from "styled-components";

export const TimelineContainer = styled.div`
  padding: 2rem;
  background-color: #f9f3e4;
  min-height: 500px;
  /* display: flex;
  flex-direction: column; */
`;

export const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Center = styled.div`
  h2 {
    color: #2b3f55;
    font-size: 3rem;
    margin: 0;
  }
  date {
    color: #6b6b6b;
    font-weight: bold;
    font-style: italic;
  }
  p {
    color: #2b3f55;
  }
`;

export const LabelCompanies = styled.h3`
  font-size: 1em;
  font-weight: bold;
  margin: 10px 5px;
`;

export const Layout = styled.div`
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
  padding: 1rem;
`;

export const Footer = styled.footer`
  background-color: #354156;
  color: #fcfcf4;
  padding: 2rem;
  text-align: right;
`;

export const FirstSection = styled.section`
  background: #fffbf0 url("/timeline-buildings.svg") repeat-x bottom left;
  background-size: 250px;
  padding: 2rem 0 10rem;
  min-height: 35vh;
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

export const GraphicSection = styled.section`
  margin: 0 auto 6rem;
  max-width: 70em;
  h2 {
    font-size: 2.2rem;
    font-weight: normal;
    text-align: center;
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
  height: 120px;
  li {
    background-image: none!important;
  }
`;
