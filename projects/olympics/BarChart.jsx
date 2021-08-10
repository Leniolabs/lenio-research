import React from "react";
import PropTypes from "prop-types";
import { scaleLinear } from "d3-scale";
import { AnimatePresence, motion } from "framer-motion";
import usePrevious from "utils/usePrevious";

const LABELS = [0, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500];
const MARGIN = { LEFT: 143.8 };

const BAR_HEIGHT = 12;
const MAX_Y = 320;

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

export const BarChart = ({ yTitle = "COUNTRY", data, values }) => {
  const xScale = React.useMemo(() => {
    return scaleLinear().domain([0, 100]).range([0, 100]);
  });

  const legendData = React.useMemo(() => {
    return values.flat();
  }, [values]);

  const oldData = usePrevious(data);

  return (
    <motion.svg
      className="millennials"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 585.8 354.9">
      <AnimatePresence>
        <rect width="430" height="295" x="144.1" fill="#fffefa" />
        {data.map((d, idx) => {
          return (
            <motion.text
              key={`label_${d.country}`}
              fill="#2a3f55"
              fontFamily="'Source Sans Pro'"
              fontSize="13"
              textAnchor="end"
              x={130}
              initial={{
                y: MAX_Y
              }}
              animate={{
                y: idx * 25 + 20
              }}
              exit={{
                y: MAX_Y
              }}
              transition={{ duration: 1 }}>
              {d.country}
            </motion.text>
          );
        })}
        {data.map((row, idx) => {
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

                  return (
                    <>
                      <motion.rect
                        key={`bar-group-${row.country}-${barIdx}-${val.property}`}
                        width={xScale(row[val.property]) / 6}
                        height={BAR_HEIGHT}
                        fill={val.color}
                        opacity={val.property === "acc_silver" ? 0.8 : 0.4}
                        initial={{
                          x: MARGIN.LEFT,
                          y: MAX_Y
                        }}
                        exit={{
                          y: MAX_Y
                        }}
                        animate={{
                          x:
                            previousPercentage > 0
                              ? [
                                  MARGIN.LEFT + initialX,
                                  MARGIN.LEFT + xScale(previousPercentage) / 6
                                ]
                              : MARGIN.LEFT,
                          width: [initialWidth, xScale(row[val.property]) / 6],
                          y: LABELS[idx] / 10 + barIdx * BAR_HEIGHT + 17 / 2
                        }}
                        transition={{ duration: 1 }}
                      />
                      {/* We should use clip-path but I couldn't */}
                      {xScale(row[val.property]) - xScale(previousPercentage) / 6 > 90 && (
                        <motion.text
                          fill="#2a3f55"
                          fontFamily="'Source Sans Pro'"
                          fontSize="8"
                          fontWeight="600"
                          letterSpacing="0em"
                          width={xScale(row[val.property]) / 6}
                          height={BAR_HEIGHT}
                          initial={{
                            x: MARGIN.LEFT + xScale(previousPercentage) / 6 + 2,
                            y:
                              oldValuesIdx > -1
                                ? LABELS[oldValuesIdx] / 10 + barIdx * BAR_HEIGHT + 17 / 2 + 8.5
                                : MAX_Y
                          }}
                          animate={{
                            x: MARGIN.LEFT + xScale(previousPercentage) / 6 + 2,
                            y: LABELS[idx] / 10 + barIdx * BAR_HEIGHT + 17 / 2 + 8.5
                          }}
                          exit={{
                            y: MAX_Y
                          }}
                          transition={{ duration: 1 }}>
                          {row[val.property]}
                        </motion.text>
                      )}
                    </>
                  );
                });
              })}
            </g>
          );
        })}
      </AnimatePresence>
      <rect x={0} width={600} y={298} fill={"white"} height={200}></rect>
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
