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
import { Buildings } from "./svg-components/Buildings";

export const Index = () => {
  return (
    <Layout>
      <Header>
        <LogoWithName />
      </Header>
      <main>
        <FirstSection>
          <h1>Return to office</h1>
          <p>
            Thinking of a subtitle about companies and <br />
            remote/office culture after pandemic
          </p>
          <Buildings></Buildings>
        </FirstSection>
        <TimelineSection>
          <Timeline />
        </TimelineSection>
        <GraphicSection>
          <h3>Return to the office by Company</h3>
          <Graphic></Graphic>
        </GraphicSection>
        <Houses></Houses>
      </main>
      <Footer></Footer>
    </Layout>
  );
};

export default Index;
