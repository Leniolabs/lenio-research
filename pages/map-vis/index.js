import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { LogoHeaderContainer } from "@components/styled";
import MapVisMainSnippet from "@projects/map-vis";

const RowContainer = styled.div`
  background: #fffbf0;
  color: #2a3f55;
  margin: 0;
  padding: 2rem;
  > div {
    position: relative;
  }
`;

const Footer = styled.footer`
  background-color: #2a3f55;
  color: #fff;
  padding: 2rem;
  text-align: right;
`;
const FooterLogo = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  p {
    font-size: 1rem;
    margin: 0 1rem 0 0;
  }
`;

export const Index = () => {
  return (
    <div>
      <Head>
        <title>Leniolabs_ Research</title>
        <meta
          name="description"
          content="Data Visualization of Opportunities in The US Housing Market"
        />
        <meta
          name="title"
          content="Leniolabs_ Research: Opportunities in The US Housing Market"
          key="title"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://research.leniolabs.com/" />
        <meta name="twitter:creator" content="@Leniolabs_" />
        <meta
          name="twitter:title"
          content="Leniolabs_ Research: Opportunities in The US Housing Market"
        />
        <meta
          name="twitter:description"
          content="Data Visualization of Opportunities in The US Housing Market"
        />
        <meta name="twitter:image" content="https://research.leniolabs.com/space-day.png" />
        <meta property="og:url" content="https://research.leniolabs.com/vaccinations.html" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Leniolabs_ Research: Opportunities in The US Housing Market"
        />
        <meta property="og:image" content="https://research.leniolabs.com/space-day.png" />
        <meta property="og:image:alt" content="Opportunities in The US Housing Market" />
        <meta
          property="og:description"
          content="Data Visualization of Opportunities in The US Housing Market"
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
      <MapVisMainSnippet></MapVisMainSnippet>
      <Footer>
        <a href="https://leniolabs.com" target="_blank" rel="noreferrer">
          <FooterLogo>
            <p>Created by</p>
            <svg
              width="120"
              height="49"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 260.3 104.8"
              overflow="visible">
              <path
                fill="currentColor"
                d="M162.5 104.8H0V0h162.5v26.1h-5.3V5.3H5.3v94.2h151.9V77.4h5.3z"
              />
              <path
                fill="currentColor"
                d="M39.6 62.4h13.1v4.4H34.2V38.9h5.4v23.5zM67.3 67.2c-1.6 0-3.1-.3-4.4-.8s-2.4-1.2-3.4-2.1c-.9-.9-1.7-2-2.2-3.2-.5-1.2-.8-2.5-.8-3.9v-.8c0-1.6.2-3 .7-4.3.5-1.3 1.2-2.4 2.1-3.4.9-.9 2-1.7 3.2-2.2 1.2-.5 2.6-.8 4-.8 1.5 0 2.8.2 4 .7 1.2.5 2.2 1.2 3 2.1.8.9 1.4 2 1.9 3.2.4 1.3.6 2.7.6 4.2v2.3H62.1c.1.7.3 1.3.6 1.9.3.6.7 1.1 1.2 1.5.5.4 1 .7 1.7 1 .6.2 1.3.3 2.1.3.5 0 1-.1 1.6-.2.5-.1 1-.3 1.5-.5s.9-.4 1.3-.7c.4-.3.8-.6 1.1-1l2.7 2.9c-.3.5-.8.9-1.3 1.4-.5.5-1.2.9-1.9 1.2-.7.4-1.5.6-2.4.9-1 .2-2 .3-3 .3zM66.7 50c-.6 0-1.2.1-1.6.3-.5.2-.9.5-1.3.9s-.7.9-.9 1.4c-.3.6-.4 1.2-.6 1.8H71V54c0-.6-.1-1.1-.3-1.6-.2-.5-.5-.9-.8-1.3-.4-.4-.8-.7-1.3-.9-.6-.1-1.2-.2-1.9-.2zM85.3 46l.3 2.9c.7-1 1.6-1.8 2.7-2.4 1.1-.6 2.2-.9 3.5-.9 1 0 2 .2 2.9.5.9.3 1.6.8 2.3 1.5.6.7 1.1 1.5 1.5 2.6.4 1.1.5 2.3.5 3.8v12.8h-5.3V54.1c0-.8-.1-1.5-.3-2-.2-.5-.5-.9-.8-1.3-.3-.3-.8-.5-1.2-.6-.5-.1-1-.2-1.6-.2-.9 0-1.7.2-2.3.5-.6.4-1.2.9-1.6 1.5v14.8h-5.4V46h4.8zM105 46h11.3v16.4h5.6v4.3H105v-4.3h5.9v-12H105V46zm5.6-5.3c0-.4.1-.8.2-1.1.1-.4.4-.7.6-.9.3-.3.6-.4 1-.6.4-.1.8-.2 1.3-.2.9 0 1.7.3 2.3.8.6.5.8 1.2.8 2s-.3 1.5-.8 2c-.6.5-1.3.8-2.3.8-.5 0-.9-.1-1.3-.2s-.7-.3-1-.6c-.3-.2-.5-.5-.6-.9-.2-.3-.2-.7-.2-1.1zM126.1 56.2c0-1.5.2-2.9.7-4.2.4-1.3 1.1-2.4 1.9-3.3.8-.9 1.9-1.7 3.1-2.2 1.2-.5 2.6-.8 4.2-.8s2.9.3 4.2.8c1.2.5 2.2 1.3 3.1 2.2.8.9 1.5 2.1 1.9 3.3.4 1.3.7 2.7.7 4.2v.4c0 1.5-.2 2.9-.7 4.2-.4 1.3-1.1 2.4-1.9 3.3-.8.9-1.9 1.7-3.1 2.2-1.2.5-2.6.8-4.1.8-1.6 0-3-.3-4.2-.8-1.2-.5-2.3-1.3-3.1-2.2-.8-.9-1.5-2.1-1.9-3.3-.4-1.3-.7-2.7-.7-4.2v-.4zm5.3.4c0 .9.1 1.7.2 2.4.2.8.4 1.4.8 2 .4.6.8 1 1.4 1.4.6.3 1.3.5 2.1.5s1.5-.2 2-.5c.6-.3 1-.8 1.4-1.4.4-.6.6-1.2.8-2 .2-.8.2-1.6.2-2.4v-.4c0-.8-.1-1.6-.2-2.4-.2-.8-.4-1.4-.8-2-.4-.6-.8-1-1.4-1.4-.6-.3-1.2-.5-2.1-.5-.8 0-1.5.2-2 .5-.6.3-1 .8-1.4 1.4-.4.6-.6 1.2-.8 2-.2.8-.2 1.6-.2 2.4v.4zM151.1 37.3h11.6v25.1h5.9v4.3H151v-4.3h6.2V41.7H151v-4.4zM186.1 66.8c-.1-.3-.2-.5-.3-.9-.1-.3-.2-.7-.2-1.1-.3.3-.6.6-1 .9-.4.3-.8.5-1.3.7-.5.2-1 .4-1.5.5-.6.1-1.2.2-1.8.2-1.1 0-2-.2-2.9-.5-.9-.3-1.7-.7-2.3-1.3-.6-.5-1.1-1.2-1.5-2-.4-.8-.5-1.6-.5-2.5 0-2.2.8-3.9 2.4-5.1 1.6-1.2 4.1-1.8 7.3-1.8h3v-1.2c0-1-.3-1.8-1-2.4-.7-.6-1.6-.9-2.8-.9-1.1 0-1.9.2-2.4.7-.5.5-.7 1.1-.7 1.9h-5.3c0-.9.2-1.7.6-2.5.4-.8 1-1.5 1.7-2.1.7-.6 1.7-1.1 2.7-1.4 1.1-.4 2.3-.5 3.7-.5 1.3 0 2.4.2 3.5.5s2 .8 2.8 1.4c.8.6 1.4 1.4 1.9 2.3.4.9.7 2 .7 3.2v8.9c0 1.1.1 2 .2 2.8.1.7.3 1.4.6 1.9v.3h-5.6zm-5.1-3.7c.5 0 1-.1 1.5-.2s.9-.3 1.2-.5c.4-.2.7-.4 1-.7.3-.3.5-.5.6-.8v-3.6h-2.7c-.8 0-1.5.1-2.1.2-.6.2-1.1.4-1.4.7-.4.3-.6.6-.8 1-.2.4-.3.8-.3 1.3 0 .7.3 1.3.8 1.8s1.2.8 2.2.8zM215.1 56.6c0 1.5-.2 3-.5 4.3-.3 1.3-.8 2.4-1.5 3.3-.7.9-1.5 1.7-2.5 2.2-1 .5-2.2.8-3.5.8-1.2 0-2.3-.2-3.2-.7-.9-.5-1.7-1.1-2.3-1.9l-.2 2.2h-4.8V37.3h5.3v10.6c.6-.7 1.3-1.3 2.2-1.7.8-.4 1.8-.6 2.9-.6 1.4 0 2.5.3 3.6.8 1 .5 1.9 1.3 2.5 2.2.7.9 1.2 2 1.5 3.3.3 1.3.5 2.7.5 4.2v.5zm-5.4-.4c0-.8-.1-1.6-.2-2.4-.1-.8-.3-1.4-.7-2-.3-.6-.7-1-1.3-1.4-.5-.3-1.2-.5-2-.5-1 0-1.8.2-2.4.6-.6.4-1.1 1-1.4 1.7v8.3c.3.7.8 1.3 1.4 1.7.6.4 1.4.6 2.4.6.8 0 1.5-.2 2-.5s.9-.7 1.3-1.3c.3-.6.5-1.2.7-2 .1-.8.2-1.6.2-2.5v-.3zM232.9 61.1c0-.3-.1-.6-.2-.8-.1-.2-.4-.5-.8-.7-.4-.2-.9-.4-1.5-.6-.6-.2-1.4-.4-2.4-.5-1.2-.2-2.3-.5-3.3-.9s-1.9-.8-2.6-1.3c-.7-.5-1.3-1.1-1.7-1.8-.4-.7-.6-1.5-.6-2.3 0-.9.2-1.7.6-2.5.4-.8 1-1.5 1.8-2.1.8-.6 1.7-1.1 2.8-1.4 1.1-.3 2.3-.5 3.7-.5 1.4 0 2.7.2 3.9.5 1.2.3 2.1.8 2.9 1.4.8.6 1.4 1.3 1.8 2.1.4.8.6 1.7.6 2.7h-5.3c0-.8-.3-1.5-1-2s-1.6-.8-3-.8c-1.2 0-2.2.2-2.8.7-.6.4-.9 1-.9 1.6 0 .3.1.6.2.9.1.3.4.5.7.7.3.2.8.4 1.3.6.6.2 1.3.3 2.1.5 1.3.2 2.4.5 3.5.8 1.1.3 2 .7 2.8 1.2.8.5 1.4 1.1 1.8 1.8.4.7.7 1.6.7 2.6 0 .9-.2 1.8-.7 2.5-.4.8-1.1 1.4-1.9 2-.8.6-1.8 1-2.9 1.3-1.2.3-2.4.5-3.9.5-1.6 0-2.9-.2-4.1-.6-1.2-.4-2.2-.9-3-1.6-.8-.7-1.4-1.4-1.8-2.2-.4-.8-.6-1.7-.6-2.5h5.1c0 .6.2 1 .5 1.4.3.4.6.7 1 1 .4.3.9.4 1.4.5.5.1 1.1.2 1.7.2 1.3 0 2.3-.2 3-.6.8-.6 1.1-1.1 1.1-1.8zM260.3 71h-17.5v-4.2h17.5V71z"
              />
              <circle fill="#3aa9cc" cx="20.1" cy="20.1" r="6" />
            </svg>
          </FooterLogo>
        </a>
      </Footer>
    </div>
  );
};

export default Index;
