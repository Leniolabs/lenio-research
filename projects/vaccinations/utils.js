import country_data from "./country_data.json";

export const getParsedData = (data, colorMapper, countryList, legendFilter) => {
  let countries = country_data;
  if (countryList) {
    countries = country_data.filter((r) => countryList.includes(r.countryCode));
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
    .sort((a, b) => a.value - b.value);
};

export const generateOptions = (dateArray) => {
  return dateArray.map((dayData, idx) => ({ value: idx, label: dayData.date }));
};

export const countryOptions = country_data.map((country) => ({
  value: country.countryCode,
  label: country.name
}));

export const ALL_COUNTRIES = country_data.map((country) => country.countryCode);
export const INTERESTING_COUNTRIES = ["IL", "CL", "GB", "US", "TR", "BR", "EU"];
