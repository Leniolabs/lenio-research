import AmazonMainSnippet from "@projects/amazon";
import Head from "next/head";

export const Index = () => {
  return (
    <>
      <Head>
        <title>Leniolabs_ Research</title>
        <meta
          name="description"
          content="Data Visualization of how the pandemic shaped the office culture"
        />
        <meta
          name="title"
          content="Leniolabs_ Research: How the pandemic shaped the office culture"
          key="title"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://research.leniolabs.com/" />
        <meta name="twitter:creator" content="@Leniolabs_" />
        <meta
          name="twitter:title"
          content="Leniolabs_ Research: How the pandemic shaped the office culture"
        />
        <meta
          name="twitter:description"
          content="Data Visualization of how the pandemic shaped the office culture"
        />
        <meta name="twitter:image" content="https://research.leniolabs.com/return-to-office.png" />
        <meta property="og:url" content="https://research.leniolabs.com/timeline.html" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Leniolabs_ Research: How the pandemic shaped the office culture"
        />
        <meta property="og:image" content="https://research.leniolabs.com/return-to-office.png" />
        <meta property="og:image:alt" content="Opportunities in The US Housing Market" />
        <meta
          property="og:description"
          content="Data Visualization of how the pandemic shaped the office culture"
        />
        <meta property="og:site_name" content="Leniolabs_ Research" />
        <meta property="og:locale" content="en_US" />
        <meta property="article:author" content="Leniolabs_ Research" />
      </Head>
      <AmazonMainSnippet />
    </>
  );
};

export default Index;
