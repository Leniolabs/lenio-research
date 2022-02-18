import * as React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { MorphingShape } from "@projects/amazon/components/HowMany";

export const Timeline = ({
  year = 2059,
  onPlay,
  onPause,
  onYearClick,
  isPlaying = false,
  fromYear = 2005,
  toYear = 2099
}) => {
  const handlePlay = React.useCallback(() => {
    if (!isPlaying) onPlay?.();
    else onPause?.();
  }, [isPlaying, onPlay, onPause]);

  const yearBars = React.useMemo(() => {
    return new Array(toYear - fromYear + 1).fill(0).map((_, i) => fromYear + i);
  }, [fromYear, toYear]);

  const barWidth = React.useMemo(() => {
    return 600 / yearBars.length;
  }, [yearBars]);

  const textYearVariants = React.useMemo(() => {
    return {
      big: (i) => ({
        x: 90 + (i + 1) * barWidth,
        fontSize: 24
      }),
      small: (i) => ({
        x: 86 + (i + 1) * barWidth,
        fontSize: 12
      })
    };
  }, [barWidth]);

  const playShape1 = React.useMemo(() => {
    if (!isPlaying) {
      return "M26.6 33.5v23a2 2 0 0 0 3 1.8l18.8-11.1a2 2 0 0 0 0-3.5L29.7 32a2 2 0 0 0-3 1.6Z";
    }
    return "M20 33.5v23h10v-23z";
  }, [isPlaying]);

  const playShape2 = React.useMemo(() => {
    if (!isPlaying) {
      return "M26.6 33.5v23a2 2 0 0 0 3 1.8l18.8-11.1a2 2 0 0 0 0-3.5L29.7 32a2 2 0 0 0-3 1.6Z";
    }
    return "M38 33.5v23h10v-23z";
  }, [isPlaying]);

  return (
    <div className="counter">
      <p className="year">{year}</p>
      <div className="player">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -30 732 120" tabIndex="0">
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
            opacity="0.5"
          />
          {yearBars.map((y, idx) => {
            return (
              <motion.path
                key={`bar-${idx}`}
                initial={false}
                onClick={() => onYearClick(y)}
                animate={{
                  fill: y < year + 1 ? "#3baacd" : "#40384a"
                }}
                d={`M${93.6 + barWidth * idx} ${32.8}h${barWidth - 1}v10h-${barWidth - 1}z`}
                tabIndex="0"
              />
            );
          })}
          {yearBars.map((year, idx) => {
            if ((year - 5) % 10 > 0) return null;
            const yearType = (year - 5) % 20 === 0 ? "big" : "small";
            return (
              <motion.text
                key={`text-year-${idx}`}
                custom={idx}
                animate={yearType}
                initial={false}
                variants={textYearVariants}
                y={68}
                textAnchor="middle"
                fontSize="20"
                fill="#fff">
                {year}
              </motion.text>
            );
          })}
          <g onClick={handlePlay} className="play-btn" tabIndex="0">
            <circle cx="35" cy="45" r="34.5" fill="#0a051b" stroke="#fff" strokeMiterlimit="10" />
            <MorphingShape path1={playShape1} duration={0.3} />
            <MorphingShape path1={playShape2} duration={0.3} />
          </g>
          <motion.rect
            animate={{
              x: yearBars.findIndex((d) => year === d) * barWidth
            }}
            transition={{
              duration: 0.125
            }}
            x={94.5}
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
  year: PropTypes.number,
  fromYear: PropTypes.number,
  toYear: PropTypes.number,
  onYearClick: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  isPlaying: PropTypes.bool
};
