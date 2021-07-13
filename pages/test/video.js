import { useState } from "react";
import timedata from "@projects/video/timedata";
import VideoPlayer from "@components/video/video-player";

// Test VideoPlayer page
export const Index = () => {
  const [entry, setEntry] = useState({});

  const date = entry.date != null ? entry.date : "No Data";
  const value = entry.value != null ? entry.value : "No Data";

  return (
    <div>
      <VideoPlayer
        timeData={timedata}
        onDataChange={setEntry}
        url="https://www.youtube.com/watch?v=bCDQN8iDCzo"
      />

      <span>{`Timestamp: ${date}`}</span>
      <div>{`Value ${value}`}</div>
    </div>
  );
};

export default Index;
