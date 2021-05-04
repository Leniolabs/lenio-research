export const INNER_HEX_DEFAULT_COLOR = "#F4E9F0";
export const INNER_HEX_COLORS = ["#ff9900", "#ffbd23", "#ffd892", "#ffe4b8", "#fff5e6", "#fff5e6"];

// export const INNER_HEX_COLORS = ["#0D3EA0", "#3366FF", "#6690FF", "#BDD5FF", "#E3ECFF", "#E3ECFF"];
export const LEGEND_COLORS = ["#23A3C1", "#9cc9d9", "#ffaa92", "#FF5B3A", "#F4E9F0"];

export const generateLegendMapping = (names, colors = LEGEND_COLORS) => {
  return names.map((name, idx) => {
    return { name, color: colors[idx] };
  });
};

export const MIGRATION_LEGEND_COLOR_MAPPING = generateLegendMapping([
  "High Inbound",
  "Medium Inbound",
  "Medium Outbound",
  "High Outbound",
  "No Data"
]);

export const INCOME_LEGEND_COLOR_MAPPING = generateLegendMapping(
  [
    "Income between 0K and 49K",
    "Income between 50K and 74K",
    "Income between 75K and 99K",
    "Income between 100K and 149K",
    "Income greater than 150K"
  ],
  INNER_HEX_COLORS
);

export const AGE_LEGEND_COLOR_MAPPING = generateLegendMapping(
  ["< 18 to 34 y/o", "35 to 44 y/o", "45 to 54 y/o", "55 to 64 y/o", "65 or older"],
  INNER_HEX_COLORS
);

export const REASON_LEGEND_COLOR_MAPPING = generateLegendMapping(
  ["Retirement", "Health", "Family", "Lifestyle", "Job"],
  INNER_HEX_COLORS
);

export const KEY_ARRAY_OPTIONS = [
  {
    value: ["Retirement_in", "Health_in", "Family_in", "Lifestyle_in", "Job_in"],
    label: "Reasons Inbound"
  },
  {
    value: ["Retirement_out", "Health_out", "Family_out", "Lifestyle_out", "Job_out"],
    label: "Reasons Outbound"
  },
  {
    value: [
      "Age_18_to_34_in",
      "Age_35_to_44_in",
      "Age_45_to_54_in",
      "Age_55_to_64_in",
      "Age_65_or_older_in"
    ],
    label: "Age Inbound"
  },
  {
    value: [
      "Age_18_to_34_out",
      "Age_35_to_44_out",
      "Age_45_to_54_out",
      "Age_55_to_64_out",
      "Age_65_or_older_out"
    ],
    label: "Age Outbound"
  },
  {
    value: [
      "Income_0_49_in",
      "Income_50_74_in",
      "Income_75_99_in",
      "Income_100_149_in",
      "Income_150_more_in"
    ],
    label: "Income Inbound"
  },
  {
    value: [
      "Income_0_49_out",
      "Income_50_74_out",
      "Income_75_99_out",
      "Income_100_149_out",
      "Income_150_more_out"
    ],
    label: "Income Outbound"
  }
];
