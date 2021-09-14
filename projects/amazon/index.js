/* eslint-disable jsx-a11y/no-onchange */
import React from "react";
import {
  Layout,
  FirstSection,
  GraphicSection,
  TimelineSection,
  TimelineSubtitle,
  AmazonContainer,
  Card
} from "./amazon.style";
import Link from "next/link";
import { LogoHeaderContainer } from "@components/styled";
import { HeadLogoContainer } from "@components/styled";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { DotMap } from "./components/DotMap";
import {
  dotData,
  dotData2,
  coordinateData,
  coordinateData2,
  randomizeData
} from "./components/sampleData";
import { ScrollController } from "./components/ScrollController";

console.log(coordinateData);
console.log(coordinateData2);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      delay: 0.5
    }
  }
};
const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const Index = () => {
  const [data, setData] = React.useState(coordinateData2);
  const { ref, inView } = useInView({
    threshold: 0
  });
  const [mounted, setMounted] = useState(false);

  const changeData = React.useCallback(() => {
    setData(randomizeData(data));
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => setData(randomizeData(data)), 2000);
    return () => clearInterval(timer);
  }, [data]);

  useEffect(() => {
    if (inView && !mounted) {
      setMounted(true);
    }
  }, [inView]);
  return (
    <Layout>
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
      <main className="main-amazon">
        <FirstSection ref={ref}>
          <h1 onClick={changeData}>Amazonas Deforestation</h1>
          <div style={{ border: "5px solid rgb(27,17,39)", borderRadius: 50, height: 600, margin: 10, padding: 4 }}>
            <DotMap data={data} />
          </div>
        </FirstSection>
        <GraphicSection>
          <h2>Map</h2>
        </GraphicSection>
        <TimelineSection></TimelineSection>
        <TimelineSubtitle>A subtitle</TimelineSubtitle>
        <p className="footnote">Last Updated June 30th 2021.</p>
      </main>
    </Layout>
  );
};
export default Index;
