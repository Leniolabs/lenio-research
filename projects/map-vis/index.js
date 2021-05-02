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
import {
  KEY_ARRAY_OPTIONS,
  MIGRATION_LEGEND_COLOR_MAPPING,
  AGE_LEGEND_COLOR_MAPPING,
  REASON_LEGEND_COLOR_MAPPING,
  INCOME_LEGEND_COLOR_MAPPING
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
  // background: rgba(255, 251, 243, 0.9);
  min-height: 60px;
  margin: 0 -8%;
  padding: 1rem 8% 0;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
`;

export const Index = ({ seeMore = false }) => {
  const { logEvent } = useTracking();
  const title = "Opportunities in The US Housing Market";
  const [shape, cycleShape] = useCycle("hex", "shape");
  const [dataKeys, setDataKeys] = React.useState(KEY_ARRAY_OPTIONS[0]);

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
          <CustomSelect
            width="200"
            options={KEY_ARRAY_OPTIONS}
            selectedOption={dataKeys}
            label=""
            onChange={setDataKeys}
          />
        </StickyContainer>
        <svg className="main-chart-mapvis" overflow="visible" viewBox={`80 40 400 260`}>
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
                  multi={false}></State>
              </motion.g>
            );
          })}
        </svg>
        {shape !== "hex" && <Legend data={MIGRATION_LEGEND_COLOR_MAPPING}></Legend>}
        {dataKeys.label.includes("Reason") && shape === "hex" && (
          <Legend data={REASON_LEGEND_COLOR_MAPPING}></Legend>
        )}
        {dataKeys.label.includes("Age") && shape === "hex" && (
          <Legend data={AGE_LEGEND_COLOR_MAPPING}></Legend>
        )}
        {dataKeys.label.includes("Income") && shape === "hex" && (
          <Legend data={INCOME_LEGEND_COLOR_MAPPING}></Legend>
        )}
        {!seeMore ? (
          <a href="/data.json">
            <button className="btn download-btn">Download Data</button>
          </a>
        ) : (
          <Link href="/map-vis">
            <a>
              <button className="btn download-btn">See more</button>
            </a>
          </Link>
        )}
      </div>

      <div className="row-container hide">
        <h2>Moving variables and taxes</h2>
        <CustomSelect
          width="200"
          options={dataOptions}
          selectedOption={dataOptions}
          label=""
          onChange=""
        />
        <CustomSelect
          width="200"
          options={dataOptions}
          selectedOption={dataOptions}
          label=""
          onChange=""
        />
        <CustomSelect
          width="200"
          options={dataOptions}
          selectedOption={dataOptions}
          label=""
          onChange=""
        />
        <Scatterplot></Scatterplot>
        <Legend data={REASON_LEGEND_COLOR_MAPPING}></Legend>
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
