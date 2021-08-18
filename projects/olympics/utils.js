import countryCodes from "./countrycodes.json";

export const optionGenerator = (
  arr,
  labelAccessor = (d) => d.country,
  valueAccessor = (d) => d.country
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

export const getOlympicDataToUse = (medalsData, olympicYears, quantityPerYear = 11) => {
  const bestCountries = {};
  const tempArray = [...Array(quantityPerYear).keys()];
  const yPositions = tempArray.map((value) => 25 * value + 8.5);
  olympicYears.forEach(({ value: year }) => {
    const countries = medalsData[year];
    bestCountries[year] = countries
      .sort((a, b) => (a.total_medals < b.total_medals ? 1 : -1))
      .slice(0, quantityPerYear)
      .map((item, idx) => {
        item.yPosition = yPositions[idx];
        return item;
      });
  });
  return bestCountries;
};

export const getCountryCode = (three_code) => {
  const country = countryCodes.find((c) => c["3code"] === three_code || c["3code2"] === three_code);
  if (country) {
    return country["2code"];
  }
  return null;
};
