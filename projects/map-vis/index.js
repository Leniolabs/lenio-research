/* eslint-disable no-unused-vars */
import * as React from "react";
import Link from "next/link";
import styled from "styled-components";
import PropTypes from "prop-types";
import { scaleQuantize } from "d3-scale";
import { motion, useCycle } from "framer-motion";
import { useTracking } from "analytics/context";
import { generateBigHex } from "./Hexes/generateHexes";
import { toPathString } from "flubber";
import { CustomSelect } from "@components/select";

import { State } from "./State";
import { data } from "./data";
import { linearFit } from "./linearfits";
import { generateLegendMapping, generateScatterPlotData } from "./utils";
import {
  KEY_ARRAY_OPTIONS,
  MIGRATION_LEGEND_LABELS,
  AGE_LEGEND_LABELS,
  REASON_LEGEND_LABELS,
  INCOME_LEGEND_LABELS,
  SCATTERPLOT_OPTIONS
} from "./constants";
import { Legend } from "./Legend";
import { Scatterplot } from "./Scatterplot";
const HEX_SIZE = 15;

const SectionTitle = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

const StickyContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  // margin: 0 -8%;
  // padding: 1rem 8% 0;
  width: 100%;
  .legends {
    margin: 0 0 1rem auto;
    h3 {
      margin: 0 0 0.5rem;
    }
    .legend-row {
      align-items: center;
      svg {
        margin-right: 5px;
      }
      .legend-data {
        display: inline-flex;
        justify-content: space-between;
        min-width: 200px;
      }
    }
    .legend-number {
      font-weight: bold;
      margin-left: auto;
    }
  }
`;

const getLinearFitForPair = (a, b, startX = 0, endX = 60) => {
  const [slope, ord] = linearFit[`${a}, ${b}`];
  const f = (x) => x * slope + ord;
  return { x1: startX, y1: f(startX), x2: endX, y2: f(endX) };
};

export const Index = ({ seeMore = false }) => {
  const { logEvent } = useTracking();
  const title = "Opportunities in The US Housing Market";
  const [shape, cycleShape] = useCycle("hex", "shape");
  const [hoveredState, setHoveredState] = React.useState("");
  const [dataKeys, setDataKeys] = React.useState(KEY_ARRAY_OPTIONS[0]);
  const [scatterPlotX, setScatterPlotX] = React.useState(SCATTERPLOT_OPTIONS[14]);
  const [scatterPlotY, setScatterPlotY] = React.useState(SCATTERPLOT_OPTIONS[0]);
  const [scatterPlotZ, setScatterPlotZ] = React.useState(SCATTERPLOT_OPTIONS[30]);
  const [scatterPlotLinearFit, setScatterPlotLinearFit] = React.useState(
    getLinearFitForPair(SCATTERPLOT_OPTIONS[14].label, SCATTERPLOT_OPTIONS[0].label)
  );

  React.useEffect(() => {}, []);

  const colorScale = React.useMemo(() => {
    return scaleQuantize()
      .domain([-0.25, 0.25])
      .range(["#23A3C1", "#9cc9d9", "#ffaa92", "#FF5B3A"]);
  }, []);

  const onPlay = React.useCallback(() => {
    logEvent({
      category: "Vaccinations",
      action: "Pressed Play"
    });
  }, []);

  const dataOptions = [
    { value: "migration", label: "Migration Movement" },
    { value: "reasons", label: "Reasons for Moving" },
    { value: "age", label: "Age Ranges" }
  ];

  const customHex = generateBigHex({ size: 100, center: [250, 200] });

  const generateStateData = React.useCallback(
    (state) => {
      return dataKeys.value.map((key) => {
        return state[key] / 100;
      });
    },
    [dataKeys]
  );

  const [mapLegendData, setMapLegendData] = React.useState(
    generateLegendMapping(MIGRATION_LEGEND_LABELS)
  );

  const [scatterPlotData, setScatterPlotData] = React.useState(
    generateScatterPlotData(data, "Age_65_or_older_in", "Retirement_in", "Combined Sales Tax Rate")
  );

  React.useEffect(() => {
    setScatterPlotData(
      generateScatterPlotData(data, scatterPlotX.value, scatterPlotY.value, scatterPlotZ.value)
    );
    setScatterPlotLinearFit(getLinearFitForPair(scatterPlotX.label, scatterPlotY.label));
  }, [scatterPlotX, scatterPlotY, scatterPlotZ]);

  React.useEffect(() => {
    let stateData;
    if (hoveredState) {
      const foundState = data.find((state) => hoveredState === state.State);
      if (foundState) {
        stateData = generateStateData(foundState);
      }
    }
    if (shape === "hex") {
      if (dataKeys.label.includes("Reason")) {
        setMapLegendData(generateLegendMapping(REASON_LEGEND_LABELS, stateData));
      }
      if (dataKeys.label.includes("Age")) {
        setMapLegendData(generateLegendMapping(AGE_LEGEND_LABELS, stateData));
      }
      if (dataKeys.label.includes("Income")) {
        setMapLegendData(generateLegendMapping(INCOME_LEGEND_LABELS, stateData));
      }
    } else {
      setMapLegendData(generateLegendMapping(MIGRATION_LEGEND_LABELS, stateData));
    }
  }, [dataKeys, shape, hoveredState]);

  return (
    <section className="chart-wrapper map-viz-wrapper">
      <div className="row-container">
        <SectionTitle>{title}</SectionTitle>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et aliquam lectus. Donec vel
          bibendum tortor. Etiam ullamcorper nulla vulputate volutpat elementum. &nbsp;
          <Link href="https://productcoalition.com/opportunities-in-the-us-housing-market-2add5bc1871c">
            Article
          </Link>
        </p>
        <h2>Migration, reasons, and ages</h2>
        <StickyContainer>
          <button onClick={() => cycleShape()} className="btn btn-map">
            Toggle Mode
          </button>
          {shape === "shape" && (
            <CustomSelect
              width="200"
              options={KEY_ARRAY_OPTIONS}
              selectedOption={dataKeys}
              label=""
              onChange={setDataKeys}
            />
          )}
          <div className="hex-legend">
            <svg width="16" height="16" viewBox="0 0 90 100" overflow="visible">
              <polygon
                points="90.5 75.6 90.5 25.6 45.5 .6 .5 25.6 .5 75.6 45.5 100.6"
                fill="#ff9900"
              />
            </svg>
            = 4%
          </div>
          <Legend title={hoveredState} data={mapLegendData}></Legend>
          {/* {dataKeys.label.includes("Reason") && shape === "hex" && (
            <Legend data={REASON_LEGEND_COLOR_MAPPING}></Legend>
          )}
          {dataKeys.label.includes("Age") && shape === "hex" && (
            <Legend data={AGE_LEGEND_COLOR_MAPPING}></Legend>
          )}
          {dataKeys.label.includes("Income") && shape === "hex" && (
            <Legend data={INCOME_LEGEND_COLOR_MAPPING}></Legend>
          )} */}
        </StickyContainer>
        <svg className="main-chart-mapvis" overflow="visible" viewBox={`80 70 400 240`}>
          {data.map((state) => {
            if (!state.shape || !state.hex) {
              return null;
            }
            let stroke;
            if (state.migrationIn) {
              const diff = state.migrationOut - state.migrationIn;
              stroke = colorScale(diff);
            }
            let hexPath = state.hex;
            let hexArray = [];
            if (state.hexVertix) {
              hexArray = generateBigHex({
                size: HEX_SIZE,
                center: state.hexVertix
              });
              hexPath = toPathString(hexArray);
            }
            return (
              <motion.g key={state.code}>
                {state.extraShapes &&
                  state.extraShapes.map((extra, idx) => {
                    return (
                      <State
                        key={`extra-${state.code}-${idx}`}
                        shape={shape}
                        fillColor={stroke}
                        shapePath={extra}
                        hexPath={hexPath}></State>
                    );
                  })}
                <State
                  name={state.code}
                  shape={shape}
                  fillColor={stroke}
                  shapePath={state.shape}
                  hexPath={hexPath}
                  data={!state.skipData ? generateStateData(state) : null}
                  hexCorner={hexArray[4]}
                  size={HEX_SIZE}
                  multi={false}
                  onClick={() => setHoveredState(state.State)}></State>
              </motion.g>
            );
          })}
        </svg>
        {/* {!seeMore ? (
          <a href="/data.json">
            <button className="btn download-btn">Download Data</button>
          </a>
        ) : (
          <Link href="/map-vis">
            <a>
              <button className="btn download-btn">See more</button>
            </a>
          </Link>
        )} */}
      </div>

      <div className="row-container">
        <h2>Moving variables and taxes</h2>
        <CustomSelect
          width="200"
          options={SCATTERPLOT_OPTIONS}
          selectedOption={scatterPlotX}
          label=""
          onChange={(o) => setScatterPlotX(o)}
        />
        <CustomSelect
          width="200"
          options={SCATTERPLOT_OPTIONS.filter((o) => o.label !== scatterPlotX.label)}
          selectedOption={scatterPlotY}
          label=""
          onChange={(o) => setScatterPlotY(o)}
        />
        {/* <CustomSelect
          width="200"
          options={SCATTERPLOT_OPTIONS}
          selectedOption={scatterPlotZ}
          label=""
          onChange={(o) => setScatterPlotZ(o)}
        /> */}
        <Scatterplot
          xTitle={scatterPlotX.value}
          yTitle={scatterPlotY.value}
          colorTitle={scatterPlotZ.value}
          linearRegression={scatterPlotLinearFit}
          data={scatterPlotData}></Scatterplot>
        {/* <Legend data={REASON_LEGEND_COLOR_MAPPING}></Legend> */}
      </div>
    </section>
  );
};

Index.propTypes = {
  countryList: PropTypes.array,
  seeMore: PropTypes.bool,
  animated: PropTypes.bool
};

export default Index;
