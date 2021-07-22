import { GraphicContainer, Presentation } from "./women-in-tech.style";
import womenInTechData from "./women-in-tech.data";

import DistributionGraphic from "./svg-components/DistributionGraphic";
import Article from "./article";

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

        <Article />
      </main>
    </>
  );
};
export default Index;
