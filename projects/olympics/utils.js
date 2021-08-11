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

export const getCountryCode = (three_code) => {
  const country = countryCodes.find((c) => c["3code"] === three_code || c["3code2"] === three_code);
  if (country) {
    return country["2code"];
  }
  return null;
};
