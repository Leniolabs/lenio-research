import * as React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Syringe } from "@projects/vaccinations/components/syringe";
import data from "./data.json";
import { getParsedData } from "./utils";

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;
const LegendsContainer = styled.div``;
const Legend = styled.span`
  align-items: center;
  color: #5a60ab;
  display: inline-flex;
  font-size: 1rem;
  margin: 1rem;
  svg {
    margin-right: 0.5rem;
  }
`;

export const Index = ({ countryList }) => {
  const [dataIndex, setDataIndex] = React.useState(0);
  const [parsedData, setParsedData] = React.useState(
    getParsedData(data[dataIndex].data, undefined, countryList)
  );

  React.useEffect(() => {
    if (dataIndex !== data.length - 1) {
      setTimeout(() => {
        setDataIndex(dataIndex + 1);
      }, 200);
    }
  }, [dataIndex]);

  React.useEffect(() => {
    setParsedData(getParsedData(data[dataIndex].data, undefined, countryList));
  }, [dataIndex]);

  const svgHeight = parsedData.length * 100;

  return (
    <section className="chart-wrapper">
      <div className="row-container">
        <SectionTitle>People Vaccinated</SectionTitle>
        <p>
          Our data on COVID-19 vaccinations is updated each morning (Chilean time), with the most
          recent official numbers up to the previous day.
        </p>
        <svg
          className="main-chart"
          overflow="visible"
          viewBox="0 0 1235.7 91.24"
          style={{ height: svgHeight }}>
          <line x1="40" y1="-470%" x2="40" y2="400%" stroke="#5a60ab" strokeWidth="2" />
          <line
            x1="45%"
            y1="-470%"
            x2="45%"
            y2="400%"
            stroke="#5a60ab"
            strokeWidth="2"
            strokeDasharray="10 10"
          />
          <line
            x1="84%"
            y1="-470%"
            x2="84%"
            y2="400%"
            stroke="#5a60ab"
            strokeWidth="2"
            strokeDasharray="10 10"
          />
          <line y1="380%" x2="100%" y2="380%" stroke="#5a60ab" strokeWidth="2" />
          <text transform="translate(0 390)" fill="#5a60ab">
            Population
          </text>
          <text transform="translate(540 390)" fill="#5a60ab">
            50%
          </text>
          <text transform="translate(1020 390)" fill="#5a60ab">
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
        <LegendsContainer>
          <Legend>
            <svg width="20" height="20" overflow="visible" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="8" fill="#f79fad" stroke="#5a60ab" />
            </svg>{" "}
            Asia
          </Legend>
          <Legend>
            <svg width="20" height="20" overflow="visible" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="8" fill="#f7de9f" stroke="#5a60ab" />
            </svg>{" "}
            Europe
          </Legend>
          <Legend>
            <svg width="20" height="20" overflow="visible" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="8" fill="#9ff4e4" stroke="#5a60ab" />
            </svg>{" "}
            North America
          </Legend>
          <Legend>
            <svg width="20" height="20" overflow="visible" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="8" fill="#b0a3e5" stroke="#5a60ab" />
            </svg>{" "}
            South America
          </Legend>
          <Legend>
            <svg width="20" height="20" viewBox="0 0 20 20" overflow="visible">
              <rect x="2" width="18" height="20" fill="#dce4fc" stroke="#5a60ab" />
              <line x1="2" y1="10" x2="20" y2="10" stroke="#5a60ab" strokeWidth="3" />
            </svg>{" "}
            People vaccinated
          </Legend>
        </LegendsContainer>
        <button className="btn download-btn">Download .csv</button>
      </div>
    </section>
  );
};

Index.propTypes = {
  countryList: PropTypes.array
};

export default Index;
