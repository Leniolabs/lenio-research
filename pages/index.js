import * as React from "react";
import Head from "next/head";
import styled from "styled-components";
import Home from "@projects/home";

const RowContainer = styled.div`
  background: #243042;
  color: #fffbf3;
  margin: 0;
  padding: 2rem;
  > div {
    position: relative;
  }
`;

export const Index = () => {
  return (
    <div>
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
      <Home></Home>
    </div>
  );
};

export default Index;
