/* eslint-disable jsx-a11y/no-onchange */
import React from "react";
import {
  Header,
  MainAmazon,
  LegendBox,
  Layout,
  FirstSection,
  GraphicSection,
  Footer,
  CreatedByContainer,
  GithubContainer,
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
import { AmazonasMap } from "./components/AmazonasMap";
import { MapBackground } from "./components/MapBackground";
import { Timeline } from "./components/Timeline";

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
  const [playing, setPlaying] = React.useState(false);
  const [currentYear, setCurrentYear] = React.useState(2001);
  const [mounted, setMounted] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0
  });

  const handlePlay = React.useCallback(() => {
    setPlaying(true);
  }, []);

  const handlePause = React.useCallback(() => {
    setPlaying(false);
  }, []);

  useEffect(() => {
    if (playing) {
      const timer = setInterval(() => {
        setCurrentYear((year) => (year >= 2020 ? 2001 : year + 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [playing]);

  useEffect(() => {
    if (inView && !mounted) {
      setMounted(true);
    }
  }, [inView]);

  return (
    <Layout>
      <Header>
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
          <GithubContainer>
            <a href="https://github.com/Leniolabs/lenio-research" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 180 180" width="120" height="120" overflow="visible">
                <path
                  fill="#FFF"
                  d="m0 0 183 183V0H0zm136 85c-2 0-3-1-3-2V72l-2-6c7 0 15-1 15-14 0-3-1-5-3-7 0-1 1-4-1-9-2-1-9 4-9 4l-8-2-8 2s-6-5-8-4c-2 5-1 8-1 9-2 2-3 4-3 7 0 13 8 14 15 14l-2 5c-2 1-7 2-10-3-1-3-5-3-5-3-3 0 0 2 0 2l4 4c2 6 11 4 11 4v8c0 1-1 2-3 2-12-5-21-17-21-31 0-18 13-31 31-31s32 13 32 31c0 14-9 26-21 31zm-19-13v1l-1-1h1zm-2 1h-1v-1l1 1zm-3-1-1 1v-1h1zm-2-1h-1 1zm-2-1-1-1v-1l1 1v1zm-1-2h-1v-1h1v1zm-1-2h-1 1z"
                />
              </svg>
            </a>
          </GithubContainer>
        </HeadLogoContainer>
      </Header>
      <MainAmazon>
        <FirstSection ref={ref}>
          <h1>Deforestation of the Amazon</h1>
          <h2>Annual change in forest area</h2>
          <LegendBox>
            <div>
              <svg width="40" height="40">
                <circle stroke="#fff" fill="none" cx="20" cy="20" r="8" />
              </svg>
              100 km2
            </div>
            <div>
              <svg width="40" height="40">
                <rect fill="var(--amazongreen, #99B898)" x="12" y="12" width="16" height="16" />
              </svg>
              Tree cover
            </div>
            <div>
              <svg width="40" height="40">
                <rect fill="var(--amazonyellow, #FECEAB)" x="12" y="12" width="16" height="16" />
              </svg>
              Up to 30% tree cover loss
            </div>
            <div>
              <svg width="40" height="40">
                <rect fill="var(--amazonorange, #FF847C)" x="12" y="12" width="16" height="16" />
              </svg>
              Up to 60% tree cover loss
            </div>
            <div>
              <svg width="40" height="40">
                <rect fill="var(--amazonred, #E84A5F)" x="12" y="12" width="16" height="16" />
              </svg>
              100% Tree cover loss
            </div>
          </LegendBox>
        </FirstSection>
        <GraphicSection>
          <div className="map-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="500"
              height="800"
              viewBox="0 0 500 500"
              preserveAspectRatio="xMinYMin meet"
              overflow="visible">
              <MapBackground />
              <AmazonasMap currentYear={currentYear} />
            </svg>
            <Timeline
              currentYear={currentYear}
              playing={playing}
              onPlay={handlePlay}
              onPause={handlePause}
            />
          </div>
          <aside className="sidebar">
            <div className="side-box">
              <h3>% of deforestation</h3>
              <svg viewBox="0 0 40 40" className="donut">
                <g stroke-width="3" transform="rotate(-90 20 20)">
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    stroke-dasharray="100 100"
                    stroke-dashoffset="0"
                    stroke="var(--amazongreen, #99B898)"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    stroke-dasharray="40 100"
                    stroke-dashoffset="0"
                    stroke="var(--amazonred, #E84A5F)"
                  />
                </g>
                <text x="20" y="23" fill="#fff" fontSize=".65rem" text-anchor="middle">
                  40%
                </text>
              </svg>
            </div>
            <div className="side-box">
              <h3>How many</h3>
              <svg
                className="stadium"
                xmlns="http://www.w3.org/2000/svg"
                width="68.9"
                height="47.4"
                overflow="visible">
                <path fill="#40394A" d="M0 0h68.9v47.4H0z" />
                <g opacity=".8" fill="none" stroke="#FFF" stroke-miterlimit="10">
                  <path d="M3 2.8h63v41.7H3z" />
                  <circle cx="34.5" cy="23.7" r="5.4" />
                  <path d="M4.9 3C4.9 4.1 4 4.9 3 4.9M64 3c0 1.1.9 1.9 1.9 1.9M4.9 44.5c0-1.1-.9-1.9-1.9-1.9M64 44.5c0-1.1.9-1.9 1.9-1.9M3 12.1h9.6v23.1H3z" />
                  <path d="M3 18.4h3.3V29H3zM12.4 29.1c2-1 3.3-3 3.3-5.4 0-2.4-1.4-4.4-3.3-5.4" />
                  <g>
                    <path d="M66 35.3h-9.6V12.2H66z" />
                    <path d="M66 29h-3.4V18.4H66zM56.5 29.1a6 6 0 0 1-3.3-5.4c0-2.4 1.4-4.4 3.3-5.4" />
                  </g>
                  <path d="M34.5 2.9v41.7" />
                </g>
              </svg>
              <p className="howmanynumber">x 123,200</p>
            </div>
            <div className="side-box">
              <h3>Annual trend</h3>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 220">
                <path
                  fill="none"
                  stroke="#fff"
                  stroke-miterlimit="10"
                  d="M20.2 203.7H490M32.8 8.4v208.1"
                />
                <path
                  d="M35 179.7c9.9 1 20 1.9 29.7-.2s17.7-7.7 25-14.3c8-7.1 15.7-14 26-17.5 9.7-3.2 21.4-4.3 30.4 1.6 7.7 5 13.2 13 21.7 17.1 8.8 4.3 18.8 4 28.3 2.7 5.4-.7 10.8-1.6 16.2-2.7a159.9 159.9 0 0 0 16.6-3.8 65.7 65.7 0 0 0 8.4-3.8c11.5-5.5 22.9-11.1 34.7-15.8a93.2 93.2 0 0 1 16.2-5.3c7.4-1.4 15 1.6 22.4-.7 9.3-2.8 14.7-12 20.5-19l10-12c3-4 5.5-8 8-12a58 58 0 0 1 35-24.6c14.8-4 30.4-4.8 45.6-6.9 17-2.3 34-6.2 49.3-14.3a106.2 106.2 0 0 0 11.7-7.2c1.6-1.1.1-3.7-1.5-2.6A121.5 121.5 0 0 1 440 57.9c-15.5 2.8-31.3 3.6-46.8 6.4a71.4 71.4 0 0 0-37.7 17.2c-6.2 6-10 13.5-15 20.4-3.1 4.2-6.6 8.1-9.9 12.2s-6.3 8.2-9.8 12a24 24 0 0 1-11.7 8.3c-5.4 1.4-11 .1-16.4 0-4.4-.1-8.9 1.3-13 2.7-12.3 4-24 9.7-35.7 15.3l-12.9 6.2c-5.7 2.6-12.7 3.6-19 4.9-10.3 2-21.1 4.4-31.7 3.4a32.2 32.2 0 0 1-14.8-5.2c-3.8-2.6-7-5.9-10.5-9a45.8 45.8 0 0 0-10.6-7.8 31.3 31.3 0 0 0-14.8-2.7 53.7 53.7 0 0 0-27.6 9c-8.4 5.6-14.9 13.5-23.2 19.1a49.2 49.2 0 0 1-29 7.5c-5-.1-9.8-.6-14.7-1-2-.2-2 2.8 0 3Z"
                  fill="#e84a5f"
                  opacity=".6"
                />
                <path fill="#e84a5f" d="M41.5 13.2h17v17h-17z" />
                <text transform="translate(68.3 26.5)" font-size="18" fill="#fff">
                  Deforestation
                </text>
                <text
                  transform="translate(5 54.5)"
                  font-size="14"
                  fill="#fff"
                  font-family="SourceSansPro-Regular, Source Sans Pro">
                  2M
                </text>
                <path fill="none" stroke="#fff" stroke-miterlimit="10" d="M28.5 50.7h4.3" />
              </svg>
            </div>
          </aside>
        </GraphicSection>
      </MainAmazon>
      <Footer>
        <p className="footnote">
          This is a sentence for a disclaimer, and to mention the resources. Sources:{" "}
          <a href="https://restgis.com" target="_blank" rel="noreferrer">
            RestGis
          </a>
        </p>
        <CreatedByContainer>
          <div>Created by</div>
          <a href="https://leniolabs.com" target="_blank" rel="noreferrer">
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
          </a>
        </CreatedByContainer>
      </Footer>
    </Layout>
  );
};
export default Index;
