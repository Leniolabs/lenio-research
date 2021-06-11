import React from "react";
import PropTypes from "prop-types";
import { scaleLinear } from "d3-scale";
import { motion, useAnimation } from "framer-motion";
import { generateBigHex } from "./Hexes/generateHexes";
import { toPathString } from "flubber";

const LABELS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

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
          <g key={`label-${data.name}-${idx}`}>
            <rect width="14" height="14" x={140 + idx * 150} y="338" fill={d.color} />
            <text
              fill="#2a3f55"
              fontFamily="'Source Sans Pro'"
              fontSize="13"
              fontWeight="600"
              transform={`translate(${6 + (idx + 1) * 152} 350)`}>
              {d.label}
            </text>
          </g>
        );
      })}
    </g>
  );
};

BarLegend.propTypes = {
  title: PropTypes.string,
  data: PropTypes.any
};

export const BarChart = ({
  yTitle = "STATE",
  data,
  values = [
    [{ property: "Job_out", color: "#ffdfaa", label: "% of Job Out" }],
    [
      { property: "Age_18_to_34_out", color: "#55bfaa", label: "% of Age 18 to 34" },
      { property: "Age_35_to_44_out", color: "#ff3f55", label: "% of Age 35 to 44" }
    ]
  ]
}) => {
  const xScale = React.useMemo(() => {
    return scaleLinear().domain([0, 100]).range([0, 430]);
  });

  const legendData = React.useMemo(() => {
    return values.flat();
  }, [values]);

  return (
    <svg className="millennials" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 585.8 354.9">
      <rect width="430" height="295" x="144.1" fill="#fffefa" />
      <text
        fill="#2a3f55"
        fontFamily="'Source Sans Pro'"
        fontSize="13"
        textAnchor="end"
        transform="translate(0 17)">
        {LABELS.map((d, idx) => {
          return (
            <tspan key={`label_${data[idx].name}`} x={130} y={d * 3}>
              {data[idx].name}
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
                  <rect
                    key={`bar-group-${row.name}-${barIdx}-${val.property}`}
                    width={xScale(row[val.property])}
                    height={BAR_HEIGHT}
                    x={MARGIN.LEFT + xScale(previousPercentage)}
                    y={LABELS[idx] * 3 + barIdx * BAR_HEIGHT} // it is actually the width but horizontal...
                    fill={val.color}
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
      {[0, 20, 40, 60, 80, 100].map((v) => {
        return (
          <g key={`line-${v}`}>
            <text
              fill="#2a3f55"
              fontFamily="'Source Sans Pro'"
              fontSize="13"
              transform={`translate(${MARGIN.LEFT + xScale(v)} 312.8)`}
              textAnchor="middle">
              {v}
            </text>
            {v !== 0 && v !== 100 && (
              <line
                x1={MARGIN.LEFT + xScale(v)}
                x2={MARGIN.LEFT + xScale(v)}
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
    </svg>
  );
};

BarChart.propTypes = {
  xTitle: PropTypes.string,
  yTitle: PropTypes.string,
  colorTitle: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.any),
  values: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  colors: PropTypes.object
};
