import WomenInTechMainSnippet from "@projects/women-in-tech";
import Head from "next/head";
import { LogoHeaderContainer } from "@components/styled";
import { HeadLogoContainer } from "@components/styled";
import Link from "next/link";
import Footer from "@components/footer";

export const Index = () => {
  return (
    <>
      <Head>
        <title>Leniolabs_ Research</title>
        <meta name="description" content="Distribution of Women Bachelors by field" />
        <meta
          name="title"
          content="Leniolabs_ Research: Distribution of Women Bachelors by field"
          key="title"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://research.leniolabs.com/" />
        <meta name="twitter:creator" content="@Leniolabs_" />
        <meta
          name="twitter:title"
          content="Leniolabs_ Research: Distribution of Women Bachelors by field"
        />
        <meta
          name="twitter:description"
          content="Data Visualization of the distribution of Women Bachelors by field"
        />

        {/* TODO: update meta tags */}
        {/* <meta name="twitter:image" content="https://research.leniolabs.com/return-to-office.png" /> */}
        {/* <meta property="og:url" content="https://research.leniolabs.com/timeline.html" /> */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Leniolabs_ Research: Distribution of Women Bachelors by field"
        />
        {/* <meta property="og:image" content="https://research.leniolabs.com/return-to-office.png" /> */}
        <meta property="og:image:alt" content="Opportunities in The US Housing Market" />
        <meta
          property="og:description"
          content="Data Visualization of the distribution of Women Bachelors by field"
        />
        <meta property="og:site_name" content="Leniolabs_ Research" />
        <meta property="og:locale" content="en_US" />
        <meta property="article:author" content="Leniolabs_ Research" />
      </Head>
      <header>
        <HeadLogoContainer>
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
        </HeadLogoContainer>
      </header>
      <WomenInTechMainSnippet />
      <Footer />
    </>
  );
};

export default Index;
