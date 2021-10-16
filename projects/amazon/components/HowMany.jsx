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
      <svg
        className="stadium"
        xmlns="http://www.w3.org/2000/svg"
        width="68.9"
        height="47.4"
        overflow="visible">
        <g opacity=".8" fill="none" stroke="#FFF" strokeMiterlimit="10">
          {/* TODO Mariana Define the svg paths to morph in the PATHS variable */}
          {/* TODO Mariana Paths should ideally be one continuous thingy */}
          {/* TODO Mariana if not add them like the line 70 */}
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
      </svg>
      <p className="howmanynumber">x {howMany.toFixed(1)}</p>
    </div>
  );
};

HowMany.propTypes = {
  kmLost: PropTypes.number
};
