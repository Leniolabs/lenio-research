import country_data from "./country_data.json";

const COLOR_MAP = {
  "Asia": "#f79fad",
  "Europe": "#f7de9f",
  "North America": "#9ff4e4",
  "South America": "#b0a3e5",
  undefined: "#b0a3e5",
}

export const getParsedData = (data, colorMap = COLOR_MAP, countryList) => {
  let countries = country_data;
  if (countryList) {
    countries = country_data.filter((r) => countryList.includes(r.countryCode));
  }

  return countries
    .map((country) => {
      return {
        country: country.name,
        countryCode: country.countryCode,
        value: 1 - data[country.name] / 100,
        population: (country.population / 1000000).toFixed(2),
        color: colorMap[country.continent],
      };
    })
    .sort((a, b) => a.value - b.value);
};
