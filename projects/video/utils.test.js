const { secondsToTimeEvent, timeEventToSeconds, getClosestTimeEventIndex } = require("./utils");

test("[secondsToTimeEvent] converts seconds to time event string", () => {
  // Seconds
  expect(secondsToTimeEvent(0)).toBe("00:00:00.000");
  expect(secondsToTimeEvent(1.123)).toBe("00:00:01.123");
  expect(secondsToTimeEvent(5)).toBe("00:00:05.000");

  // Minutes
  expect(secondsToTimeEvent(60)).toBe("00:01:00.000");
  expect(secondsToTimeEvent(340.492)).toBe("00:05:40.492");
  expect(secondsToTimeEvent(2492.319)).toBe("00:41:32.319");

  // Hours
  expect(secondsToTimeEvent(3600)).toBe("01:00:00.000");
  expect(secondsToTimeEvent(3840)).toBe("01:04:00.000");
  expect(secondsToTimeEvent(3770.912)).toBe("01:02:50.912");
});

test("[secondsToTimeEvent] returns seconds from edge cases", () => {
  // Negative numbers
  expect(secondsToTimeEvent(-5)).toBe("00:00:00.000");
  expect(secondsToTimeEvent(-26.23)).toBe("00:00:00.000");

  // Limits
  expect(secondsToTimeEvent(86399.999)).toBe("23:59:59.999");
  expect(secondsToTimeEvent(86400)).toBe("23:59:59.999");
  expect(secondsToTimeEvent(900000)).toBe("23:59:59.999");

  // Parsed Strings
  expect(secondsToTimeEvent("-5.32")).toBe("00:00:00.000");
  expect(secondsToTimeEvent("3.128")).toBe("00:00:03.128");
  expect(secondsToTimeEvent("9.540")).toBe("00:00:09.540");
  expect(secondsToTimeEvent("Unparseable string")).toBe("00:00:00.000");
  expect(secondsToTimeEvent("0")).toBe("00:00:00.000");
  expect(secondsToTimeEvent("2492.319")).toBe("00:41:32.319");
});

test("[timeEventToSeconds] converts time event strings to seconds", () => {
  // Seconds
  expect(timeEventToSeconds("00:00:00.000")).toBe(0);
  expect(timeEventToSeconds("00:00:00.123")).toBe(0.123);
  expect(timeEventToSeconds("00:00:45.130")).toBe(45.13);

  // Minutes
  expect(timeEventToSeconds("00:01:00.000")).toBe(60);
  expect(timeEventToSeconds("00:03:20.460")).toBe(200.46);
  expect(timeEventToSeconds("00:02:01.160")).toBe(121.16);

  // Hours
  expect(timeEventToSeconds("01:00:00.000")).toBe(3600);
  expect(timeEventToSeconds("02:03:20.460")).toBe(7400.46);
  expect(timeEventToSeconds("01:02:01.160")).toBe(3721.16);
});

test("[timeEventToSeconds] returns time event strings from edge cases", () => {
  // Incomplete timestamps
  expect(timeEventToSeconds("00:00:00.03")).toBe(0.03);
  expect(timeEventToSeconds("00:00:00.7")).toBe(0.7);
  expect(timeEventToSeconds("00:00:00")).toBe(0);
  expect(timeEventToSeconds("00:00:10")).toBe(10);

  // Invalid input
  expect(timeEventToSeconds("00:32:9")).toBe(0);
  expect(timeEventToSeconds("invalid")).toBe(0);
  expect(timeEventToSeconds("23:95:80")).toBe(0);
});

test("[getClosestTimeEventIndex] gets closest timestamp (rounding to floor)", () => {
  const testData = [
    "00:00:00.000",
    "00:00:03.260",
    "00:00:05.123",
    "00:00:07.850",
    "00:00:10.200",
    "00:00:13.200",
    "00:00:13.400",
    "00:00:13.600",
    "00:00:13.800",
    "00:00:14.000",
    "00:00:17.000"
  ];

  const closestIdxA = getClosestTimeEventIndex(testData, "00:00:02.123");
  expect(closestIdxA).toBe(0);

  const closestIdxB = getClosestTimeEventIndex(testData, "00:00:04.123");
  const closestIdxC = getClosestTimeEventIndex(testData, "00:00:04.500");
  const closestIdxD = getClosestTimeEventIndex(testData, "00:00:05.122");
  expect(closestIdxB).toBe(1);
  expect(closestIdxC).toBe(1);
  expect(closestIdxD).toBe(1);

  const closestIdxE = getClosestTimeEventIndex(testData, "00:00:05.124");
  expect(closestIdxE).toBe(2);

  const closestIdxF = getClosestTimeEventIndex(testData, "00:01:00.00");
  expect(closestIdxF).toBe(10);

  const closestIdxG = getClosestTimeEventIndex(testData, "01:00:00.00");
  expect(closestIdxG).toBe(10);
});
