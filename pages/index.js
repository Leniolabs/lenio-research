import * as React from "react";
import Head from "next/head";
import Home from "@projects/home";

export const Index = () => {
  return (
    <div>
      <Head>
        <title>Leniolabs_ Research</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Representation and what happened to women in Tech" />
        <meta
          name="title"
          content="Leniolabs_ Research: What happened to women in Tech"
          key="title"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://research.leniolabs.com/" />
        <meta name="twitter:creator" content="@Leniolabs_" />
        <meta name="twitter:title" content="Leniolabs_ Research: What happened to women in Tech" />
        <meta
          name="twitter:description"
          content="Representation and what happened to women in Tech"
        />

        <meta
          name="twitter:image"
          content="https://research.leniolabs.com/static/meta-women-in-tech.jpg"
        />
        <meta property="og:url" content="https://research.leniolabs.com/women-in-tech.html" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Leniolabs_ Research: What happened to women in Tech" />
        <meta
          property="og:image"
          content="https://research.leniolabs.com/static/meta-women-in-tech.jpg"
        />
        <meta property="og:image:alt" content="Gender gap in male-female dominated fields" />
        <meta
          property="og:description"
          content="Representation and what happened to women in Tech"
        />
        <meta property="og:site_name" content="Leniolabs_ Research" />
        <meta property="og:locale" content="en_US" />
        <meta property="article:author" content="Leniolabs_ Research" />
      </Head>
      <Home />
    </div>
  );
};

export default Index;
