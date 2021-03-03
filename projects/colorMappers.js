export const CONTINENT_COLOR_MAP = {
  Asia: "#f79fad",
  Europe: "#f7de9f",
  "North America": "#9ff4e4",
  "South America": "#b0a3e5",
  Africa: "#7ae290",
  Oceania: "#5298cc",
  undefined: "#b0a3e5"
};

export const GDP_COLOR_MAP = {
  Mean: "#f79fad",
  "1+ Standard Deviation Greater": "#f7de9f",
  "1+ Standard Deviation Lesser": "#9ff4e4",
  Unknown: "#b0a3e5"
};

export const HDI_COLOR_MAP = {
  Mean: "#f79fad",
  "1+ Standard Deviation Greater": "#f7de9f",
  "1+ Standard Deviation Lesser": "#9ff4e4",
  Unknown: "#b0a3e5"
};

export const COLOR_MAPS = {
  continent: CONTINENT_COLOR_MAP,
  hdi: HDI_COLOR_MAP,
  gdp: GDP_COLOR_MAP
};

export const ContinentColorMapper = (row) => {
  if (row) {
    return CONTINENT_COLOR_MAP[row.continent];
  }
  return CONTINENT_COLOR_MAP["undefined"];
};

export const distributionColorMapper = (distribution, value) => {
  const { mean, std } = distribution;
  if (value >= mean - std) {
    if (value <= mean + std) {
      return GDP_COLOR_MAP["Mean"];
    }
    return GDP_COLOR_MAP["1+ Standard Deviation Greater"];
  }
  return GDP_COLOR_MAP["1+ Standard Deviation Lesser"];
};

export const GDPColorMapper = (row) => {
  return distributionColorMapper({ mean: 34014, std: 19092 }, row.gdpPerCapita);
};

export const HDIColorMapper = (row) => {
  return distributionColorMapper({ mean: 0.85, std: 0.07 }, row.humanDevelopmentIndex);
};

export const COLOR_MAPPERS = {
  continent: ContinentColorMapper,
  hdi: HDIColorMapper,
  gdp: GDPColorMapper
};
