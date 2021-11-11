import AmazonMainSnippet from "@projects/amazon";
import Head from "next/head";

export const Index = () => {
  return (
    <>
      <Head>
        <title>Leniolabs_ Research</title>
        <meta name="description" content="Data Visualization of Deforestation of the Amazon" />
        <meta name="title" content="Leniolabs_ Research: Deforestation of the Amazon" key="title" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://research.leniolabs.com/" />
        <meta name="twitter:creator" content="@Leniolabs_" />
        <meta name="twitter:title" content="Leniolabs_ Research: Deforestation of the Amazon" />
        <meta
          name="twitter:description"
          content="Data Visualization of Deforestation of the Amazon"
        />
        <meta name="twitter:image" content="https://research.leniolabs.com/amazonas.jpg" />
        <meta property="og:url" content="https://research.leniolabs.com/amazon.html" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Leniolabs_ Research: Deforestation of the Amazon" />
        <meta property="og:image" content="https://research.leniolabs.com/amazonas.jpg" />
        <meta property="og:image:alt" content="Deforestation of the Amazon" />
        <meta property="og:description" content="Deforestation of the Amazon" />
        <meta property="og:site_name" content="Leniolabs_ Research" />
        <meta property="og:locale" content="en_US" />
        <meta property="article:author" content="Leniolabs_ Research" />
      </Head>
      <AmazonMainSnippet />
    </>
  );
};

export default Index;
