import * as React from "react";
import Head from "next/head";
import Home from "@projects/home";

export const Index = () => {
  return (
    <div>
      <Head>
        <title>Leniolabs_ Research</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Data Visualization of Top countries with Paralympic medals by year"
        />
        <meta name="title" content="Leniolabs_ Research: Paralympics" key="title" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://research.leniolabs.com/paralympics" />
        <meta name="twitter:creator" content="@Leniolabs_" />
        <meta name="twitter:title" content="Leniolabs_ Research: Paralympics" />
        <meta
          name="twitter:description"
          content="Data Visualization of Top countries with Paralympic medals by year"
        />

        <meta
          name="twitter:image"
          content="https://research.leniolabs.com/static/meta-paralympics.gif"
        />
        <meta property="og:url" content="https://research.leniolabs.com/paralympics" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Leniolabs_ Research: Paralympics" />
        <meta
          property="og:image"
          content="https://research.leniolabs.com/static/meta-paralympics.gif"
        />
        <meta
          property="og:image:alt"
          content="Data Visualization of Top countries with Paralympic medals by year"
        />
        <meta
          property="og:description"
          content="Data Visualization of Top countries with Paralympic medals by year"
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
