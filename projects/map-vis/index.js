/* eslint-disable no-unused-vars */
import * as React from "react";
import Link from "next/link";
import styled from "styled-components";
import PropTypes from "prop-types";
import { scaleQuantize } from "d3-scale";
import { motion, useCycle } from "framer-motion";
import { useTracking } from "analytics/context";

import { State } from "./State";
import { data } from "./data";

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

const StickyContainer = styled.div`
  background: rgba(255, 251, 243, 0.9);
  margin: 0 -8%;
  padding: 1rem 8% 0;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
`;

export const Index = ({ seeMore = false }) => {
  const { logEvent } = useTracking();
  const title = "Map Visualizations";
  const [shape, cycleShape] = useCycle("hex", "shape");

  React.useEffect(() => {}, []);

  const colorScale = React.useMemo(() => {
    return scaleQuantize().domain([-0.6, 0.6]).range(["#FF5B3A", "#FFBD23", "#35D0E5", "#3366FF"]);
  }, []);

  const onPlay = React.useCallback(() => {
    logEvent({
      category: "Vaccinations",
      action: "Pressed Play"
    });
  }, []);

  return (
    <section className="chart-wrapper">
      <div className="row-container">
        <SectionTitle>{title}</SectionTitle>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et aliquam lectus. Donec vel
          bibendum tortor. Etiam ullamcorper nulla vulputate volutpat elementum.&nbsp;
          <Link href="https://github.com/owid/covid-19-data/tree/master/public/data">
            Data Source
          </Link>
        </p>
        <StickyContainer>
          <div>This is sticky</div>
          <button onClick={() => cycleShape()}>TOGGLE</button>
        </StickyContainer>
        <svg className="main-chart" overflow="visible" viewBox={`0 0 600 400`}>
          {Object.keys(data).map((state) => {
            if (!data[state].shape || !data[state].hex) {
              return null;
            }
            if (data[state].shape.toLowerCase().includes("c")) {
              console.log(state);
            }
            let stroke;
            if (data[state].migrationIn) {
              const diff = data[state].migrationOut - data[state].migrationIn;
              stroke = colorScale(diff);
            }
            return (
              <motion.g key={state}>
                {data[state].extraShapes &&
                  data[state].extraShapes.map((extra, idx) => {
                    return (
                      <State
                        key={`extra-${state}-${idx}`}
                        shape={shape}
                        fillColor={stroke}
                        shapePath={extra}
                        hexPath={data[state].hex}></State>
                    );
                  })}
                <State
                  name={state}
                  shape={shape}
                  fillColor={stroke}
                  shapePath={data[state].shape}
                  hexPath={data[state].hex}
                  multi={false}>
                  {/* Here to illustrate that we can render something in the center */}
                  {state === "alabama" && (
                    <rect x={-5} y={-5} width={10} height={10} fill="red"></rect>
                  )}
                </State>
              </motion.g>
            );
          })}
        </svg>

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
    </section>
  );
};

Index.propTypes = {
  countryList: PropTypes.array,
  seeMore: PropTypes.bool,
  animated: PropTypes.bool
};

export default Index;
