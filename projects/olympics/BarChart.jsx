import React from "react";
import PropTypes from "prop-types";
import { scaleLinear } from "d3-scale";
import { motion, useAnimation } from "framer-motion";
import { generateBigHex } from "../map-vis/Hexes/generateHexes";
import { toPathString } from "flubber";

const LABELS = [0, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500];

const HEX_PATH_STRING = toPathString(generateBigHex({ size: 2, center: [0, 0] }));
const MARGIN = { LEFT: 143.8 };

const BAR_HEIGHT = 12;

export const Bar = ({ y, width, color }) => {
  const controls = useAnimation();
  const oldWidth = React.useRef(width);
  const oldY = React.useRef(y);

  React.useEffect(() => {
    controls.start({
      y: y,
      transition: { duration: 0.75 },
      width,
      fill: color
    });
    oldWidth.current = width;
    oldY.current = y;
  }, [y, width, color]);
  return (
    <motion.rect
      initial={{ y, width, color }}
      animate={controls}
      style={{ transition: "all ease-in" }}
      d={HEX_PATH_STRING}
      fill={color}></motion.rect>
  );
};

Bar.propTypes = {
  y: PropTypes.number,
  color: PropTypes.string,
  width: PropTypes.number
};

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
        transform="translate(0 17)">
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
                  <motion.rect
                    key={`bar-group-${row.name}-${idx}-${barIdx}-${val.property}`}
                    width={xScale(row[val.property]) / 6}
                    height={BAR_HEIGHT}
                    x={(MARGIN.LEFT + xScale(previousPercentage) / 6)}
                    y={LABELS[idx] / 10 + (barIdx * BAR_HEIGHT) + (17 / 2)} // it is actually the width but horizontal...
                    fill={val.color}
                    animate={{
                      x: previousPercentage > 0 ? [-xScale(previousPercentage), 0] : 0,
                      width: [0, xScale(row[val.property]) / 6]
                    }}
                    transition={{ duration: 0.5 }}
                  />
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
