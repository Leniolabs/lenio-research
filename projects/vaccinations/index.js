import * as React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { CustomSelect } from "@components/select";
import { Syringe } from "./components/syringe";
import { Legend } from "./components/legend";
import data from "./data.json";
import { generateOptions, getParsedData } from "./utils";
import { SVGText } from "./components/styled";

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

const PlayText = styled(SVGText)`
  font-size: 1rem;
  font-weight: bolder;
`;

const options = generateOptions(data);

export const Index = ({ countryList }) => {
  const [dataIndex, setDataIndex] = React.useState(0);
  const [parsedData, setParsedData] = React.useState(
    getParsedData(data[dataIndex].data, undefined, countryList)
  );
  const [isPlaying, setIsPlaying] = React.useState(true);

  React.useEffect(() => {
    if (dataIndex !== data.length - 1 && isPlaying) {
      setTimeout(() => {
        setDataIndex(dataIndex + 1);
      }, 500);
    } else {
      setIsPlaying(false);
    }
  }, [dataIndex, isPlaying]);

  React.useEffect(() => {
    setParsedData(getParsedData(data[dataIndex].data, undefined, countryList));
  }, [dataIndex]);

  const onPlay = React.useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const onChangeCallback = React.useCallback((option) => {
    setDataIndex(option.value);
  });

  const svgHeight = 90;

  return (
    <section className="chart-wrapper">
      <div className="row-container">
        <SectionTitle>People Vaccinated</SectionTitle>
        <p>
          Our data on COVID-19 vaccinations is updated each morning (Chilean time), with the most
          recent official numbers up to the previous day.
        </p>
        <CustomSelect
          options={options}
          selectedOption={options[dataIndex]}
          onChange={onChangeCallback}></CustomSelect>
        <svg
          className="main-chart"
          overflow="visible"
          viewBox={`0 0 1235.7 ${svgHeight * parsedData.length}`}

          // style={{ height: svgHeight }}
        >
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
            x1="84%"
            y1="-20"
            x2="84%"
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
                svgHeight={svgHeight}
                key={idx}
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
        <Legend />
        <a href="/data.json">
          <button className="btn download-btn">Download Data</button>
        </a>
      </div>
    </section>
  );
};

Index.propTypes = {
  countryList: PropTypes.array
};

export default Index;
