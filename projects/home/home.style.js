import styled from "styled-components";

export const Layout = styled.div`
  display: grid;
  color: #fff;
  background: #2d2f48;
  grid-template-columns: 150px 1fr 1fr;
  grid-template-rows: 120px 1fr 1fr;
  grid-template-areas:
    "sidebar header header"
    "sidebar main main"
    "sidebar main main";
  min-height: calc(100vh - 113px);
  @media (max-width: 1023px) {
    grid-template-rows: 200px 1fr 1fr;
    transition: all 0.8s;
  }
  @media (max-width: 728px) {
    grid-template-columns: 1fr;
  }
`;

export const Sidebar = styled.aside`
  background: #48d58c;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 32px;
  grid-area: sidebar;
`;

export const Header = styled.header`
  grid-area: header;
  padding: 32px 64px 0;
`;

export const Main = styled.main`
  padding: 32px 64px 0;
  display: flex;
  flex-direction: column;
  grid-area: main;
  section {
    padding-top: 32px;
  }
`;

export const Title = styled.h1`
  text-transform: uppercase;
  font-size: 4rem;
  color: #ffffff;
  margin: 0px;
  span {
    color: #da63dd;
  }
  small {
  }
`;

export const Small = styled.small`
  color: #ffffff;
  text-transform: uppercase;
  font-size: 1rem;
  span {
    color: #48d58c;
  }
`;

export const HeroImage = styled.div`
  height: 400px;
  background: black;
  width: 100%;
  // @media (max-width: 728px) {
  //   width: 25%;
  // }
`;
