import country_data from "./country_data.json";

export const getParsedData = (data, colorMapper, countryList) => {
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
        color: colorMapper(country)
      };
    })
    .sort((a, b) => a.value - b.value);
};

export const generateOptions = (dateArray) => {
  return dateArray.map((dayData, idx) => ({ value: idx, label: dayData.date }));
};
