import { useMemo } from "react";
import ReactPlayer from "react-player/youtube";
import PropTypes from "prop-types";
import { getClosestTimeEventIndex, secondsToTimeEvent } from "@projects/video/utils";

const VideoPlayer = ({ timeData = [], onDataChange, progressInterval = 100, ...extraProps }) => {
  const timeEventList = useMemo(() => timeData.map((t) => t.date), [timeData]);

  const onProgressHandler = ({ playedSeconds }) => {
    const timeEvent = secondsToTimeEvent(playedSeconds);
    const entryIndex = getClosestTimeEventIndex(timeEventList, timeEvent);
    const entry = timeData[entryIndex];

    if (entry && onDataChange) {
      onDataChange(entry);
    }
  };

  return (
    <ReactPlayer
      onProgress={onProgressHandler}
      progressInterval={progressInterval}
      controls
      {...extraProps}
    />
  );
};

VideoPlayer.propTypes = {
  timeData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      value: PropTypes.any
    }).isRequired
  ),
  onDataChange: PropTypes.func,
  progressInterval: PropTypes.number
};

export default VideoPlayer;
