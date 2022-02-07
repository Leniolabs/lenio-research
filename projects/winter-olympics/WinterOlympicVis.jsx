/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTracking } from "analytics/context";
import { winterOlympicsData } from "./winterOlympicsData";
import { scaleLinear, scalePow } from "d3-scale";
import { curveLinear, line } from "d3-shape";

const TOOLTIP_WIDTH = 380;
const TOOLTIP_HEIGHT = 110;
const CIRCLE_SIZE = 24;
const GIF_DURATION_MS = 18600;

const WinterOlympicsTooltip = ({ x, y, name, countryCode, record }) => {
  const actualX = x - TOOLTIP_WIDTH / 2;
  const actualY = y - TOOLTIP_HEIGHT - CIRCLE_SIZE;
  return (
    <g transform={`translate(${actualX} ${actualY})`}>
      <path
        fill="#F8F3E6"
        stroke="#2B4055"
        strokeMiterlimit="10"
        d={`M0,0h${TOOLTIP_WIDTH}v${TOOLTIP_HEIGHT}h-${TOOLTIP_WIDTH / 2 - 10}l-10 10l-10 -10h-${
          TOOLTIP_WIDTH / 2 - 10
        }z`}
      />
      <text
        transform="translate(15.32 46.385)"
        fill="#2B4055"
        fontFamily="'Source Sans Pro'"
        fontSize="48">
        {record.toFixed(2)}
      </text>
      <text
        transform="translate(15.32 88.802)"
        fill="#2B4055"
        fontFamily="'Source Sans Pro'"
        fontSize="36">
        {name}
      </text>
      <g stroke="#2B4055" strokeMiterlimit="10">
        <image
          href={`https://www.countryflags.io/${countryCode}/flat/64.png`}
          height="48"
          x="315"
          y="7"
        />
      </g>
    </g>
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
      .y((d) => scaleY(d.y * 100 / (d.maleQuantity + d.femaleQuantity)))
      .curve(curveLinear)([
      ...winterOlympicsData
        .map((row) => ({ ...row, y: row.femaleQuantity }))
        .sort((a, b) => a.year - b.year),
      ...winterOlympicsData
        .map((row) => ({ ...row, y: row.maleQuantity }))
        .sort((a, b) => b.year - a.year)
    ]);
  }, [winterOlympicsData, scaleX, scaleY]);

  console.log([]);

  return (
    <svg viewBox="0 130 1204 700">
      <path fill="#fffbf0" d="M0 0H1203.16V975.56H0z" opacity="0.1"></path>

      <path stroke="#000" strokeMiterlimit="10" d="M96.13 149.17L96.13 811.14"></path>
      <path stroke="#000" strokeMiterlimit="10" d="M1101.03 797.89L77.68 797.89"></path>
      <text
        fontFamily="SourceSansPro-Regular, Source Sans Pro"
        fontSize="14"
        letterSpacing="-.01em"
        transform="rotate(-90 276.445 229.335)">
        p
        <tspan x="7.57" y="0" letterSpacing="0em">
          artici
        </tspan>
        <tspan x="37.49" y="0">
          p
        </tspan>
        <tspan x="45.07" y="0" letterSpacing="0em">
          an
        </tspan>
        <tspan x="59.78" y="0">
          t
        </tspan>
        <tspan x="64.37" y="0" letterSpacing="0em">
          s
        </tspan>
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

      <text
        fill="#595a5a"
        fontFamily="SourceSansPro-Regular, Source Sans Pro"
        fontSize="18"
        transform="translate(1092.09 446.36)">
        Men
      </text>
      <text
        fill="#595a5a"
        fontFamily="SourceSansPro-Regular, Source Sans Pro"
        fontSize="18"
        transform="translate(1085.34 509.99)">
        Women
      </text>

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

      <circle cx="1072.78" cy="440.33" r="6.03" fill="#e8ac2a"></circle>
      <circle cx="1072.78" cy="503.96" r="6.03" fill="#71b6c6"></circle>

      {tooltipData && <WinterOlympicsTooltip {...tooltipData}></WinterOlympicsTooltip>}
    </svg>
  );
};

export default WinterOlympicsVis;
