import DistributionGraphic from "./svg-components/DistributionGraphic";
import { GraphicContainer, Presentation } from "./women-in-tech.style";
const Index = () => {
  return (
    <>
      <main>
        <Presentation>
          <h1>
            Distribution of Women Bachelors <br />
            by field
          </h1>
          <p>Over the years since 1970.</p>
        </Presentation>
        <GraphicContainer>
          <DistributionGraphic />
        </GraphicContainer>
      </main>
    </>
  );
};
export default Index;
