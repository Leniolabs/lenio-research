import React from "react";
import { useSVGMorph } from "@projects/map-vis/useSVGMorph";
import { motion } from "framer-motion";
import { HowManyOptionsContainer } from "../amazon.style";
import PropTypes from "prop-types";

const MORPH_DURATION = 0.5;

const nonMorphingStadiumVariants = {
  stadium: { opacity: 1, transition: { delay: MORPH_DURATION } },
  california: { opacity: 0 },
  other: { opacity: 0 }
};

const CALIFORNIA =
  "M171.46 155.6v20.31l7.94 6.09 7.5 6 10.17 8.46 7.5 6.58 1.86 3.75 1.21 1-2.47 2.52.08 2.6-1.26 1 .41 2.53.85 1.89-1.22.25-14.84 1.23-.74-.89-.51-3.08-2.8-2.83-2.47-1.52-.46.41-1.9-2.3-1.45.3-2.57-1-2.1-1.82-3.58-.41-2.06.19-1.08-.89.1-3.53-1.62-1-.68-1.44-4.39-5-1.11-.81.67-3.31-.87-1.19-1.08.15-1.42-1.08-1.07-2.83.07-2.79-1.22.27-1.45-.94-.24-1.59-4.69-4.68-.55-2.78.37-1.26-.53-1.89-1.59-1.87-1.55-1-.31-1.22 1.55-3 .58-3.84-.91-3.78 11.31-.07z";

export const MorphingShape = ({ path1 }) => {
  const d = useSVGMorph(path1, { duration: MORPH_DURATION });

  return <motion.path d={d} />;
};

MorphingShape.propTypes = {
  path1: PropTypes.string,
  state: PropTypes.string
};

const DIVISORS = {
  california: 423970,
  stadium: 0.186, // http://www.votorantimcimentos.com/en-US/products-and-services/success-cases/Pages/maracana-a-giant-stadium.aspx
  other: 10
};

const PATHS = {
  california: CALIFORNIA,
  stadium: "M3 2.8h63v41.7H3z",
  other: "M26.6 33.5v23a2 2 0 0 0 3 1.8l18.8-11.1a2 2 0 0 0 0-3.5L29.7 32a2 2 0 0 0-3 1.6Z"
};

export const HowMany = ({ kmLost }) => {
  const [figure, setFigure] = React.useState("california");

  const morphingPath = React.useMemo(() => {
    return PATHS[figure];
  }, [figure]);

  const howMany = React.useMemo(() => {
    return kmLost / DIVISORS[figure];
  }, [figure, kmLost]);

  console.log(morphingPath);

  return (
    <div>
      <h3>How many</h3>
      <HowManyOptionsContainer>
        <button onClick={() => setFigure("california")}>California</button>
        <button onClick={() => setFigure("stadium")}>Maracana Stadium</button>
        <button onClick={() => setFigure("other")}>Another Thing</button>
      </HowManyOptionsContainer>
      {/* <svg
        className="stadium"
        xmlns="http://www.w3.org/2000/svg"
        width="68.9"
        height="47.4"
        overflow="visible">
        <g opacity=".8" fill="none" stroke="#FFF" strokeMiterlimit="10">
          <MorphingShape path1={morphingPath} state={figure} />
          <motion.g animate={figure} variants={nonMorphingStadiumVariants}>
            <path fill="#40394A" d="M0 0h68.9v47.4H0z" />
            <circle cx="34.5" cy="23.7" r="5.4" />
            <path d="M4.9 3C4.9 4.1 4 4.9 3 4.9M64 3c0 1.1.9 1.9 1.9 1.9M4.9 44.5c0-1.1-.9-1.9-1.9-1.9M64 44.5c0-1.1.9-1.9 1.9-1.9M3 12.1h9.6v23.1H3z" />
            <path d="M3 18.4h3.3V29H3zM12.4 29.1c2-1 3.3-3 3.3-5.4 0-2.4-1.4-4.4-3.3-5.4" />
            <g>
              <path d="M66 35.3h-9.6V12.2H66z" />
              <path d="M66 29h-3.4V18.4H66zM56.5 29.1a6 6 0 0 1-3.3-5.4c0-2.4 1.4-4.4 3.3-5.4" />
            </g>
            <path d="M34.5 2.9v41.7" />
          </motion.g>
        </g>
      </svg> */}
      <svg className="how-many-shapes" viewBox="0 0 200 180" stroke="#fff" stroke-linecap="round" stroke-linejoin="round">
        <path id="bird" d="M104 48s-9 1-5.6 28.7c0 0 1.5 13.9 7.5 11.1 0 0 3.2 14 7 6.8 0 0 .7 13 5.8 5.8 0 0 .1 14.5 7.4 10.3v1.2s3.9 10 6.5 10.1c2.5.2 5.7-11.7.8-25.8-.5-4.8-19.7-46-29.4-48.3-.4-3-.3-5.6-.8-8.5C101.4 29.2 94.8 22.1 84 24c-7.2 1.3-9 9.9-10.4 10.6-2.8 1.4-12.3 9.7-8.9 20.1.4 1.3 2.5-6.7 7-7 0 0 6 7.8 14.1 7.5 0 0-7.9 11.8-4.8 30.2a36.8 36.8 0 0 0 13.7 22.4c-.3 3 .4 6 2.1 7.4a16 16 0 0 0-.5 1.7 1.5 1.5 0 0 0-1-.4c-1.7-.2-2.6 6.8-.2 6.8.8 0 1.5-1 1.7-1.4 0 .4.6 1.4 1.4 1.4a2 2 0 0 0 1.6-1.3 1.7 1.7 0 0 0 1.5 1.3c2.5 0 2.8-5.8-.1-6.1-.2 0-.1-1.3-.2-1.6a8.7 8.7 0 0 0 3-2.4 34 34 0 0 0 5.2 1.6c.8 4.5 1.6 22.4 2 27 .6 7.7 1.5 15.5 5 14.5s2.2-5.3 1.4-16.4l-1.5-18c1.5 7 2 10.7 3.6 16.4 2.2 7.5 3.6 15 6.7 13.3s.8-9-1.5-18a127.7 127.7 0 0 0-6-17.3s4.2 11.1 6.3 16.2 4.6 11 7.6 9.2c2.8-1.7-.5-14.2-6.5-29.6" fill="#40394a"/>
              
        <path id="texas" d="m110 146.2-3.2-12.8-19.2-24.7c-2 .3-8.6 0-8.6 0l-3.2 6.5-5.4 2L37.3 82h34.2V28.5h31V52c.9.4 60.2 11.8 60.2 11.8l-.3 48.4-24.6 11.5-9.6 16 2.1 11.8Z" fill="#40394a"/>
              
        <path id="stadium" fill="#40394a" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" d="M38.2 49h123.5v81.9H38.2z"/><circle cx="100" cy="89.9" r="10.7" fill="#40394a" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 49.4a3.8 3.8 0 0 1-3.8 3.8M158 49.4a3.8 3.8 0 0 0 3.8 3.8M42 130.9a3.8 3.8 0 0 0-3.8-3.9M158 130.9a3.8 3.8 0 0 1 3.8-3.9M38.2 67.3H57v45.3H38.2z" fill="#40394a" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"/><path fill="#40394a" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" d="M38.2 79.5h6.4v20.8h-6.4zM56.8 100.5a11.8 11.8 0 0 0 0-21.1M161.8 112.6H143V67.3h18.8z"/><path fill="#40394a" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" d="M161.7 100.4h-6.4V79.6h6.4zM143.2 100.5a11.8 11.8 0 0 1 0-21.1M100 49.2V131"/>
      </svg>
      <p className="howmanynumber">x {howMany.toFixed(1)}</p>
    </div>
  );
};

HowMany.propTypes = {
  kmLost: PropTypes.number
};
