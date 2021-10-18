import React from "react";
import { useSVGMorph } from "@projects/map-vis/useSVGMorph";
import { motion } from "framer-motion";
import { HowManyOptionsContainer } from "../amazon.style";
import PropTypes from "prop-types";

const MORPH_DURATION = 0.5;

const nonMorphingStadiumVariants = {
  stadium: { opacity: 1, transition: { delay: MORPH_DURATION } },
  texas: { opacity: 0 },
  bird: { opacity: 0 }
};

const birdVarianst = {
  bird: { opacity: 1, transition: { delay: MORPH_DURATION } },
  texas: { opacity: 0 },
  stadium: { opacity: 0 }
};

const texasVarianst = {
  texas: { opacity: 1, transition: { delay: MORPH_DURATION } },
  bird: { opacity: 0 },
  stadium: { opacity: 0 }
};

export const MorphingShape = ({ path1 }) => {
  const d = useSVGMorph(path1, { duration: MORPH_DURATION });
  if (path1 === d.current) {
    return <motion.path d={path1}></motion.path>;
  } else {
    return <motion.path d={d} />;
  }
};

MorphingShape.propTypes = {
  path1: PropTypes.string,
  state: PropTypes.string
};

const DIVISORS = {
  texas: 423970,
  stadium: 0.186, // http://www.votorantimcimentos.com/en-US/products-and-services/success-cases/Pages/maracana-a-giant-stadium.aspx
  bird: 10 // TODO: what is the division here??
};

const PATHS = {
  texas:
    "m110 146.2-3.2-12.8-19.2-24.7c-2 .3-8.6 0-8.6 0l-3.2 6.5-5.4 2L37.3 82h34.2V28.5h31V52c.9.4 60.2 11.8 60.2 11.8l-.3 48.4-24.6 11.5-9.6 16 2.1 11.8Z",
  stadium: "M38.2 49h123.5v81.9H38.2z",
  bird: "M104 48s-9 1-5.6 28.7c0 0 1.5 13.9 7.5 11.1 0 0 3.2 14 7 6.8 0 0 .7 13 5.8 5.8 0 0 .1 14.5 7.4 10.3v1.2s3.9 10 6.5 10.1c2.5.2 5.7-11.7.8-25.8-.5-4.8-19.7-46-29.4-48.3-.4-3-.3-5.6-.8-8.5C101.4 29.2 94.8 22.1 84 24c-7.2 1.3-9 9.9-10.4 10.6-2.8 1.4-12.3 9.7-8.9 20.1.4 1.3 2.5-6.7 7-7 0 0 6 7.8 14.1 7.5 0 0-7.9 11.8-4.8 30.2a36.8 36.8 0 0 0 13.7 22.4c-.3 3 .4 6 2.1 7.4a16 16 0 0 0-.5 1.7 1.5 1.5 0 0 0-1-.4c-1.7-.2-2.6 6.8-.2 6.8.8 0 1.5-1 1.7-1.4 0 .4.6 1.4 1.4 1.4a2 2 0 0 0 1.6-1.3 1.7 1.7 0 0 0 1.5 1.3c2.5 0 2.8-5.8-.1-6.1-.2 0-.1-1.3-.2-1.6a8.7 8.7 0 0 0 3-2.4 34 34 0 0 0 5.2 1.6c.8 4.5 1.6 22.4 2 27 .6 7.7 1.5 15.5 5 14.5s2.2-5.3 1.4-16.4l-1.5-18c1.5 7 2 10.7 3.6 16.4 2.2 7.5 3.6 15 6.7 13.3s.8-9-1.5-18a127.7 127.7 0 0 0-6-17.3s4.2 11.1 6.3 16.2 4.6 11 7.6 9.2c2.8-1.7-.5-14.2-6.5-29.6"
};

export const HowMany = ({ kmLost }) => {
  const [figure, setFigure] = React.useState("texas");

  const morphingPath = React.useMemo(() => {
    return PATHS[figure];
  }, [figure]);

  const howMany = React.useMemo(() => {
    return kmLost / DIVISORS[figure];
  }, [figure, kmLost]);

  return (
    <div>
      <h3>How many</h3>
      <HowManyOptionsContainer>
        <button onClick={() => setFigure("texas")}>Texas</button>
        <button onClick={() => setFigure("stadium")}>Maracana Stadium</button>
        <button onClick={() => setFigure("bird")}>Birds</button>
      </HowManyOptionsContainer>
      <svg
        className="how-many-shapes"
        viewBox="0 0 200 180"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round">
        <MorphingShape path1={morphingPath} />
        <motion.path
          animate={figure}
          variants={birdVarianst}
          id="bird"
          d="M104 48s-9 1-5.6 28.7c0 0 1.5 13.9 7.5 11.1 0 0 3.2 14 7 6.8 0 0 .7 13 5.8 5.8 0 0 .1 14.5 7.4 10.3v1.2s3.9 10 6.5 10.1c2.5.2 5.7-11.7.8-25.8-.5-4.8-19.7-46-29.4-48.3-.4-3-.3-5.6-.8-8.5C101.4 29.2 94.8 22.1 84 24c-7.2 1.3-9 9.9-10.4 10.6-2.8 1.4-12.3 9.7-8.9 20.1.4 1.3 2.5-6.7 7-7 0 0 6 7.8 14.1 7.5 0 0-7.9 11.8-4.8 30.2a36.8 36.8 0 0 0 13.7 22.4c-.3 3 .4 6 2.1 7.4a16 16 0 0 0-.5 1.7 1.5 1.5 0 0 0-1-.4c-1.7-.2-2.6 6.8-.2 6.8.8 0 1.5-1 1.7-1.4 0 .4.6 1.4 1.4 1.4a2 2 0 0 0 1.6-1.3 1.7 1.7 0 0 0 1.5 1.3c2.5 0 2.8-5.8-.1-6.1-.2 0-.1-1.3-.2-1.6a8.7 8.7 0 0 0 3-2.4 34 34 0 0 0 5.2 1.6c.8 4.5 1.6 22.4 2 27 .6 7.7 1.5 15.5 5 14.5s2.2-5.3 1.4-16.4l-1.5-18c1.5 7 2 10.7 3.6 16.4 2.2 7.5 3.6 15 6.7 13.3s.8-9-1.5-18a127.7 127.7 0 0 0-6-17.3s4.2 11.1 6.3 16.2 4.6 11 7.6 9.2c2.8-1.7-.5-14.2-6.5-29.6"
          fill="#40394a"
        />

        <motion.path
          animate={figure}
          variants={texasVarianst}
          id="texas"
          d="m110 146.2-3.2-12.8-19.2-24.7c-2 .3-8.6 0-8.6 0l-3.2 6.5-5.4 2L37.3 82h34.2V28.5h31V52c.9.4 60.2 11.8 60.2 11.8l-.3 48.4-24.6 11.5-9.6 16 2.1 11.8Z"
          fill="#40394a"
        />

        <motion.g animate={figure} variants={nonMorphingStadiumVariants}>
          <path
            id="stadium"
            fill="#40394a"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M38.2 49h123.5v81.9H38.2z"
          />
          <circle
            cx="100"
            cy="89.9"
            r="10.7"
            fill="#40394a"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M42 49.4a3.8 3.8 0 0 1-3.8 3.8M158 49.4a3.8 3.8 0 0 0 3.8 3.8M42 130.9a3.8 3.8 0 0 0-3.8-3.9M158 130.9a3.8 3.8 0 0 1 3.8-3.9M38.2 67.3H57v45.3H38.2z"
            fill="#40394a"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fill="#40394a"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M38.2 79.5h6.4v20.8h-6.4zM56.8 100.5a11.8 11.8 0 0 0 0-21.1M161.8 112.6H143V67.3h18.8z"
          />
          <path
            fill="#40394a"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M161.7 100.4h-6.4V79.6h6.4zM143.2 100.5a11.8 11.8 0 0 1 0-21.1M100 49.2V131"
          />
        </motion.g>
      </svg>
      <p className="howmanynumber">x {howMany.toFixed(1)}</p>
    </div>
  );
};

HowMany.propTypes = {
  kmLost: PropTypes.number
};
