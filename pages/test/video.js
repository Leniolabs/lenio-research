import { useState } from "react";
import timedata from "@components/video/timedata";
import VideoPlayer from "@components/video/video-player";

// Test VideoPlayer page
export const Index = () => {
  const [entry, setEntry] = useState({});

  const seconds = entry.seconds != null ? entry.seconds : "No Data";
  const value = entry.value != null ? entry.value : "No Data";

  return (
    <div>
      <VideoPlayer
        timeData={timedata}
        onDataChange={setEntry}
        url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
      />

      <span>{`Seconds: ${seconds}`}</span>
      <div>{`Value ${value}`}</div>
    </div>
  );
};

export default Index;
