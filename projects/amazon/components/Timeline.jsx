import * as React from "react";
import PropTypes from "prop-types";
import { data } from "../data";
import { motion } from "framer-motion";
import { MorphingShape } from "./HowMany";

export const Timeline = ({
  currentYear,
  onPlay,
  onPause,
  onYearClick,
  playing,
  fromYear = 2001,
  toYear = 2040,
  threshold = 2021
}) => {
  const handlePlay = React.useCallback(() => {
    if (!playing) onPlay?.();
    else onPause?.();
  }, [playing, onPlay, onPause]);

  const yearBars = React.useMemo(() => {
    return data.filter((d) => d.year >= fromYear && d.year <= toYear).map((d) => d.year);
  }, [fromYear, toYear]);

  const barWidth = React.useMemo(() => {
    return 600 / yearBars.length;
  }, [yearBars]);

  const textYearVariants = React.useMemo(() => {
    return {
      end10: (i) => ({
        x: 73 + (i + 1) * barWidth,
        fontSize: 24
      }),
      end5: (i) => ({
        x: 73 + (i + 1) * barWidth,
        fontSize: 12
      })
    };
  }, [barWidth]);

  const playShape1 = React.useMemo(() => {
    if (!playing) {
      return "M26.6 33.5v23a2 2 0 0 0 3 1.8l18.8-11.1a2 2 0 0 0 0-3.5L29.7 32a2 2 0 0 0-3 1.6Z";
    }
    return "M20 33.5v23h10v-23z";
  }, [playing]);

  const playShape2 = React.useMemo(() => {
    if (!playing) {
      return "M26.6 33.5v23a2 2 0 0 0 3 1.8l18.8-11.1a2 2 0 0 0 0-3.5L29.7 32a2 2 0 0 0-3 1.6Z";
    }
    return "M38 33.5v23h10v-23z";
  }, [playing]);

  const kmLost = React.useMemo(() => {
    return data.find((d) => d.year === currentYear).totalLoss;
  }, [currentYear]);

  console.log(yearBars);

  return (
    <div className="counter">
      <p className="year">{currentYear}</p>
      <p className="km">
        {kmLost} km<sup>2</sup>
      </p>
      <div className="player">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -30 732 120">
          <rect
            x="20"
            y="1.5"
            width="710"
            height="88"
            rx="2"
            fill="none"
            stroke="#fff"
            strokeMiterlimit="10"
            strokeWidth="1"
          />
          {yearBars.map((year, idx) => {
            return (
              <motion.path
                key={`bar-${idx}`}
                initial={false}
                onClick={() => onYearClick(year)}
                animate={{
                  fill: year < currentYear ? (year > threshold ? "#ffc165" : "#3baacd") : "#40384a"
                }}
                d={`M${93.6 + barWidth * idx} ${32.8}h${barWidth - 1}v10h-${barWidth - 1}z`}
              />
            );
          })}
          <motion.text
            custom={-1}
            animate={"end10"}
            initial={false}
            variants={textYearVariants}
            y={68}
            // textAnchor="middle"
            fontSize="20"
            fill="#fff">
            {fromYear}
          </motion.text>
          {yearBars.map((year, idx) => {
            if (year % 5 !== 0) {
              return null;
            }
            const yearType = year % 10 !== 0 || year === 2030 ? "end5" : "end10";
            console.log(year, yearType);
            return (
              <motion.text
                key={`text-year-${idx}`}
                custom={idx}
                animate={yearType}
                initial={false}
                variants={textYearVariants}
                y={68}
                textAnchor="middle"
                transform="translate(73.7 68.8)"
                fontSize="20"
                fill="#fff">
                {year}
              </motion.text>
            );
          })}
          <g onClick={handlePlay} style={{ cursor: "pointer" }}>
            <circle cx="35" cy="45" r="34.5" fill="#0a051b" stroke="#fff" strokeMiterlimit="10" />
            <MorphingShape path1={playShape1} fill="#fff" duration={0.3} />
            <MorphingShape path1={playShape2} fill="#fff" duration={0.3} />
          </g>
          <motion.rect
            animate={{
              x: 89 + yearBars.findIndex((d) => currentYear === d) * barWidth
            }}
            transition={{
              duration: 0.3
            }}
            y="22.5"
            width="3"
            height="25.6"
            rx="1.5"
            fill="#fff"
          />
        </svg>
      </div>
    </div>
  );
};

Timeline.propTypes = {
  currentYear: PropTypes.number,
  fromYear: PropTypes.number,
  toYear: PropTypes.number,
  threshold: PropTypes.number,
  onYearClick: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  playing: PropTypes.bool
};
