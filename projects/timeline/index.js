/* eslint-disable jsx-a11y/no-onchange */
import {
  Layout,
  FirstSection,
  GraphicSection,
  TimelineSection,
  ConclusionContainer,
  TimelineSubtitle
} from "./timeline.style";
import { Timeline } from "./components/HorizontalTimeline";
import Link from "next/link";
import { LogoHeaderContainer } from "@components/styled";
import { HeadLogoContainer } from "@components/styled";
import ConclusionCard from "./components/ConclusionCard";
import data from "./timeline.data";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import CompaniesGraphic from "./components/CompaniesGraphic";

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
  const { ref, inView } = useInView({
    threshold: 0
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (inView && !mounted) {
      setMounted(true);
    }
  }, [inView]);
  const conclusionList = data.map(({ conclusion, logo }) => ({ conclusion, logo }));
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
      <main className="main-timeline">
        <FirstSection>
          <h1>
            How the pandemic shaped <br />
            the office culture
          </h1>
          <p>Comparing top companies that changed their plans during the COVID-19 crisis.</p>
        </FirstSection>
        <GraphicSection>
          <h2>Timeline from May 2020 to present</h2>
          <CompaniesGraphic></CompaniesGraphic>
        </GraphicSection>
        <TimelineSection>
          <Timeline />
        </TimelineSection>
        <TimelineSubtitle ref={ref}>Conclusions July 2020</TimelineSubtitle>
        {mounted && (
          <ConclusionContainer variants={container} initial="hidden" animate="show">
            {conclusionList?.map(({ conclusion, logo }, key) => (
              <ConclusionCard key={key} variants={item} {...conclusion} logo={logo} />
            ))}
          </ConclusionContainer>
        )}
        <p className="footnote">Last Updated June 30th 2021.</p>
      </main>
    </Layout>
  );
};
export default Index;
