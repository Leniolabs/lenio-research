import country_data from "./country_data.json";

export const getParsedData = (data, colorMapper, countryList, legendFilter) => {
  let countries = country_data;
  if (countryList) {
    countries = country_data.filter((r) => countryList.includes(r.name));
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

export const generateOptions = (dateArray) => {
  return dateArray.map((dayData, idx) => ({ value: idx, label: dayData.date }));
};

export const countryOptions = country_data.map((country) => ({
  value: country.name,
  label: country.name
}));

export const groupedOptions = [
  {
    label: "Utils",
    options: [
      { value: "Select All", label: "Select All" },
      { value: "Unselect All", label: "Unselect All" }
    ]
  },
  {
    label: "Countries",
    options: countryOptions
  }
];

export const ALL_COUNTRIES = country_data.map((country) => country.name);
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
