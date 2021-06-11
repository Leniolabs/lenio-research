import styled from "styled-components";
import { SectionTitle, Footer, FooterLogo } from "@components/styled";
export { SectionTitle, FooterLogo };

export const Layout = styled.div`
  position: relative;
  display: grid;
  color: #fff;
  background: #2d2f48;
  grid-template-columns: 160px 1fr 1fr;
  grid-template-rows: 190px 1fr 115px;
  grid-template-areas:
    "sidebar header header"
    "sidebar main main"
    "sidebar footer footer";
  min-height: 100vh;
  @media (max-width: 1023px) {
    grid-template-rows: 200px 1fr 115px;
    transition: all 0.8s;
  }
  @media (max-width: 728px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
`;
export const Sidebar = styled.aside`
  background: #48d58c;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 32px 0;
  z-index: 100;
  grid-area: sidebar;
  p {
    line-height: 18px;
    font-size: 1rem;
    color: #fff;
    text-transform: uppercase;
  }
  @media (max-width: 728px) {
    display: none;
  }
`;
export const Header = styled.header`
  grid-area: header;
  overflow: visible;
  padding: 64px 20px 20px 80px;
  position: relative;
  .svg-home {
    position: absolute;
    top: -126px;
    width: 1000px;
  }
  @media (max-width: 600px) {
    padding: 15px 20px 20px;
  }
  `;
export const Main = styled.main`
  padding: 0 80px;
  display: flex;
  flex-direction: column;
  grid-area: main;
  section {
    padding-top: 32px;
  }
  section:last-child {
    padding-bottom: 60px;
  }
  @media (max-width: 600px) {
    padding: 20px;
  }
`;
export const Title = styled.h1`
  text-transform: uppercase;
  line-height: 1;
  font-size: 4rem;
  color: #fff;
  margin: 0 0 0 -4px;
  flex-direction: column;
  letter-spacing: 0;
  span {
    color: #da63dd;
  }
`;

export const Small = styled.small`
  color: #fff;
  text-transform: uppercase;
  font-size: 1rem;
  display: block;
  margin-top: 30px;
  padding-left: 4px;
  span a {
    color: #48d58c;
    text-decoration: none;
    &:hover { color: white;}
  }
`;

export const FooterLogoContainer = styled.div`
  position: absolute;
  bottom: 125px;
  right: 20px;
`;

export const BackgroundImage = styled.div`
  position: absolute;
  z-index: 0;
  top: -25vh;
  left: 0;
  right: 0;
  img {
    width: 100%;
  }
`;

export const FooterContainer = styled(Footer)`
  grid-area: footer;
`;
export const HeroImage = styled.img`
  background: black;
  width: 100%;
  cursor: pointer;
  max-width: 1200px;
`;
