/* eslint-disable jsx-a11y/no-onchange */
import React from "react";
import {
  Header,
  MainGlobalWarming,
  Layout,
  FirstSection,
  GraphicSection,
  Footer,
  GithubContainer
} from "./global-warming.style";
import Link from "next/link";
import { LogoHeaderContainer } from "@components/styled";
import { HeadLogoContainer } from "@components/styled";

import { WinterMap } from "./WinterMap";
import { Controls } from "./Controls";

export const Index = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [year, setYear] = React.useState(2005);
  const [daysThreshold, setDaysThreshold] = React.useState(45);
  const [region, setRegion] = React.useState({
    value: "world",
    label: "World"
  });

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  React.useEffect(() => {
    if (isPlaying && year === 2099) {
      setYear(2005);
    }
    if (isPlaying) {
      const timer = setInterval(() => {
        setYear((year) => (year === 2099 ? 2005 : year + 1));
      }, 250);
      return () => clearInterval(timer);
    }
  }, [isPlaying]);

  return (
    <Layout>
      <Header>
        <HeadLogoContainer>
          <Link href="/">
            <LogoHeaderContainer link>
              <svg
                title="leniolabs research home"
                role="img"
                className="lenio-iso"
                width="75"
                height="75"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 165 165"
                overflow="visible"
                tabIndex="0">
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
            <a
              href="https://github.com/Leniolabs/lenio-research"
              target="_blank"
              rel="noreferrer"
              title="github repository">
              <svg viewBox="0 0 180 180" width="120" height="120" overflow="visible" role="img">
                <path
                  fill="#FFF"
                  d="m0 0 183 183V0H0zm136 85c-2 0-3-1-3-2V72l-2-6c7 0 15-1 15-14 0-3-1-5-3-7 0-1 1-4-1-9-2-1-9 4-9 4l-8-2-8 2s-6-5-8-4c-2 5-1 8-1 9-2 2-3 4-3 7 0 13 8 14 15 14l-2 5c-2 1-7 2-10-3-1-3-5-3-5-3-3 0 0 2 0 2l4 4c2 6 11 4 11 4v8c0 1-1 2-3 2-12-5-21-17-21-31 0-18 13-31 31-31s32 13 32 31c0 14-9 26-21 31zm-19-13v1l-1-1h1zm-2 1h-1v-1l1 1zm-3-1-1 1v-1h1zm-2-1h-1 1zm-2-1-1-1v-1l1 1v1zm-1-2h-1v-1h1v1zm-1-2h-1 1z"
                />
              </svg>
            </a>
          </GithubContainer>
        </HeadLogoContainer>
      </Header>
      <WinterMap daysThreshold={daysThreshold} region={region} year={year} />
      <MainGlobalWarming>
        <FirstSection>
          <h1>Global Warming</h1>
          <h2>Cities where Winter Olympic </h2>
        </FirstSection>
        <Controls
          year={year}
          onYearClick={setYear}
          region={region}
          onRegionChange={setRegion}
          onPlay={handlePlay}
          onPause={handlePause}
          isPlaying={isPlaying}
          daysThreshold={daysThreshold}
          onDaysThresholdChange={({ value }) => setDaysThreshold(value)}
        />
      </MainGlobalWarming>
      <Footer>
        <p className="footnote">
          Generated using{" "}
          <a
            href="https://www.globalforestwatch.org/map/?map=eyJjZW50ZXIiOnsibGF0IjotMTYuMjM5MTk0OTA4MTU2MjcsImxuZyI6LTQ1LjYyNzkzMzc4MTY0OTEzfSwiem9vbSI6Mi44MTMwODkzNTY0MjUxNzE4LCJkYXRhc2V0cyI6W3siZGF0YXNldCI6InBvbGl0aWNhbC1ib3VuZGFyaWVzIiwibGF5ZXJzIjpbImRpc3B1dGVkLXBvbGl0aWNhbC1ib3VuZGFyaWVzIiwicG9saXRpY2FsLWJvdW5kYXJpZXMiXSwib3BhY2l0eSI6MSwidmlzaWJpbGl0eSI6dHJ1ZX0seyJkYXRhc2V0IjoidHJlZS1jb3Zlci1nYWluIiwibGF5ZXJzIjpbInRyZWUtY292ZXItZ2Fpbi0yMDAxLTIwMTIiXSwib3BhY2l0eSI6MSwidmlzaWJpbGl0eSI6dHJ1ZX0seyJkYXRhc2V0IjoidHJlZS1jb3Zlci1sb3NzIiwibGF5ZXJzIjpbInRyZWUtY292ZXItbG9zcyJdLCJvcGFjaXR5IjoxLCJ2aXNpYmlsaXR5Ijp0cnVlLCJ0aW1lbGluZVBhcmFtcyI6eyJzdGFydERhdGUiOiIyMDAxLTAxLTAxIiwiZW5kRGF0ZSI6IjIwMjAtMTItMzEiLCJ0cmltRW5kRGF0ZSI6IjIwMjAtMTItMzEifX0seyJkYXRhc2V0IjoidHJlZS1jb3ZlciIsImxheWVycyI6WyJ0cmVlLWNvdmVyLTIwMTAiXSwib3BhY2l0eSI6MSwidmlzaWJpbGl0eSI6dHJ1ZX1dfQ%3D%3D&mapPrompts=eyJvcGVuIjp0cnVlLCJzdGVwc0tleSI6InN1YnNjcmliZVRvQXJlYSJ9&menu=eyJkYXRhc2V0Q2F0ZWdvcnkiOiJmb3Jlc3RDaGFuZ2UiLCJtZW51U2VjdGlvbiI6ImRhdGFzZXRzIn0%3D"
            target="_blank"
            rel="noreferrer">
            GlobalForestWatch
          </a>{" "}
          data. Circles area calculated at Equator. 2040 Prediction from{" "}
          <a
            href="https://www.science.org/doi/10.1126/sciadv.aat2340"
            target="_blank"
            rel="noreferrer">
            Amazon Tipping Point Paper
          </a>
          .<br />
          Sources:{" "}
          <a href="https://restgis.com" target="_blank" rel="noreferrer">
            RestGis
          </a>
          . Created by <a href="https://leniolabs.com">Leniolabs</a>
        </p>
      </Footer>
    </Layout>
  );
};
export default Index;
