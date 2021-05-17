import * as React from "react";
import Head from "next/head";
import styled from "styled-components";
import Logo from "@components/Logo";
import { SectionTitle } from "@components/styled";
import ProjectCardList from "@components/ProjectCardList";
import { useWindowSize } from "utils/useWindowSize";

const Layout = styled.div`
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
const Sidebar = styled.aside`
  background: #48d58c;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 32px;
  grid-area: sidebar;
`;
const Header = styled.header`
  grid-area: header;
  padding: 32px 64px 0;
`;
const Main = styled.main`
  padding: 32px 64px 0;
  display: flex;
  flex-direction: column;
  grid-area: main;
  section {
    padding-top: 32px;
  }
`;
const Title = styled.h1`
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

const Small = styled.small`
  color: #ffffff;
  text-transform: uppercase;
  font-size: 1rem;
  span {
    color: #48d58c;
  }
`;

const mockData = [
  {
    key: "maps-vis",
    link: "map-vis",
    imgPreview: "bg-research.png",
    title: "Map Vis",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime dicta laudantium at deleniti sit aperiam libero natus non, nemo nulla voluptatibus corporis ut dolorem suscipit unde odit est excepturi odio."
  },
  {
    key: "space-flight",
    link: "space-flight",
    imgPreview: "/space-day.png",
    title: "Space flight",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime dicta laudantium at deleniti sit aperiam libero natus non, nemo nulla voluptatibus corporis ut dolorem suscipit unde odit est excepturi odio."
  },
  {
    key: "vaccinations",
    link: "vaccinations",
    imgPreview: "/vaccinations_twitter_cover.png",
    title: "Vaccinations",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime dicta laudantium at deleniti sit aperiam libero natus non, nemo nulla voluptatibus corporis ut dolorem suscipit unde odit est excepturi odio."
  }
];

export const Index = () => {
  const [width] = useWindowSize();
  return (
    <>
      <Head>
        <title>Leniolabs_ Research</title>
        <meta
          name="description"
          content="Visualization of some milestones of humanity exploring space and the distance traveled from planet Earth"
        />
        <meta
          name="title"
          content="Leniolabs_ Research: International Day of Human Space Flight"
          key="title"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://research.leniolabs.com/" />
        <meta name="twitter:creator" content="@Leniolabs_" />
        <meta
          name="twitter:title"
          content="Leniolabs_ Research: International Day of Human Space Flight"
        />
        <meta
          name="twitter:description"
          content="Visualization of some milestones of humanity exploring space and the distance traveled from planet Earth"
        />
        <meta name="twitter:image" content="https://research.leniolabs.com/space-day.png" />
        <meta property="og:url" content="https://research.leniolabs.com/vaccinations.html" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Leniolabs_ Research: International Day of Human Space Flight"
        />
        <meta property="og:image" content="https://research.leniolabs.com/space-day.png" />
        <meta property="og:image:alt" content="Visualization of vaccination progress by country" />
        <meta
          property="og:description"
          content="Visualization of some milestones of humanity exploring space and the distance traveled from planet Earth"
        />
        <meta property="og:site_name" content="Leniolabs_ Research" />
        <meta property="og:locale" content="en_US" />
        <meta property="article:author" content="Leniolabs_ Research" />
      </Head>
      <Layout>
        <Header>
          <Title>
            Data <span>research</span>
          </Title>
          <Small>
            By <span> Leniolabs_</span>
          </Small>
        </Header>
        {width > 728 && (
          <Sidebar>
            <Logo color="#102632" circleColor="#ffffff"></Logo>
          </Sidebar>
        )}
        <Main>
          <p>Exploring complex data visualizations from wordwide trending topics!</p>
          <section>
            <SectionTitle>Trending now</SectionTitle>
            <div style={{ height: "400px", background: "black", width: "100%" }}></div>
          </section>
          <section>
            <SectionTitle>Latest researches</SectionTitle>
            <ProjectCardList list={mockData}></ProjectCardList>
          </section>
        </Main>
      </Layout>
    </>
  );
};

export default Index;
