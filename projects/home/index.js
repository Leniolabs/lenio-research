import * as React from "react";
import Head from "next/head";
import Logo from "@components/Logo";
import { SectionTitle } from "@components/styled";
import { Layout, Sidebar, Header, Main, Title, Small, HeroImage } from "./home.style";
import ProjectCardList from "@components/project-card-list/ProjectCardList";
import { useWindowSize } from "utils/useWindowSize";

import { mockData } from "./home.data";

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
            <HeroImage />
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
