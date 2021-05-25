import * as React from "react";
import Link from "next/link";
import { SectionTitle, PlayText, StickyContainer } from "./style";
import PropTypes from "prop-types";
<<<<<<< HEAD
import { CustomSelect } from "@components/select/select";
import { Syringe } from "./components/syringe/syringe";
import { Legend } from "./components/legend/legend";
import vaccinations_per_hundred from "./vaccinations_per_hundred.json";
import fully_vaccinations_per_hundred from "./data.json";
=======
import { CustomSelect } from "@components/select";
import { Syringe } from "./components/syringe";
import { Legend } from "./components/legend";
>>>>>>> 70ea97327009d86597e45752545d8672aadff3f3
import {
  generateDateOptions,
  getParsedData,
  optionGenerator,
  INTERESTING_COUNTRIES,
  MORE_COUNTRIES,
  getGroupedOptions
} from "./utils";
import { COLOR_MAPPERS, COLOR_MAPS, LEGEND_FILTERS } from "../colorMappers";
import { CountrySelect } from "./components/country-select/countrySelect";
import { useTracking } from "analytics/context";

const SVG_HEIGHT = 90;
const SELECT_WIDTH = 270;

<<<<<<< HEAD
const options = generateOptions(fully_vaccinations_per_hundred);
=======
const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

const PlayText = styled.button`
  background-color: #3baacc;
  border: 0 solid #5a60ab;
  border-radius: 4px;
  color: white;
  cursor:pointer;
  font-size: 1rem;
  font-weight: bolder;
  margin-top: 2rem;
  padding: .3rem 1rem;
  transition .3s ease all;
  &:hover {
    background-color: #5a60ab;
    color: white;
  }
`;

const StickyContainer = styled.div`
  background: rgba(255, 251, 243, 0.9);
  margin: 0 -8%;
  padding: 1rem 8% 0;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
`;

>>>>>>> 70ea97327009d86597e45752545d8672aadff3f3
// const colorMapperOptions = [
//   { value: "continent", label: "By Continent" },
//   { value: "gdp", label: "By GDP per capita" },
//   { value: "hdi", label: "By Human Development Index" }
// ];

const dataOptions = [
  { value: "fully", label: "Fully Vaccinated" },
  { value: "not-fully", label: "Only One Dose" }
];

export const Index = ({
  seeMore = false,
  animated = false,
  countryData = [],
  fullyVacPer100 = [],
  vacPer100 = []
}) => {
  const options = React.useMemo(() => {
    return generateDateOptions(fullyVacPer100);
  }, [fullyVacPer100]);

  const DATA_MAPPER = React.useMemo(() => {
    return {
      fully: fullyVacPer100,
      "not-fully": vacPer100
    };
  }, [fullyVacPer100, vacPer100]);

  const countryOptions = React.useMemo(() => {
    return optionGenerator(countryData);
  });
  const groupedOptions = React.useMemo(() => {
    return getGroupedOptions(countryData);
  });

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
  const { logEvent } = useTracking();

  React.useEffect(() => {
    if (dataIndex !== DATA_MAPPER[dataName].length - 1 && isPlaying) {
      setTimeout(() => {
        setDataIndex(dataIndex + 1);
      }, 200);
    } else {
      setIsPlaying(false);
    }
  }, [dataIndex, isPlaying]);

  React.useEffect(() => {
    setTimeout(() => setIsPlaying(true), 1000);
  }, []);

  React.useEffect(() => {
    setParsedData(
      getParsedData(
        DATA_MAPPER[dataName][dataIndex].data,
        COLOR_MAPPERS[colorMapper],
        countryList,
        legendFilter && LEGEND_FILTERS[colorMapper](legendFilter),
        countryData
      )
    );
  }, [dataName, dataIndex, colorMapper, legendFilter, countryList]);

  const onPlay = React.useCallback(() => {
    logEvent({
      category: "Vaccinations",
      action: "Pressed Play",
      label: isPlaying ? "stop" : "play"
    });
    if (dataIndex === DATA_MAPPER[dataName].length - 1) {
      setDataIndex(0);
    }
    setIsPlaying(!isPlaying);
  }, [dataIndex, isPlaying, dataName]);

  const onChangeCallback = React.useCallback((option) => {
    logEvent({
      category: "Vaccinations",
      action: "Changed Date",
      label: option.value
    });
    setDataIndex(option.value);
  }, []);

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

  const onCountriesChange = React.useCallback((options, action) => {
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
  }, []);

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
          {parsedData.map((row) => {
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
          })}
        </svg>

        {!seeMore ? (
          <a href="/data.json">
            <button className="btn download-btn">Download Data</button>
          </a>
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
