import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import PropTypes from "prop-types";

// For the moment only working with youtube
const VideoPlayer = ({ timeData, onDataChange }) => {
  const [seconds, setSeconds] = useState(0);

  const entry = timeData.find((entry) => entry.date === toHHMMSS(seconds));

  useEffect(() => {
    entry && onDataChange && onDataChange({ ...entry, seconds });
  }, [seconds]);

  return (
    <div>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
        onProgress={(e) => setSeconds(Math.round(e.playedSeconds))}
      />
    </div>
  );
};

VideoPlayer.propTypes = {
  timeData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      value: PropTypes.number
    }).isRequired
  ),
  onDataChange: PropTypes.func
};

const toHHMMSS = (secs) => {
  const t = new Date(1970, 0, 1);
  t.setSeconds(secs);
  return t.toTimeString().split(" ")[0];
};

export default VideoPlayer;
