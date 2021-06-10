import React from "react";
import PropTypes from "prop-types";
import { scaleLinear } from "d3-scale";
import { motion, useAnimation } from "framer-motion";
import { generateBigHex } from "./Hexes/generateHexes";
import { toPathString } from "flubber";
import { generateLegendMapping } from "./utils";

const LABELS = [0, 10, 20, 30, 40, 50, 60, 70, 80];

const HEX_PATH_STRING = toPathString(generateBigHex({ size: 2, center: [0, 0] }));
const HEX_LEGEND_PATH_STRING = toPathString(generateBigHex({ size: 10, center: [0, 0] }));

const MARGIN = { BOTTOM: 0, LEFT: 20 };
const HEIGHT = 290;

export const ScatterHex = ({ x, y, color, onMouseEnter, onMouseOut }) => {
  const controls = useAnimation();
  const oldX = React.useRef(x);
  const oldY = React.useRef(y);

  React.useEffect(() => {
    controls.start({
      x: x,
      y: y,
      transition: { duration: 0.75 },
      fill: color
    });
    oldX.current = x;
    oldY.current = y;
  }, [x, y, color]);
  return (
    <motion.path
      initial={{ x, y }}
      animate={controls}
      onMouseEnter={onMouseEnter}
      onMouseOut={onMouseOut}
      style={{ transition: "all ease-in" }}
      d={HEX_PATH_STRING}
      fill={color}></motion.path>
  );
};

ScatterHex.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  color: PropTypes.string
};

const ScatterLegend = ({ title, data }) => {
  return (
    <p className="legends">
      <h3>{title}</h3>
      {data.map((row) => {
        return (
          <React.Fragment key={row.name}>
            <div className="legend-row">
              <svg viewBox="0 0 20 20" width="15" height="15">
                <path
                  transform="translate(10, 10)"
                  d={HEX_LEGEND_PATH_STRING}
                  fill={row.color}></path>
              </svg>{" "}
              <span className="legend-data">
                <span className="legend-name">{row.name}</span>
                <span className="legend-number">
                  {!!row.value && <span>{(row.value * 100).toFixed(2)} %</span>}
                </span>
                %
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </p>
  );
};

ScatterLegend.propTypes = {
  title: PropTypes.string,
  data: PropTypes.any
};

const Tooltip = ({ tooltip }) => {
  const { x, y, value, xTitle, yTitle } = tooltip;
  return (
    <g transform={`translate(${x}, ${y})`} key={`scatter-hex-${value.code}`} className="tooltip">
      <rect transform={`translate(${0}, ${0})`} fill="#FFFBF0" width="100" height="33" rx="1" />
      <text fill="#45486D" transform={`translate(${5}, ${8})`} font-size="7">
        {value.state}
      </text>
      <text fill="#45486D" transform={`translate(${5}, ${15})`} font-size="5">
        {`${xTitle}: ${value.x} %`}
      </text>
      <text fill="#45486D" transform={`translate(${5}, ${21})`} font-size="5">
      {`${yTitle}: ${value.y} %`}
      </text>
      <text fill="#45486D" transform={`translate(${5}, ${27})`} font-size="5">
      {`Combined Sales Tax Rate: ${value.z} %`}
      </text>
    </g>
  );
};

Tooltip.propTypes = {
  tooltip: PropTypes.object
};

export const Scatterplot = ({
  xTitle,
  yTitle,
  colorTitle,
  data,
  linearRegression = { x1: 0, y1: 0, x2: 50, y2: 50 }
}) => {
  const xScale = React.useMemo(() => {
    return scaleLinear().domain([0, 100]).range([MARGIN.LEFT, 230]);
  });
  const yScale = React.useMemo(() => {
    return scaleLinear().domain([0, 100]).range([MARGIN.BOTTOM, 230]);
  });
  const colorScale = React.useMemo(() => {
    const mmin = Math.min(...data.map((d) => d.z));
    const mmax = Math.max(...data.map((d) => d.z));
    return scaleLinear()
      .domain([mmin, mmin + mmax / 2, mmax])
      .range(["#FF7B06", "#FFF4E0", "#077984"]);
  }, [data]);
  const [tooltip, setTooltip] = React.useState(false);

  return (
    <div className="chart-grid">
      <svg className="main-chart-taxes" viewBox="0 100 250 200" overflow="visible">
        {data.map((state) => {
          return (
            <>
              <ScatterHex
                key={`scatter-hex-${state.code}`}
                x={xScale(state.x)}
                y={HEIGHT - yScale(state.y)}
                onMouseEnter={() => setTooltip({x: xScale(state.x), y: HEIGHT - yScale(state.y), value: state})}
                onMouseOut={() => setTooltip(false)}
                color={colorScale(state.z)}></ScatterHex>
            </>
          );
        })}
        <line
          x1="14"
          y1="293"
          x2="210"
          y2="293"
          fill="none"
          stroke="#e1e1e1"
          strokeWidth=".3"></line>
        <line
          x1="18"
          y1="100"
          x2="18"
          y2="297"
          fill="none"
          stroke="#e1e1e1"
          strokeWidth=".3"></line>
        <text transform="translate(-8 0)" fontSize="4" fontFamily="'Source Sans Pro',sans-serif">
          {LABELS.map((label) => {
            return (
              <React.Fragment key={label}>
                <tspan x="16" y={HEIGHT - yScale(label)}>
                  {label}
                </tspan>{" "}
                %
              </React.Fragment>
            );
          })}
        </text>
        <text transform="translate(0 298)" fontSize="4" fontFamily="'Source Sans Pro',sans-serif">
          {LABELS.map((label) => {
            return (
              <React.Fragment key={label}>
                <tspan x={xScale(label)} y="0">
                  {label}
                </tspan>{" "}
                %
              </React.Fragment>
            );
          })}
        </text>
        <motion.line
          animate={{
            x1: xScale(linearRegression.x1),
            y1: HEIGHT - yScale(linearRegression.y1),
            x2: xScale(linearRegression.x2),
            y2: HEIGHT - yScale(linearRegression.y2)
          }}
          transition={{
            duration: 0.75
          }}
          fill="none"
          stroke="#ff5b3a"
          strokeMiterlimit="10"
        />
        {tooltip && <Tooltip tooltip={{ ...tooltip, xTitle: xTitle, yTitle: yTitle}} />}
        <text
          transform="translate(90 308)"
          fontSize="6"
          fontFamily="'Source Sans Pro',sans-serif"
          fontWeight="600">
          {xTitle}
        </text>
        <text
          transform="rotate(-90 116 112)"
          fontSize="6"
          fontFamily="'Source Sans Pro',sans-serif"
          fontWeight="600">
          {yTitle}
        </text>
      </svg>
      <ScatterLegend
        title={colorTitle}
        data={generateLegendMapping(
          colorScale.ticks(),
          undefined,
          colorScale.ticks().map((t) => colorScale(t))
        )}></ScatterLegend>
    </div>
  );
};

Scatterplot.propTypes = {
  xTitle: PropTypes.string,
  yTitle: PropTypes.string,
  colorTitle: PropTypes.string,
  data: PropTypes.any,
  linearRegression: PropTypes.shape({
    x1: PropTypes.number,
    x2: PropTypes.number,
    y1: PropTypes.number,
    y2: PropTypes.number
  })
};
