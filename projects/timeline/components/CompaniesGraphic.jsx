import React, { useState, useRef } from "react";
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
  const [index, setIndex] = useState(0);
  const limit = data_graphic.length - 1;

  const nextGraphic = () => {
    setIndex((prevIndex) => (prevIndex + 1 === limit ? 0 : prevIndex + 1));
  };

  const startInterval = () => {
    nextGraphic();
    const timelineInterval = setInterval(() => {
      nextGraphic();
    }, 4000);
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
      <PlayBtn onClick={onPlayOrStop}> {isPlaying ? "⏹️ Stop" : "▶️ Play"}</PlayBtn>
      {data_graphic.length > 0 && getComapniesData(data_graphic[index])}
      <LineGraphicText></LineGraphicText>
    </div>
  );
};

export default CompaniesGraphic;
