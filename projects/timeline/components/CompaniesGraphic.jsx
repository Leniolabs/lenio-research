import React, { useState, useRef, useEffect } from "react";
import { BigGraphic } from "../svg-components/BigGraphic";
import { LineGraphicText } from "../svg-components/LineGraphicText";
import { data_graphic } from "../timeline.data";
import { PlayBtn } from "../timeline.style";

const getComapniesData = (data) => {
  const { date, ...companies } = data;
  return <BigGraphic selectedDate={date} companies={companies}></BigGraphic>;
};

const CompaniesGraphic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef();
  const limit = data_graphic.length - 1;
  const [index, setIndex] = useState(limit);
  const [mounted, setMounted] = useState(false);

  const nextGraphic = () => {
    setIndex((prevIndex) => (prevIndex + 1 > limit ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    if (index >= limit && mounted) {
      onPlayOrStop();
      setMounted(false);
    }
  }, [index, mounted]);

  const startInterval = () => {
    nextGraphic();
    setMounted(true);
    const timelineInterval = setInterval(() => {
      nextGraphic();
    }, 500);
    intervalRef.current = timelineInterval;
  };

  const stopInterval = () => {
    clearInterval(intervalRef.current);
  };
  const onPlayOrStop = () => {
    if (isPlaying) {
      stopInterval();
    } else {
      startInterval();
    }
    setIsPlaying((prevV) => !prevV);
  };
  return (
    <div>
      <svg viewBox="0 0 1080 14">
        <text
          fill="#2a3f55"
          stroke="#2a3f55"
          strokeWidth=".2"
          fontSize="12"
          transform="translate(411 10)">
          Most from office
        </text>
        <rect
          width="16"
          height="7.6"
          x="390"
          y="3"
          fill="#2aa881"
          stroke="#2a3f55"
          strokeWidth=".3"
        />
        <text
          fill="#2a3f55"
          stroke="#2a3f55"
          strokeWidth=".2"
          fontSize="12"
          transform="translate(549.5 10)">
          Hybrid
        </text>
        <rect
          width="16"
          height="7.6"
          x="528.5"
          y="3"
          fill="#ffbf55"
          stroke="#2a3f55"
          strokeWidth=".3"
        />
        <text
          fill="#2a3f55"
          stroke="#2a3f55"
          strokeWidth=".2"
          fontSize="12"
          transform="translate(635.7 10)">
          Most from home
        </text>
        <rect
          width="16"
          height="7.6"
          x="614.7"
          y="3"
          fill="#ff3f55"
          stroke="#2a3f55"
          strokeWidth=".3"
        />
      </svg>
      <PlayBtn className="btn-graphic" onClick={onPlayOrStop}>
        {isPlaying ? "⏹️ Stop" : "▶️ Play"}
      </PlayBtn>
      {/* <PlayBtn className="btn-graphic" onClick={nextGraphic}>
        &#8594;
      </PlayBtn> */}
      {data_graphic.length > 0 && getComapniesData(data_graphic[index])}
      <svg viewBox="-36 0 997 33">
        <LineGraphicText></LineGraphicText>
      </svg>
    </div>
  );
};

export default CompaniesGraphic;
