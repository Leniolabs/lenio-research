import GlobalWarmingMainSnippet from "@projects/global-warming";
import Head from "next/head";

export const Index = () => {
  return (
    <>
      <Head>
        <title>Leniolabs_ Research</title>
        <meta
          name="description"
          content="Interactive map with cities where climate change will not allow future winter Olympics to happen."
        />
        <meta name="title" content="Leniolabs_ Research: Global Warming" key="title" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://research.leniolabs.com/" />
        <meta name="twitter:creator" content="@Leniolabs_" />
        <meta name="twitter:title" content="Leniolabs_ Research: Global Warming" />
        <meta
          name="twitter:description"
          content="Interactive map with cities where climate change will not allow future winter Olympics to happen."
        />
        <meta name="twitter:image" content="https://research.leniolabs.com/global-warming.png" />
        <meta property="og:url" content="https://research.leniolabs.com/global-warming.html" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Leniolabs_ Research: Global Warming" />
        <meta property="og:image" content="https://research.leniolabs.com/global-warming.png" />
        <meta property="og:image:alt" content="Global Warming map" />
        <meta
          property="og:description"
          content="Interactive map with cities where climate change will not allow future winter Olympics to happen."
        />
        <meta property="og:site_name" content="Leniolabs_ Research" />
        <meta property="og:locale" content="en_US" />
        <meta property="article:author" content="Leniolabs_ Research" />
      </Head>
      <GlobalWarmingMainSnippet />
    </>
  );
};

export default Index;
