/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTracking } from "analytics/context";
import { winterOlympicsData } from "./winterOlympicsData";
import { scaleLinear, scalePow } from "d3-scale";
import { curveLinear, line } from "d3-shape";

const TOOLTIP_WIDTH = 200;
const TOOLTIP_HEIGHT = 110;
const CIRCLE_SIZE = 24;
const GIF_DURATION_MS = 18600;

const WinterOlympicsTooltip = ({ x, yMale, yFemale, data }) => {
  const actualX = x - TOOLTIP_WIDTH / 2;
  const actualYMale = yMale - CIRCLE_SIZE;
  const actualYFemale = yFemale + CIRCLE_SIZE;

  const maleSports = data.sports.filter((row) => row.gender === "M");
  const femaleSports = data.sports.filter((row) => row.gender === "F");

  const maleHeight = (maleSports.length + 1) * 18 + 12;
  const femaleHeight = (femaleSports.length + 1) * 18 + 12;

  return (
    <>
      <g transform={`translate(${actualX} ${actualYMale - maleHeight})`}>
        <path
          stroke="#9EA2AC"
          fill="#F8F3E6"
          strokeMiterlimit="10"
          d={`M0,0h${TOOLTIP_WIDTH}v${maleHeight}h-${TOOLTIP_WIDTH / 2 - 10}l-10 10l-10 -10h-${
            TOOLTIP_WIDTH / 2 - 10
          }z`}
        />
        <text
          transform="translate(12, 18)"
          fontFamily="Source Sans Pro"
          fontSize="17"
          fontWeight="700">
          Total: {maleSports.length}
        </text>
        {maleSports.map((row, i) => (
          <text
            transform={`translate(12, ${18 + (i + 1) * 18})`}
            fontFamily="Source Sans Pro"
            fontSize="16"
            fontWeight="500">
            {row.name}
          </text>
        ))}
        <circle
            fill="#e8ab2a"
            r="8" 
            cx={TOOLTIP_WIDTH / 2}
            cy={maleHeight + 23}
          />
      </g>
      <g transform={`translate(${actualX} ${actualYFemale})`}>
        <path
          stroke="#9EA2AC"
          fill="#F8F3E6"
          strokeMiterlimit="10"
          d={`M0,0h${TOOLTIP_WIDTH / 2 - 10}l10 -10l10 10
          h${TOOLTIP_WIDTH / 2 - 10}v${femaleHeight}h-${TOOLTIP_WIDTH}z`}
        />
        <text
          transform="translate(12, 18)"
          fontFamily="Source Sans Pro"
          fontSize="17"
          fontWeight="700">
          Total: {femaleSports.length}
        </text>
        {femaleSports.map((row, i) => (
          <text
            transform={`translate(12, ${18 + (i + 1) * 18})`}
            fontFamily="Source Sans Pro"
            fontSize="16"
            fontWeight="500">
            {row.name}
          </text>
        ))}
          <circle
            fill="#72b6c6"
            r="8" 
            cx={TOOLTIP_WIDTH / 2}
            cy="-23"
          />
      </g>
    </>
  );
};

WinterOlympicsTooltip.propTypes = {
  name: PropTypes.string,
  countryCode: PropTypes.string,
  record: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
};

const getData = (x, y, idx) => {
  return {
    x,
    y,
    name: PoleData[idx].name,
    countryCode: PoleData[idx].country,
    record: PoleData[idx].record
  };
};

const timestamp = new Date().getTime();

const WinterOlympicsVis = () => {
  const [tooltipData, setTooltipData] = useState(null);

  const [scaleX] = React.useState(() => {
    const years = winterOlympicsData.map((row) => row.year);
    const min = Math.min(...years);
    const max = Math.max(...years);
    return scaleLinear().domain([min, max]).range([160, 1070]);
  });
  const [scaleY] = React.useState(() => {
    return (value) => scalePow().domain([-50, 50]).range([800, 150]).exponent(1.01)(value - 50);
  });

  const xLabels = React.useMemo(() => {
    return winterOlympicsData.map((row) => row.year);
  }, [winterOlympicsData]);

  const yLabels = React.useMemo(() => {
    return [20, 40, 50, 60, 80, 100];
  }, []);

  const femaleTrend = React.useMemo(() => {
    return line()
      .x((d) => scaleX(d.year))
      .y((d) => scaleY((d.femaleQuantity * 100) / (d.maleQuantity + d.femaleQuantity)))
      .curve(curveLinear)(winterOlympicsData);
  }, [winterOlympicsData, scaleX, scaleY]);

  const maleTrend = React.useMemo(() => {
    return line()
      .x((d) => scaleX(d.year))
      .y((d) => scaleY((d.maleQuantity * 100) / (d.maleQuantity + d.femaleQuantity)))
      .curve(curveLinear)(winterOlympicsData);
  }, [winterOlympicsData, scaleX, scaleY]);

  const areaTrend = React.useMemo(() => {
    return line()
      .x((d) => scaleX(d.year))
      .y((d) => scaleY((d.y * 100) / (d.maleQuantity + d.femaleQuantity)))
      .curve(curveLinear)([
      ...winterOlympicsData
        .map((row) => ({ ...row, y: row.femaleQuantity }))
        .sort((a, b) => a.year - b.year),
      ...winterOlympicsData
        .map((row) => ({ ...row, y: row.maleQuantity }))
        .sort((a, b) => b.year - a.year)
    ]);
  }, [winterOlympicsData, scaleX, scaleY]);

  const xLabelUnit = React.useMemo(() => {
    return scaleX(xLabels[1]) - scaleX(xLabels[0]);
  }, [scaleX, xLabels]);

  const handleTooltip = React.useCallback(
    (year) => {
      return (e) => {
        const data = winterOlympicsData.find((row) => row.year === year);
        setTooltipData({
          x: scaleX(data.year),
          yMale: scaleY((data.maleQuantity * 100) / (data.maleQuantity + data.femaleQuantity)),
          yFemale: scaleY((data.femaleQuantity * 100) / (data.maleQuantity + data.femaleQuantity)),
          data
        });
      };
    },
    [winterOlympicsData]
  );

  const handleTooltipLeave = React.useCallback(() => {
    setTooltipData(null);
  }, []);

  return (
    <svg viewBox="0 130 1204 700" overflow="visible">
      <path fill="#fffbf0" d="M0 0H1203.16V975.56H0z" opacity="0.1"></path>

      <path stroke="#000" strokeMiterlimit="10" d="M96.13 149.17L96.13 811.14"></path>
      <path stroke="#000" strokeMiterlimit="10" d="M1101.03 797.89L77.68 797.89"></path>
      <text
        fontFamily="SourceSansPro-Regular, Source Sans Pro"
        fontSize="14"
        transform="rotate(-90 276.445 229.335)">
        participants
      </text>
      <g>
        {yLabels.map((label) => (
          <g>
            <text
              fontFamily="OpenSans-Regular, Open Sans"
              fontSize="11"
              transform={`translate(60 ${scaleY(label)})`}
              dy={4}>
              {label}%
            </text>
            <path
              stroke="#000"
              strokeMiterlimit="10"
              d={`M90.87 ${scaleY(label)}L101.13 ${scaleY(label)}`}></path>
          </g>
        ))}
      </g>
      <g>
        {yLabels.map((label) => (
          <path
            fill="none"
            stroke="#d3d3d3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.5"
            d={`M90.87 ${scaleY(label)}L1073.03 ${scaleY(label)}`}
          />
        ))}
      </g>
      <g>
        {xLabels?.map((label) => (
          <g>
            <text
              key={label}
              fontFamily="OpenSans-Regular, Open Sans"
              fontSize="12"
              transform={`translate(${scaleX(label)} 816.82)`}
              textAnchor="middle">
              {label}
            </text>
            <path
              fill="none"
              stroke="#000"
              strokeMiterlimit="10"
              d={`M${scaleX(label)} 792.64L${scaleX(label)} 802.9`}></path>
          </g>
        ))}
      </g>

      <path fill="#f9f3e5" d={areaTrend} opacity="0.5" />
      <path
        fill="none"
        stroke="#e8ac2a"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d={maleTrend}></path>
      <path
        fill="none"
        stroke="#71b6c6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d={femaleTrend}></path>

      {tooltipData && <WinterOlympicsTooltip {...tooltipData}></WinterOlympicsTooltip>}

      {xLabels.map((label) => (
        <rect
          x={scaleX(label) - xLabelUnit / 2}
          y={150}
          height={700}
          width={xLabelUnit}
          fill={"transparent"}
          onMouseEnter={handleTooltip(label)}
          onMouseLeave={handleTooltipLeave}
        />
      ))}
    </svg>
  );
};

export default WinterOlympicsVis;
