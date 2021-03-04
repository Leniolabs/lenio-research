import * as React from "react";
import Link from "next/link";
import styled from "styled-components";
import PropTypes from "prop-types";
import { CustomSelect } from "@components/select";
import { Syringe } from "./components/syringe";
import { Legend } from "./components/legend";
import vaccinations_per_hundred from "./vaccinations_per_hundred.json";
import fully_vaccinations_per_hundred from "./data.json";
import { generateOptions, getParsedData } from "./utils";
import { SVGText } from "./components/styled";
import { COLOR_MAPPERS, COLOR_MAPS } from "../colorMappers";

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

const PlayText = styled(SVGText)`
  font-size: 1.2rem;
  font-weight: bolder;
`;

const options = generateOptions(fully_vaccinations_per_hundred);
const colorMapperOptions = [
  { value: "continent", label: "By Continent" },
  { value: "gdp", label: "By GDP per capita" },
  { value: "hdi", label: "By Human Development Index" }
];

const DATA_MAPPER = {
  fully: fully_vaccinations_per_hundred,
  "not-fully": vaccinations_per_hundred
};

const dataOptions = [
  { value: "fully", label: "Yes" },
  { value: "not-fully", label: "No" }
];

export const Index = ({ countryList, seeMore = false, animated = false }) => {
  const [dataIndex, setDataIndex] = React.useState(0);
  const [colorMapper, setColorMapper] = React.useState("continent");
  const [dataName, setDataName] = React.useState("fully");
  const [parsedData, setParsedData] = React.useState([]);
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    if (dataIndex !== DATA_MAPPER[dataName].length - 1 && isPlaying) {
      setTimeout(() => {
        setDataIndex(dataIndex + 1);
      }, 100);
    } else {
      setIsPlaying(false);
    }
  }, [dataIndex, isPlaying]);

  React.useEffect(() => {
    setTimeout(() => setIsPlaying(true), 1000);
  }, []);

  React.useEffect(() => {
    setParsedData(
      getParsedData(DATA_MAPPER[dataName][dataIndex].data, COLOR_MAPPERS[colorMapper], countryList)
    );
  }, [dataName, dataIndex, colorMapper]);

  const onPlay = React.useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const onChangeCallback = React.useCallback((option) => {
    setDataIndex(option.value);
  });

  const onColorMapperChange = React.useCallback((option) => {
    setColorMapper(option.value);
  });

  const onDataChange = React.useCallback((option) => {
    setDataName(option.value);
  });

  const svgHeight = 90;

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
          repository .
        </p>
        <CustomSelect
          options={options}
          selectedOption={options[dataIndex]}
          label="Select Date"
          onChange={onChangeCallback}></CustomSelect>
        <CustomSelect
          options={colorMapperOptions}
          selectedOption={colorMapperOptions.find((option) => option.value === colorMapper)}
          label="Color"
          onChange={onColorMapperChange}></CustomSelect>
        <CustomSelect
          options={dataOptions}
          selectedOption={dataOptions.find((option) => option.value === dataName)}
          label="Fully Vaccinated"
          onChange={onDataChange}></CustomSelect>
        <svg
          className="main-chart"
          overflow="visible"
          viewBox={`0 0 1235.7 ${svgHeight * parsedData.length}`}>
          <PlayText x="50" onClick={onPlay}>
            {isPlaying ? "Stop" : "Play"}
          </PlayText>
          <line
            x1="40"
            y1="-20"
            x2="40"
            y2={`${svgHeight * parsedData.length + 20}`}
            stroke="#5a60ab"
            strokeWidth="2"
          />
          <line
            x1="45%"
            y1="-20"
            x2="45%"
            y2={`${svgHeight * parsedData.length + 20}`}
            stroke="#5a60ab"
            strokeWidth="2"
            strokeDasharray="10 10"
          />
          <line
            x1="83.8%"
            y1="-20"
            x2="83.8%"
            y2={`${svgHeight * parsedData.length + 20}`}
            stroke="#5a60ab"
            strokeWidth="2"
            strokeDasharray="10 10"
          />
          <line
            y1={`${svgHeight * parsedData.length + 20}`}
            x2="88%"
            y2={`${svgHeight * parsedData.length + 20}`}
            stroke="#5a60ab"
            strokeWidth="2"
          />
          <text transform={`translate(0 ${svgHeight * parsedData.length + 50})`} fill="#5a60ab">
            Population
          </text>
          <text transform={`translate(540 ${svgHeight * parsedData.length + 50})`} fill="#5a60ab">
            50%
          </text>
          <text transform={`translate(1020 ${svgHeight * parsedData.length + 50})`} fill="#5a60ab">
            100%
          </text>
          {parsedData.map((row, idx) => {
            return (
              <Syringe
                key={`syringe${row.countryCode}`}
                animated={animated}
                index={idx}
                color={row.color}
                country={row.country}
                percentage={row.value}
                countryCode={row.countryCode}
                population={row.population}
              />
            );
          })}
        </svg>
        <Legend series={COLOR_MAPS[colorMapper]} />
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
  animated: PropTypes.bool
};

export default Index;
