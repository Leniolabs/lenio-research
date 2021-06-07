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
const HEX_SIZE = 15;

const SectionTitle = styled.h1`
  font-size: 3rem;
  color: #2a3f55;
  margin: 0 auto 5rem;
  text-align: center;
  .intro-title {
    color: #ff3f55;
    display: block;
    font-size: 1.2rem;
    margin-bottom: .5rem;
  }
  .author {
    display: block;
    font-size: 1.2rem;
    font-weight: normal;
    margin-top: 1rem;
    a { color: #2a9faa; }
  }
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
    @media (max-width: 767px) {
      margin: 0 auto 1rem auto;
      font-size: 1rem;
    }
    h3 {
      margin: 0 0 0.5rem;
    }
    .legend-row {
      align-items: center;
      justify-content: space-between;
      display: flex;
      svg {
        margin-right: 5px;
      }
      .legend-data {
        display: inline-flex;
        justify-content: space-between;
        min-width: 360px;
        @media (max-width: 767px) {
          min-width: 300px;
        }
      }
    }
    .legend-number {
      font-weight: bold;
      margin-left: auto;
      min-width: 60px;
      display: flex;
      justify-content: flex-end;
    }
  }
`;

const Background = styled.rect`
  x: -200;
  y: 60;
  width: 100vw;
  height: 100%;
  fill: transparent;
  @media (max-width: 767px) {
    x: 50;
    width: 135vw;
  }
`;

export const Index = ({ seeMore = false }) => {
  const { logEvent } = useTracking();
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
          <span class="intro-title">Data visualizations of</span>
          Opportunities in<br/> The US Housing Market
        <span className="author">An article written by <a href="linkedin.com/in/manishgarg" target="_blank">Manish Garg</a></span>
        </SectionTitle>
      </div>
      <div className="row-container">
        <p className="text-p"><span className="comilla">“</span><i>Last year (2020) has been unprecedented and the housing market is witnessing an evolution with many housing trends accelerating by 5–10 years. States like Texas, Idaho, Florida, and Wyoming are witnessing unprecedented growth in the housing market as an increasing number of families move there.</i>
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
      <p className="text-p"><span className="comilla">“</span><i>Families looking to relocate see an opportunity with the low rates, ability to migrate from high tax states and avail remote work opportunities. Investors follow these trends and will fuel this growth. The housing and the rental market will continue to evolve and bring new opportunities along the way.</i></p>
      <div className="row-container">
        <h2>Age groups and reasons to migrate</h2>
        <p className="sub-p">Top 10 states with age between 18 and 44 moving Out</p>
        <div className="stack-bar">
          {/* <div className="checkbox-group">
            <label for="ageout"> <input type="checkbox" id="ageout" name="ageout" value="Age Out"/>Order by Age out</label>
            <label for="jobout"> <input type="checkbox" id="jobout" name="jobout" value="Job Out"/>Order by Job out</label>
          </div> */}
        <svg className="millennials" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 585.8 354.9">
          <rect width="441.7" height="295" x="144.1" fill="#fffbf0"/>
          <text fill="#2a3f55" font-family="SourceSansPro-Regular, Source Sans Pro" font-size="13" transform="translate(93.8 17)">
              Florida<tspan x="-12.6" y="30">Delaware</tspan><tspan x="-69" y="60">District of Columbia</tspan><tspan x="-27.7" y="90">Connecticut</tspan><tspan x="-11.6" y="120">Colorado</tspan><tspan x="-14.3" y="150">California</tspan><tspan x="-10.7" y="180">Arkansas</tspan><tspan x="-2.6" y="210">Arizona</tspan><tspan x="3" y="240">Alaska</tspan><tspan x="-9.6" y="270">Alabama</tspan>
            </text>
          <rect width="2" height="12" x="143.8" y="60" fill="#ffdfaa"/>
          <rect width="105" height="12" x="143.8" y="30" fill="#ffdfaa"/>
          <rect width="220" height="12" x="143.8" fill="#ffdfaa"/>
          <rect width="185" height="12" x="143.8" y="90" fill="#ffdfaa"/>
          <rect width="205" height="12" x="143.8" y="120" fill="#ffdfaa"/>
          <rect width="190" height="12" x="143.8" y="150" fill="#ffdfaa"/>
          <rect width="410" height="12" x="143.8" y="180" fill="#ffdfaa"/>
          <rect width="180" height="12" x="143.8" y="210" fill="#ffdfaa"/>
          <rect width="2" height="12" x="143.8" y="240" fill="#ffdfaa"/>
          <rect width="410" height="12" x="143.8" y="270" fill="#ffdfaa"/>
          <rect width="2.8" height="12" x="143.8" y="73" fill="#55bfaa"/>
          <rect width="27.9" height="12" x="143.8" y="43" fill="#55bfaa"/>
          <rect width="83.8" height="12" x="143.8" y="13" fill="#55bfaa"/>
          <rect width="76.8" height="12" x="143.8" y="103" fill="#55bfaa"/>
          <rect width="125.7" height="12" x="143.8" y="133" fill="#55bfaa"/>
          <rect width="111.8" height="12" x="143.8" y="163" fill="#55bfaa"/>
          <rect width="258.4" height="12" x="143.8" y="193" fill="#55bfaa"/>
          <rect width="69.8" height="12" x="143.8" y="223" fill="#55bfaa"/>
          <rect width="2.8" height="12" x="143.8" y="253" fill="#55bfaa"/>
          <rect width="111.8" height="12" x="143.8" y="283" fill="#55bfaa"/>
          <text fill="#2a3f55" font-family="SourceSansPro-SemiBold, Source Sans Pro" font-size="15" font-weight="600" letter-spacing="0em" transform="rotate(-90 92.3 79.8)">STATE</text>
          <text fill="#2a3f55" font-family="SourceSansPro-SemiBold, Source Sans Pro" font-size="15" font-weight="600" transform="translate(306.8 350.4)">
            % of Age 18 to 34
          </text>
          <text fill="#2a3f55" font-family="SourceSansPro-SemiBold, Source Sans Pro" font-size="15" font-weight="600" transform="translate(476.2 350.4)">
            % of Age 35 to 44
          </text>
          <rect width="14.1" height="14.1" x="287.7" y="337.9" fill="#55bfaa"/>
          <text fill="#2a3f55" font-family="SourceSansPro-SemiBold, Source Sans Pro" font-size="15" font-weight="600" transform="translate(157.8 350.4)">
            % of Job Out
          </text>
          <rect width="14.1" height="14.1" x="138.5" y="337.9" fill="#ffdfaa"/>
          <rect width="14.1" height="14.1" x="456.9" y="337.9" fill="#ff3f55"/>
          <text fill="#2a3f55" font-family="SourceSansPro-Regular, Source Sans Pro" font-size="13" transform="translate(141.6 312.8)">
            0
          </text>
          <text fill="#2a3f55" font-family="SourceSansPro-Regular, Source Sans Pro" font-size="13" transform="translate(258.3 312.8)">
            20
          </text>
          <text fill="#2a3f55" font-family="SourceSansPro-Regular, Source Sans Pro" font-size="13" transform="translate(380.3 312.8)">
            40
          </text>
          <text fill="#2a3f55" font-family="SourceSansPro-Regular, Source Sans Pro" font-size="13" transform="translate(502.3 312.8)">
            60
          </text>
          <line x1="265.8" x2="265.8" y2="298.4" fill="none" stroke="#2a3f55" stroke-miterlimit="10" stroke-width=".3"/>
          <line x1="387.3" x2="387.3" y2="298.4" fill="none" stroke="#2a3f55" stroke-miterlimit="10" stroke-width=".3"/>
          <line x1="508.8" x2="508.8" y2="298.4" fill="none" stroke="#2a3f55" stroke-miterlimit="10" stroke-width=".3"/>
          <rect width="2" height="12" x="143.8" y="73" fill="#ff3f55"/>
          <rect width="20" height="12" x="143.8" y="43" fill="#ff3f55"/>
          <rect width="60" height="12" x="143.8" y="13" fill="#ff3f55"/>
          <rect width="55" height="12" x="143.8" y="103" fill="#ff3f55"/>
          <rect width="90" height="12" x="143.8" y="133" fill="#ff3f55"/>
          <rect width="80" height="12" x="143.8" y="163" fill="#ff3f55"/>
          <rect width="185" height="12" x="143.8" y="193" fill="#ff3f55"/>
          <rect width="50" height="12" x="143.8" y="223" fill="#ff3f55"/>
          <rect width="2" height="12" x="143.8" y="253" fill="#ff3f55"/>
          <rect width="80" height="12" x="143.8" y="283" fill="#ff3f55"/>
        </svg>

        <p className="sub-p">Top 10 states with age 65 and older moving Out</p>

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 585.8 354.9">
            <rect width="441.7" height="295" x="144.1" fill="#fffbf0"/>
            <text fill="#2a3f55" font-family="SourceSansPro-Regular, Source Sans Pro" font-size="13" transform="translate(93.8 17)">
              Florida<tspan x="-12.6" y="30">Delaware</tspan><tspan x="-69" y="60">District of Columbia</tspan><tspan x="-27.7" y="90">Connecticut</tspan><tspan x="-11.6" y="120">Colorado</tspan><tspan x="-14.3" y="150">California</tspan><tspan x="-10.7" y="180">Arkansas</tspan><tspan x="-2.6" y="210">Arizona</tspan><tspan x="3" y="240">Alaska</tspan><tspan x="-9.6" y="270">Alabama</tspan>
            </text>
            <rect width="2" height="12" x="143.8" y="60" fill="#ffdfaa"/>
            <rect width="105" height="12" x="143.8" y="30" fill="#ffdfaa"/>
            <rect width="220" height="12" x="143.8" fill="#ffdfaa"/>
            <rect width="185" height="12" x="143.8" y="90" fill="#ffdfaa"/>
            <rect width="205" height="12" x="143.8" y="120" fill="#ffdfaa"/>
            <rect width="190" height="12" x="143.8" y="150" fill="#ffdfaa"/>
            <rect width="410" height="12" x="143.8" y="180" fill="#ffdfaa"/>
            <rect width="180" height="12" x="143.8" y="210" fill="#ffdfaa"/>
            <rect width="2" height="12" x="143.8" y="240" fill="#ffdfaa"/>
            <rect width="410" height="12" x="143.8" y="270" fill="#ffdfaa"/>
            <rect width="2" height="12" x="143.8" y="73" fill="#ff3f55"/>
            <rect width="20" height="12" x="143.8" y="43" fill="#ff3f55"/>
            <rect width="60" height="12" x="143.8" y="13" fill="#ff3f55"/>
            <rect width="55" height="12" x="143.8" y="103" fill="#ff3f55"/>
            <rect width="90" height="12" x="143.8" y="133" fill="#ff3f55"/>
            <rect width="80" height="12" x="143.8" y="163" fill="#ff3f55"/>
            <rect width="185" height="12" x="143.8" y="193" fill="#ff3f55"/>
            <rect width="50" height="12" x="143.8" y="223" fill="#ff3f55"/>
            <rect width="2" height="12" x="143.8" y="253" fill="#ff3f55"/>
            <rect width="80" height="12" x="143.8" y="283" fill="#ff3f55"/>
            <text fill="#2a3f55" font-family="SourceSansPro-SemiBold, Source Sans Pro" font-size="15" font-weight="600" letter-spacing="0em" transform="rotate(-90 92.3 79.8)">STATE </text>
            <text fill="#2a3f55" font-family="SourceSansPro-SemiBold, Source Sans Pro" font-size="15" font-weight="600" transform="translate(218.2 350.4)">
            % of Job Out
            </text>
            <text fill="#2a3f55" font-family="SourceSansPro-SemiBold, Source Sans Pro" font-size="15" font-weight="600" transform="translate(386.2 350.4)">
              % of Age 65 and older
            </text>
            <rect width="14.1" height="14.1" x="198.9" y="337.9" fill="#ffdfaa"/>
            <rect width="14.1" height="14.1" x="366.9" y="337.9" fill="#ff3f55"/>
            <text fill="#2a3f55" font-family="SourceSansPro-Regular, Source Sans Pro" font-size="13" transform="translate(141.6 312.8)">
              0
            </text>
            <text fill="#2a3f55" font-family="SourceSansPro-Regular, Source Sans Pro" font-size="13" transform="translate(258.3 312.8)">
              20
            </text>
            <text fill="#2a3f55" font-family="SourceSansPro-Regular, Source Sans Pro" font-size="13" transform="translate(380.3 312.8)">
              40
            </text>
            <text fill="#2a3f55" font-family="SourceSansPro-Regular, Source Sans Pro" font-size="13" transform="translate(502.3 312.8)">
              60
            </text>
            <line x1="265.8" x2="265.8" y2="298.4" fill="none" stroke="#2a3f55" stroke-miterlimit="10" stroke-width=".3"/>
            <line x1="387.3" x2="387.3" y2="298.4" fill="none" stroke="#2a3f55" stroke-miterlimit="10" stroke-width=".3"/>
            <line x1="508.8" x2="508.8" y2="298.4" fill="none" stroke="#2a3f55" stroke-miterlimit="10" stroke-width=".3"/>
          </svg>


        </div>

        <h2>Moving variables and age groups</h2>
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
