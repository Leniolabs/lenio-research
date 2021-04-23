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

import { State } from "./State";
import { data } from "./data";
const HEX_SIZE = 15;

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

  const customHex = generateBigHex({ size: 100, center: [250, 200] });

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
        <svg className="main-chart-mapvis" overflow="visible" viewBox={`50 20 500 260`}>
          {Object.keys(data).map((state) => {
            if (!data[state].shape || !data[state].hex) {
              return null;
            }
            let stroke;
            if (data[state].migrationIn) {
              const diff = data[state].migrationOut - data[state].migrationIn;
              stroke = colorScale(diff);
            }
            let hexPath = data[state].hex;
            let hexArray = [];
            if (data[state].hexVertix) {
              hexArray = generateBigHex({
                size: HEX_SIZE,
                center: data[state].hexVertix
              });
              hexPath = toPathString(hexArray);
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
                        hexPath={hexPath}></State>
                    );
                  })}
                <State
                  name={state}
                  shape={shape}
                  fillColor={stroke}
                  shapePath={data[state].shape}
                  hexPath={hexPath}
                  hexCorner={hexArray[4]}
                  size={HEX_SIZE}
                  multi={false}></State>
              </motion.g>
            );
          })}
          {/* <State
            name={"arizona"}
            shape={shape}
            fillColor={"red"}
            shapePath={data["arizona"].shape}
            hexPath={toPathString(customHex)}
            hexCorner={customHex[4]}
            size={100}
            multi={false}></State> */}
        </svg>
        <p>
          <svg viewBox="0 0 20 20" width="15" height="15">
            <circle cx="10" cy="10" r="8" fill="#23A3C1" />
          </svg>{" "}
          High Inbound
          <br />
          <svg viewBox="0 0 20 20" width="15" height="15">
            <circle cx="10" cy="10" r="8" fill="#9cc9d9" />
          </svg>{" "}
          Medium Inbound
          <br />
          <svg viewBox="0 0 20 20" width="15" height="15">
            <circle cx="10" cy="10" r="8" fill="#ffaa92" />
          </svg>{" "}
          Medium Outbound
          <br />
          <svg viewBox="0 0 20 20" width="15" height="15">
            <circle cx="10" cy="10" r="8" fill="#FF5B3A" />
          </svg>{" "}
          High Outbound
          <br />
          <svg viewBox="0 0 20 20" width="15" height="15">
            <circle cx="10" cy="10" r="8" fill="#F4E9F0" />
          </svg>{" "}
          No Data
          <br />
        </p>
        <p>
          <svg viewBox="0 0 20 20" width="15" height="15"><circle cx="10" cy="10" r="8" fill="#23A3C1" /></svg> &lt; 18 to 34 y/o<br/>
          <svg viewBox="0 0 20 20" width="15" height="15"><circle cx="10" cy="10" r="8" fill="#9cc9d9" /></svg> 35 to 44 y/o<br/>
          <svg viewBox="0 0 20 20" width="15" height="15"><circle cx="10" cy="10" r="8" fill="#ffaa92" /></svg> 45 to 54 y/o<br/>
          <svg viewBox="0 0 20 20" width="15" height="15"><circle cx="10" cy="10" r="8" fill="#FF5B3A" /></svg> 55 to 64 y/o<br/>
          <svg viewBox="0 0 20 20" width="15" height="15"><circle cx="10" cy="10" r="8" fill="#F4E9F0" /></svg> 65 or older<br/>
        </p>

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
