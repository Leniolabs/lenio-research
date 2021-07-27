import React from "react";
import PropTypes from "prop-types";
import { scaleLinear } from "d3-scale";
import { motion } from "framer-motion";

const LABELS = [0, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500];
const MARGIN = { LEFT: 143.8 };

const BAR_HEIGHT = 12;


const BarLegend = ({ data }) => {
  return (
    <g>
      {data.map((d, idx) => {
        return (
          <g key={`label-${data.country}-${idx}`}>
            <rect width="12" height="12" x={130 + idx * 150} y="340" fill={d.color} />
            <text
              fill="#2a3f55"
              fontSize="10"
              fontWeight="600"
              transform={`translate(${0 + (idx + 1) * 148} 350)`}>
              {d.label}
            </text>
          </g>
        );
      })}
    </g>
  );
};

BarLegend.propTypes = {
  data: PropTypes.any
};

export const BarChart = ({
  yTitle = "COUNTRY",
  data,
  values
}) => {
  const xScale = React.useMemo(() => {
    return scaleLinear().domain([0, 100]).range([0, 100]);
  });

  const legendData = React.useMemo(() => {
    return values.flat();
  }, [values]);

  return (
    <motion.svg
      className="millennials"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 585.8 354.9">
      <rect width="430" height="295" x="144.1" fill="#fffefa" />
      <text
        fill="#2a3f55"
        fontFamily="'Source Sans Pro'"
        fontSize="13"
        textAnchor="end"
        transform="translate(0 20)">
        {LABELS.map((d, idx) => {
          return (
            <tspan key={`label_${data[idx].country}`} x={130} y={d / 10}>
              {data[idx].country}
            </tspan>
          );
        })}
      </text>
      {data.map((row, idx) => {
        return (
          <g key={`bar-group-${row.name}`}>
            {values.map((arr, barIdx) => {
              return arr.map((val, groupIdx, array) => {
                const previousPercentage = array
                  .slice(0, groupIdx)
                  .map((prevs) => row[prevs.property])
                  .reduce((a, b) => a + b, 0);
                return (
                  <>
                    <motion.rect
                      key={`bar-group-${row.code}-${idx}-${barIdx}-${val.property}`}
                      width={(xScale(row[val.property]) / 6)}
                      height={BAR_HEIGHT}
                      x={(MARGIN.LEFT + xScale(previousPercentage) / 6)}
                      y={LABELS[idx] / 10 + (barIdx * BAR_HEIGHT) + (17 / 2)} // it is actually the width but horizontal...
                      fill={val.color}
                      animate={{
                        x: previousPercentage > 0 ? [-(xScale(previousPercentage) / 6), 0] : 0,
                        width: [0, (xScale(row[val.property]) / 6)]
                      }}
                      transition={{ duration: 1 }}
                    />
                      <text
                        fill="#2a3f55"
                        fontFamily="'Source Sans Pro'"
                        fontSize="8"
                        fontWeight="600"
                        letterSpacing="0em"
                        width={(xScale(row[val.property]) / 6)}
                        height={BAR_HEIGHT}
                        x={(MARGIN.LEFT + xScale(previousPercentage) / 6)}
                        y={LABELS[idx] / 10 + (barIdx * BAR_HEIGHT) + (17 / 2)}
                        transform={`translate(2 8.5)`}
                      >
                        {row[val.property]}</text>
                  </>
                );
              });
            })}
          </g>
        );
      })}
      <BarLegend data={legendData} />
      <text
        fill="#2a3f55"
        fontFamily="'Source Sans Pro'"
        fontSize="15"
        fontWeight="600"
        letterSpacing="0em"
        transform="rotate(-90 92.3 79.8)">
        {yTitle}
      </text>
      {LABELS.map((v) => {
        return (
          <g key={`line-${v}`}>
            <text
              fill="#2a3f55"
              fontFamily="'Source Sans Pro'"
              fontSize="13"
              transform={`translate(${(MARGIN.LEFT + xScale(v) / 6)} 312.8)`}
              textAnchor="middle">
              {v}
            </text>
            {v !== 0 && (
              <line
                x1={(MARGIN.LEFT + xScale(v) / 6)}
                x2={(MARGIN.LEFT + xScale(v) / 6)}
                y2="298.4"
                fill="none"
                stroke="#2a3f55"
                strokeWidth=".3"
                strokeDasharray="2 2"
              />
            )}
          </g>
        );
      })}
    </motion.svg>
  );
};

BarChart.propTypes = {
  xTitle: PropTypes.string,
  yTitle: PropTypes.string,
  colorTitle: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.any),
  values: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        label: PropTypes.string,
        property: PropTypes.string
      })
    )
  ),
  colors: PropTypes.object
};
