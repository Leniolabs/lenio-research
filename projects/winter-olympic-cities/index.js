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
} from "./winter-olympic-cities.style";
import Link from "next/link";
import { LogoHeaderContainer } from "@components/styled";
import { HeadLogoContainer } from "@components/styled";

import { WinterMap } from "./WinterMap";
import { Controls } from "./Controls";

const getRegionPosition = (region) => {
  switch (region) {
    case "NA":
      return {
        zoom: 4,
        center: [-100, 40]
      };
    case "EU":
      return {
        zoom: 4,
        center: [27, 48]
      };
    case "ASIA":
      return {
        zoom: 4,
        center: [135, 45]
      };
    default:
      return {
        zoom: 2.3,
        center: [-35, 0]
      };
  }
};

export const Index = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [year, setYear] = React.useState(2022);
  const [daysThreshold, setDaysThreshold] = React.useState(30);
  const [percentile, setPercentile] = React.useState(0);
  const [region, setRegion] = React.useState({
    value: "world",
    label: "World"
  });

  const [position, setPosition] = React.useState({
    center: [-35, 0],
    zoom: 2.3
  });

  const handlePlay = () => {
    setIsPlaying(true);
    setYear((year) => (year === 2099 ? 2022 : year));
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleRegionChange = (region) => {
    setRegion(region);
    setPosition(getRegionPosition(region.value));
  };

  const handleMapPositionChange = (position) => {
    const currentRegionPosition = getRegionPosition(region.value);

    if (
      region.value !== "world" &&
      (currentRegionPosition.zoom !== position.zoom ||
        currentRegionPosition.center[0] !== position.center[0] ||
        currentRegionPosition.center[1] !== position.center[1])
    )
      setRegion({
        value: "world",
        label: "World"
      });
  };

  React.useEffect(() => {
    if (isPlaying && year === 2099) {
      setIsPlaying(false);
    } else if (isPlaying) {
      const timer = setTimeout(() => {
        setYear((year) => (year === 2099 ? 2099 : year + 1));
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, year]);

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
      <WinterMap
        daysThreshold={daysThreshold}
        year={year}
        percentile={percentile}
        onPositionChange={handleMapPositionChange}
        position={position}
      />
      <MainGlobalWarming>
        <FirstSection>
          <h1>Winter Olympic Host Cities</h1>
          <h2>
            <strong>
              Click play: Where the torches go out, the venue cannot host Olympic games.
            </strong>
            <br></br>
            Scroll to zoom in and out. Click and drag to change perspective.
          </h2>
        </FirstSection>
        <Controls
          year={year}
          onYearClick={setYear}
          region={region}
          onRegionChange={handleRegionChange}
          onPlay={handlePlay}
          onPause={handlePause}
          isPlaying={isPlaying}
          percentile={percentile}
          onPercentileChange={({ value }) => setPercentile(value)}
        />
      </MainGlobalWarming>
      <Footer>
        <p className="footnote">
          Source:{" "}
          <a href="https://impactlab.org/" target="_blank" rel="noreferrer">
            Climate Impact Lab
          </a>
          . Created by <a href="https://leniolabs.com">Leniolabs</a>
          <br></br>
          For a geographical area to have enough snow to be suitable for the Winter Olympics, we
          consider that there must be more than 30 days of temperatures below 0.
        </p>
      </Footer>
    </Layout>
  );
};
export default Index;
