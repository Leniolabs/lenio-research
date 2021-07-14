/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import VideoPlayer from "./video-player";
import "@testing-library/jest-dom/extend-expect";

const timedata = [
  { date: "00:00:00.000", value: "1" },
  { date: "00:00:17.000", value: "2" },
  { date: "00:00:17.000", value: "2" }
];

// This can't be fully tested this way, for some reason the video isn't being rendered
// causing the fn cbs to not be called
// Proposal: test these cases with e2e test environment (like cypress)

const timeout = (time) => new Promise((r) => setTimeout(r, time));

test("safely renders video player without all props", () => {
  render(<VideoPlayer />);
});

test.skip("calls the fn callback at least once", async () => {
  const mockFn = jest.fn();

  render(
    <VideoPlayer
      url="https://www.youtube.com/watch?v=bCDQN8iDCzo"
      timeData={timedata}
      progressInterval={100}
      onDataChange={mockFn}
    />
  );
  await timeout(3000);
  expect(mockFn).toBeCalledTimes(1);
});

test.skip("calls the fn callback with right interval", () => {
  render(
    <VideoPlayer
      timeData={timedata}
      onDataChange={() => {}}
      progressInterval={1000}
      url="https://www.youtube.com/watch?v=bCDQN8iDCzo"
    />
  );
});

test.skip("calls the fn callback with the right entry", () => {
  // Test granularized
  render(
    <VideoPlayer
      timeData={timedata}
      onDataChange={() => {}}
      url="https://www.youtube.com/watch?v=bCDQN8iDCzo"
    />
  );
});

test.skip("works with data on-the-fly changes", () => {
  const newData = [];
  render(
    <VideoPlayer
      timeData={timedata}
      onDataChange={() => {}}
      url="https://www.youtube.com/watch?v=bCDQN8iDCzo"
    />
  );
});

test.skip("calls entry with values of any type", () => {
  const newData = [];
  render(
    <VideoPlayer
      timeData={timedata}
      onDataChange={() => {}}
      url="https://www.youtube.com/watch?v=bCDQN8iDCzo"
    />
  );
});
