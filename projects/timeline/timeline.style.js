import styled from "styled-components";

export const TimelineContainer = styled.div`
  padding: 2rem;
  background-color: #f7f7f7;
  min-height: 500px;
  /* display: flex;
  flex-direction: column; */
`;

export const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Center = styled.div`
  h2 {
    color: #383838;
    font-size: 3rem;
    margin: 0;
  }
  date {
    color: #6b6b6b;
    font-weight: bold;
    font-style: italic;
  }
  p {
    color: #7a797e;
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
  text-align: center;
  * {
    margin: 0;
  }
  h1 {
    font-size: 72px;
  }
  p {
    font-size: 36;
    padding-bottom: 2rem;
  }
`;

export const GraphicSection = styled.section`
  padding-right: 16px;
  h3 {
    text-align: center;
  }
`;

export const TimelineSection = styled.section`
  padding: 1rem 3rem;
`;

export const LineContainer = styled.div`
  width: 100%;
  height: 120px;
`;
