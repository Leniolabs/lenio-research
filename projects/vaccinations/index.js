import * as React from "react";
import Link from "next/link";
import { SectionTitle, PlayText, StickyContainer } from "./style";
import PropTypes from "prop-types";
import { CustomSelect } from "@components/select/select";
import { Syringe } from "./components/syringe/syringe";
import { Legend } from "./components/legend/legend";
import {
  generateDateOptions,
  getParsedData,
  optionGenerator,
  INTERESTING_COUNTRIES,
  MORE_COUNTRIES,
  getGroupedOptions,
  generateDatasets
} from "./utils";
import { COLOR_MAPPERS, COLOR_MAPS, LEGEND_FILTERS } from "../colorMappers";
import { CountrySelect } from "./components/country-select/countrySelect";
import { useTracking } from "analytics/context";
import DownloadButton from "@components/DownloadButton";
import { LoadingSyringe } from "./components/syringe/loading";

const SVG_HEIGHT = 90;
const SELECT_WIDTH = 270;

// const colorMapperOptions = [
//   { value: "continent", label: "By Continent" },
//   { value: "gdp", label: "By GDP per capita" },
//   { value: "hdi", label: "By Human Development Index" }
// ];

const dataOptions = [
  { value: "fully", label: "Fully Vaccinated" },
  { value: "not-fully", label: "Only One Dose" }
];

async function getVaccineData() {
  // use context to get the url called
  const BASE_URL = "https://research-vaccines-lambda.s3.amazonaws.com/data/";
  const countryDataR = await fetch(`${BASE_URL}country_data.json`);
  const countries = await countryDataR.json();
  const countryVaccinations = await fetch(
    "https://covid.ourworldindata.org/data/vaccinations/vaccinations.json"
  ).then((res) => res.json());
  // Generate Datasets
  const [vacPer100, fullyVacPer100] = generateDatasets(countryVaccinations, countries);
  // Keep only countries that are in dataset
  const validCountries = Object.keys(vacPer100[0].data);
  const countryData = countries.filter((country) => validCountries.includes(country.name));
  return {
    countryData,
    fullyVacPer100,
    vacPer100
  };
}

export const Index = ({ seeMore = false, animated = false }) => {
  const [countryData, setCountryData] = React.useState([]);
  const [fullyVacPer100, setFullyVacPer100] = React.useState([]);
  const [vacPer100, setVacPer100] = React.useState([]);
  const firstTimePlay = React.useRef(true);
  const options = React.useMemo(() => {
    return generateDateOptions(fullyVacPer100);
  }, [fullyVacPer100]);

  const DATA_MAPPER = React.useMemo(() => {
    if (vacPer100 && fullyVacPer100) {
      // console.log(vacPer100.length, fullyVacPer100.length);
      return {
        fully: fullyVacPer100.length > 0 ? fullyVacPer100 : [],
        "not-fully": vacPer100.length > 0 ? vacPer100 : []
      };
    }
    return {};
  }, [fullyVacPer100, vacPer100]);

  const countryOptions = React.useMemo(() => {
    return optionGenerator(countryData);
  }, [countryData]);
  const groupedOptions = React.useMemo(() => {
    return getGroupedOptions(countryOptions);
  }, [countryOptions]);

  // React.useEffect(() => {
  //   console.log(countryData, countryOptions);
  // }, [countryData, countryOptions]);

  const [countryList, setCountryList] = React.useState(
    seeMore ? INTERESTING_COUNTRIES : MORE_COUNTRIES
  );
  const [dataIndex, setDataIndex] = React.useState(0);
  // eslint-disable-next-line no-unused-vars
  const [colorMapper, setColorMapper] = React.useState("continent");
  const [dataName, setDataName] = React.useState("not-fully");
  const [parsedData, setParsedData] = React.useState([]);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [legendFilter, setLegendFilter] = React.useState(null);
  const [dateChange, setDateChange] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const { logEvent } = useTracking();

  React.useEffect(() => {
    if (DATA_MAPPER === {}) return;
    if (dataIndex > 0 && isPlaying) {
      setTimeout(() => {
        if (dateChange) {
          setDataIndex(dateChange);
          setDateChange(null);
        } else {
          setDataIndex((prevDataIndex) => prevDataIndex - 1);
        }
      }, 200);
    } else {
      setIsPlaying(false);
    }
  }, [dataIndex, isPlaying, DATA_MAPPER, dateChange]);

  React.useEffect(() => {
    if (DATA_MAPPER[dataName][options[dataIndex]?.value]?.data) {
      setParsedData(
        getParsedData(
          DATA_MAPPER[dataName][options[dataIndex]?.value]?.data,
          COLOR_MAPPERS[colorMapper],
          countryList,
          legendFilter && LEGEND_FILTERS[colorMapper](legendFilter),
          countryData
        )
      );
    }
  }, [dataName, dataIndex, colorMapper, legendFilter, countryList]);

  React.useEffect(() => {
    if (DATA_MAPPER === {}) return;
    if (dataIndex === 0 && DATA_MAPPER[dataName].length > 0) {
      if (firstTimePlay.current && DATA_MAPPER[dataName][options[0]?.value]?.data) {
        setParsedData(
          getParsedData(
            DATA_MAPPER[dataName][options[0]?.value]?.data,
            COLOR_MAPPERS[colorMapper],
            countryList,
            legendFilter && LEGEND_FILTERS[colorMapper](legendFilter),
            countryData
          )
        );
      }
    }
  }, [DATA_MAPPER, dataIndex]);

  React.useEffect(() => {
    setLoading(true);
    getVaccineData()
      .then((resp) => {
        setCountryData(resp.countryData);
        setFullyVacPer100(resp.fullyVacPer100);
        setVacPer100(resp.vacPer100);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onPlay = React.useCallback(() => {
    logEvent({
      category: "Vaccinations",
      action: "Pressed Play",
      label: isPlaying ? "stop" : "play"
    });
    if (dataIndex === 0 && DATA_MAPPER) {
      setDataIndex(DATA_MAPPER[dataName].length > 0 ? DATA_MAPPER[dataName].length - 1 : 0);
    }
    setIsPlaying(!isPlaying);
    firstTimePlay.current = false;
  }, [dataIndex, isPlaying, dataName, DATA_MAPPER]);

  const onChangeCallback = React.useCallback(
    (option) => {
      logEvent({
        category: "Vaccinations",
        action: "Changed Date",
        label: option.value
      });
      if (isPlaying) setDateChange(option.index);
      else setDataIndex(option.index);
    },
    [isPlaying]
  );

  // const onColorMapperChange = React.useCallback((option) => {
  //   logEvent({
  //     category: "Vaccinations",
  //     action: "Changed Color",
  //     label: option.value
  //   });
  //   setColorMapper(option.value);
  // });

  const onDataChange = React.useCallback((option) => {
    logEvent({
      category: "Vaccinations",
      action: "Changed Data",
      label: option.value
    });
    setDataName(option.value);
  }, []);

  const onSeriesClick = React.useCallback((value) => {
    logEvent({
      category: "Vaccinations",
      action: "Changed Filter",
      label: value
    });
    setLegendFilter(value);
  }, []);

  const onCountriesChange = React.useCallback(
    (options, action) => {
      const newList = options.map((o) => o.value);
      if (action.option.value === "Select All") {
        logEvent({
          category: "Vaccinations",
          action: "Changed Countries",
          label: "Select All"
        });
        setCountryList(countryOptions.map((option) => option.value));
      } else if (action.option.value === "Unselect All") {
        logEvent({
          category: "Vaccinations",
          action: "Changed Countries",
          label: "Unselect All"
        });
        setCountryList([]);
      } else {
        logEvent({
          category: "Vaccinations",
          action: "Changed Date",
          label: newList.join(",")
        });
        setCountryList(newList);
      }
    },
    [countryOptions]
  );

  const calculatedHeight = React.useMemo(() => {
    let s = SVG_HEIGHT * countryList.length;
    if (s < 440) return 440;
    return s;
  });

  return (
    <section className="chart-wrapper">
      <div className="row-container">
        <SectionTitle>People Vaccinated</SectionTitle>
        <p>
          Our data on COVID-19 vaccinations is updated every day, with the most recent numbers from
          the&nbsp;
          <Link href="https://github.com/owid/covid-19-data/tree/master/public/data">
            Our World In Data
          </Link>{" "}
          repository.
        </p>
        <StickyContainer>
          <CustomSelect
            width={SELECT_WIDTH}
            options={options}
            selectedOption={options[dataIndex]}
            label="Select Date"
            onChange={onChangeCallback}
          />
          {/* <CustomSelect
            width={400}
            options={colorMapperOptions}
            selectedOption={colorMapperOptions.find((option) => option.value === colorMapper)}
            label="Color"
            onChange={onColorMapperChange}
          /> */}
          <CustomSelect
            width={SELECT_WIDTH}
            options={dataOptions}
            selectedOption={dataOptions.find((option) => option.value === dataName)}
            label=""
            onChange={onDataChange}
          />
          <CountrySelect
            width={SELECT_WIDTH}
            options={groupedOptions}
            selectedOption={countryOptions.filter((option) => countryList.includes(option.value))}
            label="Countries"
            onChange={onCountriesChange}
          />
          <Legend
            series={COLOR_MAPS[colorMapper]}
            onSeriesClick={onSeriesClick}
            legendFilter={legendFilter}
          />
        </StickyContainer>
        <PlayText x="50" onClick={onPlay}>
          {isPlaying ? "⏹️ Stop" : "▶️ Play"}
        </PlayText>
        <svg className="main-chart" overflow="visible" viewBox={`0 0 1235.7 ${calculatedHeight}`}>
          {/* <PlayText x="50" onClick={onPlay}>
            {isPlaying ? "Stop" : "Play"}
          </PlayText> */}
          <line
            x1="40"
            y1="0"
            x2="40"
            y2={`${calculatedHeight + 20}`}
            stroke="#5a60ab"
            strokeWidth="2"
          />
          <line
            x1="45%"
            y1="0"
            x2="45%"
            y2={`${calculatedHeight + 20}`}
            stroke="#5a60ab"
            strokeWidth="2"
            strokeDasharray="10 10"
          />
          <line
            x1="83.8%"
            y1="0"
            x2="83.8%"
            y2={`${calculatedHeight + 20}`}
            stroke="#5a60ab"
            strokeWidth="2"
            strokeDasharray="10 10"
          />
          <line
            y1={`${calculatedHeight + 20}`}
            x2="88%"
            y2={`${calculatedHeight + 20}`}
            stroke="#5a60ab"
            strokeWidth="2"
          />
          <text transform={`translate(0 ${calculatedHeight + 50})`} fill="#5a60ab">
            Population
          </text>
          <text transform={`translate(540 ${calculatedHeight + 50})`} fill="#5a60ab">
            50%
          </text>
          <text transform={`translate(1020 ${calculatedHeight + 50})`} fill="#5a60ab">
            100%
          </text>
          {loading ? (
            <LoadingSyringe />
          ) : (
            parsedData.map((row) => {
              return (
                <Syringe
                  key={`syringe${row.countryCode}`}
                  animated={animated}
                  index={row.position}
                  color={row.color}
                  country={row.country}
                  percentage={row.value}
                  countryCode={row.countryCode}
                  population={row.population}
                />
              );
            })
          )}
        </svg>
        <p>
          * Generated through an interpolation using the days in which each country reported its
          total metrics per hundred inhabitants.
        </p>
        {!seeMore ? (
          <DownloadButton objectToDownload={DATA_MAPPER} fileName="vaccinations.json">
            Download Data
          </DownloadButton>
        ) : (
          <Link href="/vaccinations">
            <a>
              <button className="btn download-btn">See more</button>
            </a>
          </Link>
        )}
      </div>
    </section>
  );
};

Index.propTypes = {
  countryList: PropTypes.array,
  seeMore: PropTypes.bool,
  animated: PropTypes.bool,
  countryData: PropTypes.array,
  fullyVacPer100: PropTypes.array,
  vacPer100: PropTypes.array
};

export default Index;
