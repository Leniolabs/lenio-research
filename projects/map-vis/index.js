/* eslint-disable no-unused-vars */
import * as React from "react";
import Link from "next/link";
import { SectionTitle, StickyContainer, Background } from "./style";
import PropTypes from "prop-types";
import { scaleQuantize } from "d3-scale";
import { motion, resolveMotionValue, useCycle } from "framer-motion";
import { useTracking } from "analytics/context";
import { generateBigHex } from "./Hexes/generateHexes";
import { toPathString } from "flubber";
import { CustomSelect } from "@components/select/select";

import { State } from "./State";
import { data } from "./data";
import { generateLegendMapping, generateScatterPlotData, getLinearFitForPair } from "./utils";
import {
  KEY_ARRAY_OPTIONS,
  MIGRATION_LEGEND_LABELS,
  AGE_LEGEND_LABELS,
  REASON_LEGEND_LABELS,
  INCOME_LEGEND_LABELS,
  SCATTERPLOT_OPTIONS,
  INNER_HEX_COLORS
} from "./constants";
import { Legend } from "./Legend";
import { Scatterplot } from "./Scatterplot";
import { BarChart } from "./BarChart";
const HEX_SIZE = 15;

const initialBarChartData = data
  .sort(
    (a, b) => b.Age_18_to_34_out + b.Age_35_to_44_out - (a.Age_18_to_34_out + a.Age_35_to_44_out)
  )
  .map((a) => ({
    Age_18_to_34_out: a.Age_18_to_34_out,
    Age_35_to_44_out: a.Age_35_to_44_out,
    name: a.State,
    Job_out: a.Job_out
  }))
  .slice(0, 10);

const initialBarChartData2 = data
  .sort((a, b) => b.Age_65_or_older_in - a.Age_65_or_older_in)
  .map((a) => ({
    Age_65_or_older_in: a.Age_65_or_older_in,
    name: a.State,
    State_Individual_Income_Tax_Rates: a.State_Individual_Income_Tax_Rates
  }))
  .slice(0, 10);

const barChartValues2 = [
  [{ property: "State_Individual_Income_Tax_Rates", color: "#ffdfaa", label: "Individual Income Taxes" }],
  [{ property: "Age_65_or_older_in", color: "#ff3f55", label: "% of Age 65 and older in" }]
];

const barChartValues = [
  [{ property: "Job_out", color: "#ffdfaa", label: "% of Job Out" }],
  [
    { property: "Age_18_to_34_out", color: "#55bfaa", label: "% of Age 18 to 34" },
    { property: "Age_35_to_44_out", color: "#ff3f55", label: "% of Age 35 to 44" }
  ]
];

export const Index = ({ seeMore = false }) => {
  const { logEvent } = useTracking();
  const [shape, cycleShape] = useCycle("shape", "hex");
  const [hoveredState, setHoveredState] = React.useState("");
  const [dataKeys, setDataKeys] = React.useState(KEY_ARRAY_OPTIONS[0]);
  const [scatterPlotX, setScatterPlotX] = React.useState(SCATTERPLOT_OPTIONS[14]);
  const [scatterPlotY, setScatterPlotY] = React.useState(SCATTERPLOT_OPTIONS[0]);
  const [scatterPlotZ, setScatterPlotZ] = React.useState(SCATTERPLOT_OPTIONS[30]);
  const [barChartData, setBarChartData] = React.useState(initialBarChartData);
  const [barChartData2, setBarChartData2] = React.useState(initialBarChartData2);
  const [scatterPlotLinearFit, setScatterPlotLinearFit] = React.useState(
    getLinearFitForPair(SCATTERPLOT_OPTIONS[14].label, SCATTERPLOT_OPTIONS[0].label)
  );
  const [scatterPlotXOptions, setScatterPlotXOptions] = React.useState([]);
  const [scatterPlotYOptions, setScatterPlotYOptions] = React.useState([]);
  const [optionType, setOptionType] = React.useState({ label: "In", value: "IN" });

  const oldXInValue = React.useRef(SCATTERPLOT_OPTIONS[14]);
  const oldYInValue = React.useRef(SCATTERPLOT_OPTIONS[0]);
  const oldXOutValue = React.useRef(SCATTERPLOT_OPTIONS[8]);
  const oldYOutValue = React.useRef(SCATTERPLOT_OPTIONS[9]);
  const firstTimeRef = React.useRef(true);

  React.useEffect(() => {
    const prevInX = scatterPlotX;
    const prevInY = scatterPlotY;
    if (optionType.value.includes("IN")) {
      setScatterPlotXOptions(SCATTERPLOT_OPTIONS.filter((o) => o.value.includes("_in")));
      setScatterPlotX(oldXInValue.current);
      setScatterPlotY(oldYInValue.current);
      if (!firstTimeRef.current) {
        oldXOutValue.current = prevInX;
        oldYOutValue.current = prevInY;
      }
    }
    if (optionType.value.includes("OUT")) {
      setScatterPlotXOptions(SCATTERPLOT_OPTIONS.filter((o) => o.value.includes("_out")));
      console.log({ x: oldXOutValue.current, y: oldXOutValue.current });
      setScatterPlotX(oldXOutValue.current);
      setScatterPlotY(oldYOutValue.current);
      oldXInValue.current = prevInX;
      oldYInValue.current = prevInY;
    }
    firstTimeRef.current = false;
  }, [optionType]);

  React.useEffect(() => {
    setScatterPlotYOptions(scatterPlotXOptions.filter((o) => o.value !== scatterPlotX.value));
  }, [scatterPlotX]);

  const colorScale = React.useMemo(() => {
    return scaleQuantize()
      .domain([-0.25, 0.25])
      .range(["#2a9faa", "#9cd0d7", "#ffa0a8", "#ff3f55"]);
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
        setMapLegendData(generateLegendMapping(REASON_LEGEND_LABELS, stateData, INNER_HEX_COLORS));
      }
      if (dataKeys.label.includes("Age")) {
        setMapLegendData(generateLegendMapping(AGE_LEGEND_LABELS, stateData, INNER_HEX_COLORS));
      }
      if (dataKeys.label.includes("Income")) {
        setMapLegendData(generateLegendMapping(INCOME_LEGEND_LABELS, stateData, INNER_HEX_COLORS));
      }
    } else {
      setMapLegendData(generateLegendMapping(MIGRATION_LEGEND_LABELS, stateData));
    }
  }, [dataKeys, shape, hoveredState]);

  return (
    <section className="chart-wrapper map-viz-wrapper">
      <div className="head-main">
        <SectionTitle>
          <span className="intro-title">Data visualizations of</span>
          Opportunities in
          <br /> The US Housing Market
          <span className="author">
            An article written by{" "}
            <a href="linkedin.com/in/manishgarg" target="_blank">
              Manish Garg
            </a>
          </span>
        </SectionTitle>
      </div>
      <div className="row-container">
        <p className="text-p">
          <span className="comilla">“</span>
          <i>
            Last year (2020) has been unprecedented and the housing market is witnessing an
            evolution with many housing trends accelerating by 5–10 years. States like Texas, Idaho,
            Florida, and Wyoming are witnessing unprecedented growth in the housing market as an
            increasing number of families move there.
          </i>
          <Link href="https://productcoalition.com/opportunities-in-the-us-housing-market-2add5bc1871c">
            › Read the complete article
          </Link>
        </p>
      </div>
      <div className="row-container big-row">
        <h2>Why are people moving across the US</h2>
        <p className="sub-p">Click on each state for more info.</p>
        <StickyContainer>
          <button onClick={() => cycleShape()} className="btn btn-map">
            Toggle Mode
          </button>
          {shape === "hex" && (
            <CustomSelect
              width="200"
              options={KEY_ARRAY_OPTIONS}
              selectedOption={dataKeys}
              label=""
              onChange={setDataKeys}
            />
          )}
          {shape === "hex" && (
            <div className="hex-legend">
              <svg width="16" height="16" viewBox="0 0 90 100" overflow="visible">
                <polygon
                  points="90.5 75.6 90.5 25.6 45.5 .6 .5 25.6 .5 75.6 45.5 100.6"
                  fill="#ffbf55"
                />
              </svg>
              = 4%
            </div>
          )}
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
        <svg className="main-chart-mapvis" overflow="visible" viewBox={`80 70 430 220`}>
          <Background onClick={() => setHoveredState("")} />
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
      <p className="text-p">
        <span className="comilla">“</span>
        <i>
          Families looking to relocate see an opportunity with the low rates, ability to migrate
          from high tax states and avail remote work opportunities. Investors follow these trends
          and will fuel this growth. The housing and the rental market will continue to evolve and
          bring new opportunities along the way.
        </i>
      </p>
      <div className="row-container">
        <h2>Age groups and reasons to migrate</h2>
        <p className="sub-p">Top 10 states with age between 18 and 44 and job reasons moving out.</p>
        <div className="stack-bar">
          {/* <div className="checkbox-group">
            <label for="ageout"> <input type="checkbox" id="ageout" name="ageout" value="Age Out"/>Order by Age out</label>
            <label for="jobout"> <input type="checkbox" id="jobout" name="jobout" value="Job Out"/>Order by Job out</label>
          </div> */}
          <BarChart data={barChartData}></BarChart>
          <p className="sub-p">Top 10 states with age 65 and older moving in and lower taxes states.</p>
          <BarChart data={barChartData2} values={barChartValues2} />
        </div>

        <h2>Explore the data</h2>
        <p className="sub-p">Here you can play with the different variables represented on the hexagon map. You can plot for example the linear relationship between the % of people with ages from 18 to 34 that moved out of the state vs the migration out of the state because of work. The color scale represent the Combined Sales Tax Rate per state.</p>
        <CustomSelect
          width={100}
          options={[
            { label: "In", value: "IN" },
            { label: "Out", value: "OUT" }
          ]}
          selectedOption={optionType}
          label=""
          onChange={(o) => setOptionType(o)}
        />
        <CustomSelect
          width={200}
          options={scatterPlotXOptions}
          selectedOption={scatterPlotX}
          label=""
          onChange={(o) => setScatterPlotX(o)}
        />
        <CustomSelect
          width={200}
          options={scatterPlotYOptions}
          selectedOption={scatterPlotY}
          label=""
          onChange={(o) => setScatterPlotY(o)}
        />
        {/* <CustomSelect
          width={200}
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

        <p className="sources-text">
          Sources:{" "}
          <a href="https://taxfoundation.org/state-individual-income-tax-rates-and-brackets-for-2020/">
            Tax Foundation
          </a>
          , <a href="https://www.unitedvanlines.com/">United Van Lines</a>{" "}
        </p>
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
