import React from "react";
import PropTypes from "prop-types";
import { scaleLinear } from "d3-scale";
import { motion, useAnimation } from "framer-motion";
import { generateBigHex } from "./Hexes/generateHexes";
import { toPathString } from "flubber";
import { generateLegendMapping } from "./utils";

const LABELS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

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
      <span>{title}</span>
      <br />
      {data.map((row) => {
        return (
          <React.Fragment key={row.name}>
            <span>
              <svg viewBox="0 0 20 20" width="15" height="15">
                <circle cx="10" cy="10" r="8" fill={row.color} />
              </svg>{" "}
              <span style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{row.name}</span>
                {!!row.value && <span>{(row.value * 100).toFixed(2)} %</span>}
              </span>
            </span>
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

  console.log(colorScale.values, colorScale.ticks());

  return (
    <div>
      <svg className="main-chart-taxes" viewBox="0 0 300 300">
        {data.map((state) => {
          return (
            <ScatterHex
              key={`scatter-hex-${state.code}`}
              x={xScale(state.x)}
              y={300 - yScale(state.y)}
              color={colorScale(state.z)}></ScatterHex>
          );
        })}
        <text
          transform="translate(0 0)"
          fontSize="4"
          fontFamily="SourceSansPro-Regular, Source Sans Pro">
          {LABELS.map((label) => {
            return (
              <React.Fragment key={label}>
                <tspan x="20" y={300 - yScale(label)}>
                  {label}
                </tspan>{" "}
              </React.Fragment>
            );
          })}
        </text>
        <text
          transform="translate(0 280)"
          fontSize="4"
          fontFamily="SourceSansPro-Regular, Source Sans Pro">
          {LABELS.map((label) => {
            return (
              <React.Fragment key={label}>
                <tspan x={xScale(label)} y="0">
                  {label}
                </tspan>{" "}
              </React.Fragment>
            );
          })}
        </text>
        <line
          x1={xScale(linearRegression.x1)}
          y1={300 - yScale(linearRegression.y1)}
          x2={xScale(linearRegression.x2)}
          y2={300 - yScale(linearRegression.y2)}
          fill="none"
          stroke="#ff5b3a"
          strokeMiterlimit="10"
        />
        <text
          transform="translate(108.9 300)"
          fontSize="6"
          fontFamily="SourceSansPro-SemiBold, Source Sans Pro"
          fontWeight="600">
          {xTitle}
        </text>
        <text
          transform="rotate(-90 42.01 35.37)"
          fontSize="6"
          fontFamily="SourceSansPro-SemiBold, Source Sans Pro"
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
