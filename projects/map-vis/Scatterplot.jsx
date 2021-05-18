import React from "react";
import PropTypes from "prop-types";
import { scaleLinear } from "d3-scale";
import { motion, useAnimation } from "framer-motion";
import { generateBigHex } from "./Hexes/generateHexes";
import { toPathString } from "flubber";
import { generateLegendMapping } from "./utils";

const LABELS = [0, 10, 20, 30, 40, 50, 60];

const HEX_PATH_STRING = toPathString(generateBigHex({ size: 2, center: [0, 0] }));

export const ScatterHex = ({ x, y, color }) => {
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
                <circle cx="10" cy="10" r="8" fill={row.color} />
              </svg>{" "}
              <span className="legend-data">
                <span className="legend-name">{row.name}</span>
                <span className="legend-number">
                  {!!row.value && <span>{(row.value * 100).toFixed(2)} %</span>}
                </span>%
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

export const Scatterplot = ({
  xTitle,
  yTitle,
  colorTitle,
  data,
  linearRegression = { x1: 0, y1: 0, x2: 50, y2: 50 }
}) => {
  const xScale = React.useMemo(() => {
    return scaleLinear().domain([0, 100]).range([20, 300]);
  });
  const yScale = React.useMemo(() => {
    return scaleLinear().domain([0, 100]).range([20, 300]);
  });
  const colorScale = React.useMemo(() => {
    const mmin = Math.min(...data.map((d) => d.z));
    const mmax = Math.max(...data.map((d) => d.z));
    return scaleLinear().domain([mmin, mmax]).range(["#F2F858", "#9a3391", "#081281"]);
  }, [data]);

  return (
    <div className="chart-grid">
      <svg className="main-chart-taxes" viewBox="0 100 250 200" overflow="visible">
        {data.map((state) => {
          return (
            <ScatterHex
              key={`scatter-hex-${state.code}`}
              x={xScale(state.x)}
              y={300 - yScale(state.y)}
              color={colorScale(state.z)}></ScatterHex>
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
                <tspan x="16" y={300 - yScale(label)}>
                  {label}
                </tspan>{" "}%
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
                </tspan>{" "}%
              </React.Fragment>
            );
          })}
        </text>
        <motion.line
          animate={{
            x1: xScale(linearRegression.x1),
            y1: 300 - yScale(linearRegression.y1),
            x2: xScale(linearRegression.x2),
            y2: 300 - yScale(linearRegression.y2)
          }}
          transition={{
            duration: 0.75
          }}
          fill="none"
          stroke="#ff5b3a"
          strokeMiterlimit="10"
        />
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
