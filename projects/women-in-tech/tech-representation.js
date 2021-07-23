import React from "react";
import DistributionGraphic from "./svg-components/DistributionGraphic";
import womenInTechData from "./women-in-tech.data";
import {
  GraphicContainer,
  Paragraph,
  RowContainer,
  Subtitle,
  CenteredImage,
  Article
} from "./women-in-tech.style";

const TechRepresentation = () => {
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
          <b>until we get to today’s stats at 20%, not much higher than when it started</b>.
        </Paragraph>
      </RowContainer>

      <GraphicContainer>
        <DistributionGraphic data={womenInTechData} />
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
          them were released next to the computer, they were described as models. Men specialized in
          hardware as software developing was seen as an exciting alternative to secretarial work.
          In 1967, Cosmopolitan published an article titled{" "}
          <b>
            <i>The Computer Girls</i>, encouraging young women to pursue careers in computer science
          </b>
          . So the curve went up, and continued to do so up until 1984. That’s when personal
          computers appeared.
        </Paragraph>
        <CenteredImage
          src="/static/images/women-in-tech/computer-girls.jpg"
          alt="'The Computer girls' article"
        />
        <Paragraph>
          As Apple released Macintosh 128K and the Commodore 64 was introduced in the market, they
          were presented as toys. And, as toys were gendered, they were targeted to boys. We can
          look at advertisements from that time and quickly find a pattern: fathers and sons, young
          men, even one where a man is being undressed by two women with the motto Two bytes are
          better than one. It’s more evident with the ads for computer games, if women appear they
          do so sexualized and half-naked. Not that appealing for young girls, one could imagine.
        </Paragraph>
        <CenteredImage
          src="/static/images/women-in-tech/mosaic-toys.jpg"
          alt="Ads promoting computers as toys. 'Why buy just a videogame?', 'Two bytes are better than one', 'What kind of man owns this computer?'"
        />
        <CenteredImage
          src="/static/images/women-in-tech/mosaic-sexualized.jpg"
          alt="Ads promoting computers with sexualized women. 'How's your love life?' "
        />

        <Paragraph>
          This is also reflected in other cultural consumptions of that time, movies like{" "}
          <i>War Games</i>, <i>Revenge of the nerds</i> and <i>Weird Science</i>, they all depict
          the same trope of the geeky male hero that saves the day and gets the girl. So, when the
          generation that grew up watching these stereotypes got to the University, it’s
          understandable that not many young women could see themselves as computer scientists: they
          were never shown any.
        </Paragraph>

        <CenteredImage
          src="/static/images/women-in-tech/nerd-movies.jpg"
          alt="Films where nerd male heros saves the girl: 'War Games', 'Revenge of the nerds', 'Weird Science'"
        />

        <Paragraph>
          So, if we want a more inclusive field of work, where everyone feels welcomed, it is time
          to think about the role models we present. Representation is key,{" "}
          <i>you can’t be what you can’t see</i>.
        </Paragraph>
      </RowContainer>
    </Article>
  );
};

export default TechRepresentation;
