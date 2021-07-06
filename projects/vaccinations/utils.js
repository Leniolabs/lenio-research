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
