import React from "react";
import PropTypes from "prop-types";
import { scaleLinear } from "d3-scale";
import { AnimatePresence, motion } from "framer-motion";
import usePrevious from "utils/usePrevious";
import { getCountryCode } from "./utils";

const LABELS = [0, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500];
const MARGIN = { LEFT: 143.8 };

const BAR_HEIGHT = 12;
const MAX_Y = 320;
const DURATION = 1;

const BarLegend = ({ data }) => {
  return (
    <g>
      {data.map((d, idx) => {
        return (
          <g key={`label-${data.country}-${idx}`}>
            <circle r={5} cx={130 + idx * 150} cy={6} fill={d.color} opacity={0.4} />
            <text
              fill="#2a3f55"
              fontSize="10"
              fontWeight="600"
              transform={`translate(${0 + (idx + 1) * 148} 10)`}>
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

export const BarChart = ({ yTitle = "COUNTRY", data, values }) => {
  const xScale = React.useMemo(() => {
    return scaleLinear().domain([0, 100]).range([0, 100]);
  });

  const legendData = React.useMemo(() => {
    return values.flat();
  }, [values]);

  const oldData = usePrevious(data);

  return (
    <>
      <motion.svg className="millennials" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 20">
        <BarLegend data={legendData} />
      </motion.svg>
      <motion.svg className="millennials" xmlns="http://www.w3.org/2000/svg" viewBox="40 0 600 340">
        <AnimatePresence>
          {data.map((d, idx) => {
            let olympicsFlag = false;
            if (d.country === "ZZX") {
              olympicsFlag = true;
            }
            const flagCode = getCountryCode(d.country);
            return (
              <motion.g
                key={`label_${d.country}`}
                initial={{
                  y: MAX_Y
                }}
                animate={{
                  y: idx * 25 + 20
                }}
                exit={{
                  y: MAX_Y
                }}
                transition={{ duration: DURATION }}>
                {flagCode && (
                  <motion.image
                    href={`/static/olympics/flags/${flagCode.toLowerCase()}.svg`}
                    height="16"
                    x="80"
                    y={-12}
                  />
                )}
                {olympicsFlag && (
                  <motion.image
                    href="/static/olympics/flag-olympics.svg"
                    height="16"
                    x="80"
                    y={-12}
                  />
                )}
                <motion.text
                  fill="#2a3f55"
                  fontFamily="'Source Sans Pro'"
                  fontSize="13"
                  textAnchor="end"
                  x={130}>
                  {d.country}
                </motion.text>
              </motion.g>
            );
          })}
          {data.map((row) => {
            return (
              <g key={`bar-group-${row.country}`}>
                {values.map((arr, barIdx) => {
                  return arr.map((val, groupIdx, array) => {
                    let initialX = 0;
                    let initialWidth = 0;
                    let oldValuesIdx = -1;
                    if (oldData !== undefined) {
                      oldValuesIdx = oldData.findIndex((r) => r.country === row.country);
                      if (oldValuesIdx > -1) {
                        const oldValues = oldData[oldValuesIdx];
                        initialX =
                          xScale(
                            array
                              .slice(0, groupIdx)
                              .map((prevs) => oldValues[prevs.property])
                              .reduce((a, b) => a + b, 0)
                          ) / 6;
                        initialWidth = xScale(oldValues[val.property]) / 6;
                      }
                    }
                    const previousPercentage = array
                      .slice(0, groupIdx)
                      .map((prevs) => row[prevs.property])
                      .reduce((a, b) => a + b, 0);
                    const xScalePreviousPercent = xScale(previousPercentage) / 6;
                    const xAnimation =
                      previousPercentage > 0
                        ? [MARGIN.LEFT + initialX, MARGIN.LEFT + xScalePreviousPercent]
                        : MARGIN.LEFT;
                    const xScaleRowValProperty = xScale(row[val.property]);
                    const widthMotion = xScaleRowValProperty / 6;
                    const widthAnimation = [initialWidth, widthMotion];
                    return (
                      <motion.g
                        key={`bar-group-${row.country}-${barIdx}-${val.property}`}
                        initial={{
                          y: MAX_Y
                        }}
                        exit={{
                          y: MAX_Y
                        }}
                        animate={{
                          y: row.yPosition
                        }}
                        transition={{ duration: DURATION }}>
                        <motion.rect
                          key={`bar-group-${row.country}-${barIdx}-${val.property}`}
                          width={widthMotion}
                          height={BAR_HEIGHT}
                          fill={val.color}
                          opacity={val.property === "acc_silver" ? 0.8 : 0.4}
                          initial={{
                            x: MARGIN.LEFT
                          }}
                          animate={{
                            x: xAnimation,
                            width: widthAnimation
                          }}
                          transition={{ duration: DURATION }}
                        />
                        <clipPath id={`clip-bar-group-${row.country}-${barIdx}-${val.property}`}>
                          <motion.rect
                            key={`bar-group-${row.country}-${barIdx}-${val.property}`}
                            width={widthMotion}
                            height={BAR_HEIGHT}
                            fill={val.color}
                            initial={{
                              x: MARGIN.LEFT
                            }}
                            animate={{
                              x: xAnimation,
                              width: widthAnimation
                            }}
                            transition={{ duration: DURATION }}
                          />
                        </clipPath>
                        {xScaleRowValProperty - xScalePreviousPercent > 90 && (
                          <g
                            clipPath={`url(#clip-bar-group-${row.country}-${barIdx}-${val.property})`}>
                            <motion.text
                              fill="#2a3f55"
                              fontSize="8"
                              fontWeight="600"
                              letterSpacing="0em"
                              width={widthMotion}
                              height={BAR_HEIGHT}
                              y={8.5}
                              initial={{
                                x: MARGIN.LEFT + initialX + 2
                              }}
                              animate={{
                                x: MARGIN.LEFT + xScalePreviousPercent + 2
                              }}
                              transition={{ duration: DURATION }}>
                              {row[val.property]}
                            </motion.text>
                          </g>
                        )}
                      </motion.g>
                    );
                  });
                })}
              </g>
            );
          })}
        </AnimatePresence>
        <rect x={0} width={600} y={298} fill={"white"} height={200} />
        <text
          fill="#2a3f55"
          fontSize="15"
          fontWeight="600"
          letterSpacing="0em"
          transform="rotate(-90 110 50)">
          {yTitle}
        </text>
        {LABELS.map((v) => {
          return (
            <g key={`line-${v}`}>
              <text
                fill="#2a3f55"
                fontSize="13"
                transform={`translate(${MARGIN.LEFT + xScale(v) / 6} 312.8)`}
                textAnchor="middle">
                {v}
              </text>
              {v !== 0 && (
                <line
                  x1={MARGIN.LEFT + xScale(v) / 6}
                  x2={MARGIN.LEFT + xScale(v) / 6}
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
    </>
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
