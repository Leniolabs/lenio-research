/* eslint-disable jsx-a11y/no-onchange */
import {
  Layout,
  Header,
  Footer,
  FirstSection,
  GraphicSection,
  TimelineSection
} from "./timeline.style";
import { Houses } from "./svg-components/Houses";
import { Timeline } from "./components/HorizontalTimeline";
import LogoWithName from "@components/LogoWithName";
import { Graphic } from "./svg-components/Graphic";
import Link from "next/link";
import { LogoHeaderContainer } from "@components/styled";
import { HeadLogoContainer } from "@components/styled";

export const Index = () => {
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
      <main>
        <FirstSection>
          <h1>Return to office <br/>or remote culture</h1>
          <p>Top companies and that changed their plans during pandemic.</p>
        </FirstSection>
        <TimelineSection>
          <Timeline />
        </TimelineSection>
        <GraphicSection>
          <h2>Return to the office by Company</h2>
          <Graphic></Graphic>
        </GraphicSection>
        <Houses></Houses>
      </main>
      <Footer></Footer>
    </Layout>
  );
};

export default Index;
