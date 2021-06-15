/* eslint-disable jsx-a11y/no-onchange */
import {
  Layout,
  Header,
  Footer,
  FirstSection,
  GraphicSection,
  TimelineSection,
  LineGraphicContainer
} from "./timeline.style";
import { Timeline } from "./components/HorizontalTimeline";
import { Graphic } from "./svg-components/Graphic";
import { LineGraphic } from "./svg-components/LineGraphic";
import { LineGraphicText } from "./svg-components/LineGraphicText";
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
      <main className="main-timeline">
        <FirstSection>
          <h1>Return to office <br/>or remote culture</h1>
          <p>Top companies that changed their plans during pandemic.</p>
        </FirstSection>
        <TimelineSection>
          <Timeline />
          <LineGraphicContainer>
            <LineGraphic></LineGraphic>
            <LineGraphicText></LineGraphicText>
          </LineGraphicContainer>
        </TimelineSection>
        <GraphicSection>
          <h2>Return to the office by Company</h2>
          <Graphic></Graphic>
        </GraphicSection>
        <div className="conclusion-wrapper">
          <div className="conclusion office">
            <p>“Second, we believe that in-office collaboration will be just as important to Google’s future as it’s been to our past.” -Google CEO Sundar Pichai</p>
          </div>
          <div className="conclusion office">
            <p>“Second, we believe that in-office collaboration will be just as important to Google’s future as it’s been to our past.” -Google CEO Sundar Pichai</p>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </Layout>
  );
};

export default Index;
