import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import SpaceFlightMainSnippet from "@projects/space-flight";
import { LogoHeaderContainer } from "@components/styled";
import Footer from "@components/footer";

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
      <header>
        <RowContainer>
          <Link href="/">
            <LogoHeaderContainer link>
              <svg
                className="lenio-iso"
                width="75"
                height="75"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 165 165"
                overflow="visible">
                <path
                  fill="currentColor"
                  d="M165.4 165.4H0V0h165.4v41.2H157V8.4H8.4V157H157v-34.3h8.4z"
                />
                <path
                  fill="currentColor"
                  d="M71.6 98.4h20.6v6.9H63.1V61.2h8.5v37.2zM127.2 111.8H99.6v-6.6h27.6v6.6z"
                />
                <circle fill="#30aab3" cx="30.5" cy="31.5" r="9.6" />
              </svg>
              <p className="lenio-iso-text">
                <strong>Data Research</strong>
                <br />
                <span>by Leniolabs_</span>
              </p>
            </LogoHeaderContainer>
          </Link>
        </RowContainer>
      </header>
      <SpaceFlightMainSnippet />
      <Footer />
    </div>
  );
};

export default Index;
