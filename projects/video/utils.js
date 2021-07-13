/**
 * Converts a number of seconds to time event string
 *
 * @example
 * (100.32) => "00:01:40.320"
 *
 * @param {number} number in seconds. i.e 100.32
 * @returns {string} representing time event. i.e "00:01:40.320"
 */
export const secondsToTimeEvent = (secs) => {
  const t = new Date(1970, 0, 1);
  const timestamp = secs.toFixed(3);
  const ms = timestamp.split(".")[1];
  t.setSeconds(Math.floor(+timestamp));
  t.setMilliseconds(+ms);
  const hhmmss = t.toTimeString().split(" ")[0];

  return `${hhmmss}.${ms}`;
};

/**
 * Converts a time event string to number of seconds
 *
 * @example
 * ("00:00:34.320") => 34.32
 *
 * @param {string} representing time event. i.e "00:00:34.320"
 * @returns {number} number in seconds and decimals. i.e 34.32
 */
// "00:00:34.320" => 34.32
export const timeEventToSeconds = (timeEvent) => {
  const baseDate = new Date(1970, 0, 1);
  const timestampDate = new Date(`1970-01-01 ${timeEvent}`);
  const difference = timestampDate - baseDate;

  return difference / 1000;
};

/**
 * Gets the index of the closest timestamp (rounding to floor)
 *
 * @example
 *  (["00:00:00.123", "00:00:02.143"], "00:00:01:023") => 0
 *
 * @param {string[]} tsStringList List of timestamp strings
 * @param {string} tsString the timestamp which we look for the closest one
 * @returns {number} the closest timestamp index
 */
export const getClosestTimestampIndex = (tsStringList, tsString) => {
  const tsList = tsStringList.map(timeEventToSeconds);
  const positionInSecs = timeEventToSeconds(tsString);

  return tsList.reduce((lastTs, currTs, index) => {
    if (currTs < positionInSecs) {
      return index;
    }

    return lastTs;
  }, 0);
};
