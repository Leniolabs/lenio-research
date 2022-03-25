import * as moment from "moment";

export const getParsedData = (data, colorMapper, countryList, legendFilter, countryData) => {
  // debugger;
  let countries = countryData;
  if (countryList) {
    countries = countryData.filter((r) => countryList.includes(r.name));
  }
  if (legendFilter) {
    countries = countries.filter(legendFilter);
  }

  return countries
    .map((country) => {
      return {
        country: country.name,
        countryCode: country.countryCode,
        value: 1 - data[country.name] / 100,
        population: (country.population / 1000000).toFixed(2),
        color: colorMapper(country)
      };
    })
    .sort((a, b) => a.value - b.value)
    .map((country, position) => ({ ...country, position }))
    .sort((a, b) => (a.countryCode > b.countryCode ? 1 : -1));
};
export const generateDatasets = (data, countryData) => {
  const countryNames = countryData.map((r) => r.name);
  const validCountryVaccinations = data.filter((country) => countryNames.includes(country.country));
  const fullyHash = {};
  const notFullyHash = {};
  validCountryVaccinations.forEach((curr) => {
    const { country, data } = curr;
    // Start from 0
    let oneDose = 0;
    let fully = 0;
    // Get days that have a 'vaccinated_per_hundred' metric greater than 0
    const daysWithPerHundredData = data.filter(
      (date) =>
        date.people_fully_vaccinated_per_hundred >= 0 || date.people_vaccinated_per_hundred >= 0
    );
    const startFrom = moment("2020-12-01");
    const endAt = moment().startOf("day");
    let firstFound = false;
    // Loop through each day
    while (startFrom.isBefore(endAt)) {
      // Get day format
      const currentDay = startFrom.format("YYYY-MM-DD");
      // Create day in hashes if not aren't set
      if (!notFullyHash[currentDay]) notFullyHash[currentDay] = {};
      if (!fullyHash[currentDay]) fullyHash[currentDay] = {};
      // If there're remaining landmark days, continue growth
      if (daysWithPerHundredData.length > 0) {
        const { date, people_vaccinated_per_hundred, people_fully_vaccinated_per_hundred } =
          daysWithPerHundredData[0];
        // If the current day is the same as the next landmark day, update the current stats
        if (currentDay === date) {
          if (!firstFound) firstFound = true; // Update if the first Landmark is found
          oneDose = people_vaccinated_per_hundred ?? oneDose;
          fully = people_fully_vaccinated_per_hundred ?? fully;
          daysWithPerHundredData.shift();
        } else {
          // If not, Interpolate the data
          const difference = moment(date).endOf("day").diff(startFrom.clone().endOf("day"), "days");
          const notFullyDifference = (people_vaccinated_per_hundred ?? oneDose) - oneDose; // Add ?? in case the landmark day doesn't have the required metric
          const fullyDifference = (people_fully_vaccinated_per_hundred ?? fully) - fully;
          // Only update after the first landmark has been found
          if (firstFound) {
            oneDose += notFullyDifference / difference;
            fully += fullyDifference / difference;
          }
        }
      }
      // Add the current day stats to the hashes
      notFullyHash[currentDay][country] = oneDose;
      fullyHash[currentDay][country] = fully;
      startFrom.add(1, "day");
    }
  });
  // Convert {'2020-12-01': {...}, ...} to [{'date': '2020-12-01', 'data': {...}}, ...]
  const convertHash = (hash) => Object.entries(hash).map(([date, data]) => ({ date, data }));
  return [convertHash(notFullyHash), convertHash(fullyHash)];
};
export const generateDateOptions = (dateArray) => {
  const dateList = dateArray.map((dayData, idx, arr) => ({
    index: arr.length - 1 - idx,
    value: idx,
    label: dayData.date
  }));
  const sorted = dateList.sort((a, b) => new Date(b.label) - new Date(a.label));
  return sorted;
};

export const optionGenerator = (
  arr,
  labelAccessor = (d) => d.name,
  valueAccessor = (d) => d.name
) => {
  return arr.map((d) => ({
    label: labelAccessor(d),
    value: valueAccessor(d)
  }));
};

export const getGroupedOptions = (options) => {
  return [
    {
      label: "Utils",
      options: [
        { value: "Select All", label: "Select All" },
        { value: "Unselect All", label: "Unselect All" }
      ]
    },
    {
      label: "Countries",
      options: options
    }
  ];
};

export const INTERESTING_COUNTRIES = [
  "Israel",
  "Chile",
  "United Kingdom",
  "United States",
  "Turkey",
  "Brazil",
  "European Union"
];

export const MORE_COUNTRIES = [
  "Denmark",
  "Turkey",
  "Hungary",
  "Morocco",
  "Serbia",
  "United States",
  "Chile",
  "United Kingdom",
  "United Arab Emirates",
  "Israel",
  "Brazil",
  "European Union"
];
