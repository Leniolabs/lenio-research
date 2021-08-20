export const YEAR_OPTIONS = [
  {
    value: "1960",
    name: "Rome, Italy"
  },
  {
    value: "1964",
    name: "Tokyo, Japan"
  },
  {
    value: "1968",
    name: "Mexico City, Mexico"
  },
  {
    value: "1972",
    name: "Munich, West Germany"
  },
  {
    value: "1976",
    name: "Montreal, Canada"
  },
  {
    value: "1980",
    name: "Moscow, Soviet Union"
  },
  {
    value: "1984",
    name: "Los Angeles, United States"
  },
  {
    value: "1988",
    name: "Seoul, South Korea"
  },
  {
    value: "1992",
    name: "Barcelona, Spain"
  },
  {
    value: "1996",
    name: "Atlanta, United States"
  },
  {
    value: "2000",
    name: "Sydney, Australia"
  },
  {
    value: "2004",
    name: "Athens, Greece"
  },
  {
    value: "2008",
    name: "Beijing, China"
  },
  {
    value: "2012",
    name: "London, Great Britain"
  },
  {
    value: "2016",
    name: "Rio de Janeiro, Brazil"
  // },
  // {
  //   value: "2020",
  //   name: "Tokyo, Japan"
  }
].map((year, idx) => ({ value: year.value, label: `${year.name} - ${year.value}`, index: idx }));
