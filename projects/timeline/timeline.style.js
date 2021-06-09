import styled from "styled-components";

export const Center = styled.div`
  display: flex;
  justify-content: center;
`;

export const Layout = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 160px 1fr 165px;
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
