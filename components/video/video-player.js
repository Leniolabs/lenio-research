import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import PropTypes from "prop-types";

const VideoPlayer = ({ timeData, onDataChange, ...extraProps }) => {
  const [seconds, setSeconds] = useState(0);

  // Looking for entries could be better, right now is in linear time
  const entry = timeData.find((entry) => entry.date === toHHMMSS(seconds));

  useEffect(() => {
    entry && onDataChange && onDataChange({ ...entry, seconds });
  }, [seconds]);

  const onProgressHandler = (e) => setSeconds(Math.round(e.playedSeconds));

  return (
    <div>
      <ReactPlayer onProgress={onProgressHandler} {...extraProps} />
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

// TODO: Move to utils
const toHHMMSS = (secs) => {
  const t = new Date(1970, 0, 1);
  t.setSeconds(secs);
  return t.toTimeString().split(" ")[0];
};

export default VideoPlayer;
