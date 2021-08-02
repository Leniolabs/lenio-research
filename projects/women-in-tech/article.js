import React from "react";
import DistributionGraphic from "./svg-components/DistributionGraphic";
import womenInTechData from "./women-in-tech.data";
import {
  GraphicContainer,
  Paragraph,
  RowContainer,
  Subtitle,
  CenteredImage,
  Article,
  FigCaption
} from "./women-in-tech.style";

const WomenInTechArticle = () => {
  return (
    <Article>
      <RowContainer>
        <Paragraph>
          If we dig deep in the data sources at the National Center for Education Statistics we’ll
          find table number 325.35. There we can see some interesting figures regarding the number
          of degrees in computer and information sciences from 1970 to 2017, by level of degree and
          sex. If we plot the percentage of women Bachelors through the years we get to the really
          compelling facts: the curve starts
          <b> going up from 1970 at 13% and peaks at 37% in 1984</b>. But what’s much more
          interesting is that from there, it goes down, with a 10-year stable period up until 2003,
          and it keeps going down{" "}
          <b>until we get to today’s stats at 20%, not much higher than when it started</b>. This is
          even more evident when we compare it with other majors.
        </Paragraph>
      </RowContainer>

      <GraphicContainer>
        <DistributionGraphic data={womenInTechData} />
        <FigCaption>
          Percentage of degrees granted to women, by field. Source: National Center for Education
          Statistics, tables 325.
        </FigCaption>
      </GraphicContainer>

      <RowContainer>
        <Subtitle>Why did women stop coding</Subtitle>

        <Paragraph>
          So, what happened after the peak? At the dawn of our field, computer programming was
          regarded as women’s work. During World War II, the military hired hundreds of women to
          compute and improve the accuracy of the Allies’ attacks. A group of six women, often
          referred to as{" "}
          <b>
            <i>Top Secret Rosies</i>
          </b>
          , were recruited by the army to program the ENIAC (the first general-purpose digital
          computer) for this objective. Their work was hidden to the point where, when images of
          them were released next to the computer, they were described as models.
        </Paragraph>
        <CenteredImage
          src="/static/images/women-in-tech/top-secret-rosies.jpg"
          alt="Marlyn Wescoff and Ruth Lichterman programming the ENIAC"
          figCaption="Marlyn Wescoff (standing) and Ruth Lichterman (crouching) programming the ENIAC. Source: archives of the ARL Technical Library."
        />

        <Paragraph>
          Men specialized in hardware as software developing was seen as an exciting alternative to
          secretarial work. In 1967, Cosmopolitan published an article titled{" "}
          <b>
            <i>The Computer Girls</i>, encouraging young women to pursue careers in computer science
          </b>
          . So the curve went up, and continued to do so up until 1984. That’s when personal
          computers appeared.
        </Paragraph>
        <CenteredImage
          src="/static/images/women-in-tech/computer-girls.jpg"
          alt="The Computer Girls article"
          figCaption="The Computer Girls article, Cosmopolitan, April 1967."
        />
        <Paragraph>
          As Apple released Macintosh 128K and the Commodore 64 was introduced in the market, they
          were presented as toys. And, as toys were gendered, <b>they were targeted to boys</b>. We
          can look at advertisements from that time and quickly find a pattern: fathers and sons,
          young men, even one where a man is being undressed by two women with the motto{" "}
          <i>Two bytes are better than one</i>. It’s more evident with the ads for computer games,
          if women appear they do so sexualized and half-naked. Not that appealing for young girls,
          one could imagine.
        </Paragraph>
        <CenteredImage
          src="/static/images/women-in-tech/mosaic-toys.jpg"
          alt="1980s computer and game ads: 'Why buy just a videogame?', 'Two bytes are better than one', 'What kind of man owns this computer?'"
        />
        <CenteredImage
          src="/static/images/women-in-tech/mosaic-sexualized.jpg"
          alt={"1980s computer and game advertisements"}
          figCaption="1980s computer and game advertisements."
        />

        <Paragraph>
          This is also reflected in other cultural consumptions of that time, movies like{" "}
          <b>
            <i>War Games</i>
          </b>
          ,{" "}
          <b>
            <i>Revenge of the nerds</i>
          </b>{" "}
          and{" "}
          <b>
            <i>Weird Science</i>
          </b>
          , they all depict the same trope of the geeky male hero that saves the day and gets the
          girl. So, when the generation that grew up watching these stereotypes got to the
          University, it’s understandable that not many young women could see themselves as computer
          scientists: they were never shown any.
        </Paragraph>

        <CenteredImage
          src="/static/images/women-in-tech/nerd-movies.jpg"
          alt={"'War Games', 'Revenge of the nerds', 'Weird Science'"}
          figCaption="War Games (1983), Revenge of the nerds (1984) and Weird Science (1985) movies."
        />

        <Paragraph>
          This is replicated in a 1999’s paper by Jane Margolis, Allan Fisher and Faye Miller called
          <b>
            <i> Caring about connections: gender and computing</i>
          </b>
          . They studied the perceived college environment at Carnegie Mellon, by interviewing 51
          women and 46 men majoring in CS. There, they found that the stereotypical “male-dominated
          hacker subculture” took a toll on those students that couldn’t identify themselves with
          that “intense, singular focus on computing and the computer itself”. As 44% of the women
          (compared to 9% of male students) reported that it was important for them to link their
          interest to computing to other arenas, they were hesitant to join this "computer science
          world" in which they sensed that the links to other interests in their lives would
          disappear. So many of them dropped out, and those that stayed in the program did so by
          finding a way to reconcile a “different” relationship to computing.
        </Paragraph>

        <Paragraph>
          So, if we want a more inclusive field of work, where everyone feels welcomed, it is time
          to think about the role models we present. And to consider that a different approach to
          computer science could be just as constructive and that much richer. Representation is
          key, <b>you can’t be what you can’t see</b>.
        </Paragraph>
      </RowContainer>
    </Article>
  );
};

export default WomenInTechArticle;
