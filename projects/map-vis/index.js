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
const HEX_SIZE = 15;

const SectionTitle = styled.h1`
  font-size: 3rem;
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
  const title = "Opportunities in The US Housing Market";
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

  const dataOptions = [
    { value: "migration", label: "Migration Movement" },
    { value: "reasons", label: "Reasons for Moving" },
    { value: "age", label: "Age Ranges" }
  ];

  const customHex = generateBigHex({ size: 100, center: [250, 200] });

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
          <button onClick={() => cycleShape()}>TOGGLE</button>
          <CustomSelect
            width="200"
            options={dataOptions}
            selectedOption={dataOptions}
            label=""
            onChange=""
          />
          <button className="btn">Inbound</button>
          <button className="btn">Outbound</button>
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
        <p>
          <svg viewBox="0 0 20 20" width="15" height="15"><circle cx="10" cy="10" r="8" fill="#23A3C1" /></svg> Retirement<br/>
          <svg viewBox="0 0 20 20" width="15" height="15"><circle cx="10" cy="10" r="8" fill="#9cc9d9" /></svg> Health<br/>
          <svg viewBox="0 0 20 20" width="15" height="15"><circle cx="10" cy="10" r="8" fill="#ffaa92" /></svg> Family<br/>
          <svg viewBox="0 0 20 20" width="15" height="15"><circle cx="10" cy="10" r="8" fill="#FF5B3A" /></svg> Lifestyle<br/>
          <svg viewBox="0 0 20 20" width="15" height="15"><circle cx="10" cy="10" r="8" fill="#F4E9F0" /></svg> Job<br/>
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

      <div className="row-container">
        <h2>Moving variables and taxes</h2>
        <svg class="main-chart-taxes" viewBox="0 -20 300 200">
          <polygon points="129.83 91.12 129.83 92.87 131.35 93.74 132.86 92.87 132.86 91.12 131.35 90.25 129.83 91.12" fill="#77229e"/>
          <polygon points="117.41 85.62 117.41 87.37 118.93 88.25 120.44 87.37 120.44 85.62 118.93 84.75 117.41 85.62" fill="#77229e"/>
          <polygon points="124.41 85.62 124.41 87.37 125.93 88.25 127.44 87.37 127.44 85.62 125.93 84.75 124.41 85.62" fill="#77229e"/>
          <polygon points="126.8 70.76 126.8 72.51 128.32 73.38 129.83 72.51 129.83 70.76 128.32 69.88 126.8 70.76" fill="#77229e"/>
          <polygon points="137.75 71.76 137.75 73.51 139.26 74.38 140.78 73.51 140.78 71.76 139.26 70.88 137.75 71.76" fill="#77229e"/>
          <polygon points="141.75 74.76 141.75 76.51 143.26 77.38 144.78 76.51 144.78 74.76 143.26 73.88 141.75 74.76" fill="#77229e"/>
          <polygon points="129.05 81.01 129.05 82.76 130.56 83.63 132.07 82.76 132.07 81.01 130.56 80.14 129.05 81.01" fill="#77229e"/>
          <polygon points="111.05 78.01 111.05 79.76 112.56 80.63 114.08 79.76 114.08 78.01 112.56 77.14 111.05 78.01" fill="#77229e"/>
          <polygon points="109.05 76.01 109.05 77.76 110.56 78.63 112.08 77.76 112.08 76.01 110.56 75.14 109.05 76.01" fill="#77229e"/>
          <polygon points="124.41 77.51 124.41 79.26 125.93 80.14 127.44 79.26 127.44 77.51 125.93 76.64 124.41 77.51" fill="#77229e"/>
          <polygon points="102.79 86.16 102.79 87.91 104.31 88.79 105.82 87.91 105.82 86.16 104.31 85.29 102.79 86.16" fill="#77229e"/>
          <polygon points="98.1 89.12 98.1 90.87 99.61 91.74 101.13 90.87 101.13 89.12 99.61 88.25 98.1 89.12" fill="#77229e"/>
          <polygon points="98.1 95.19 98.1 96.94 99.61 97.81 101.13 96.94 101.13 95.19 99.61 94.31 98.1 95.19" fill="#77229e"/>
          <polygon points="81.64 101.2 81.64 102.95 83.15 103.82 84.67 102.95 84.67 101.2 83.15 100.33 81.64 101.2" fill="#77229e"/>
          <polygon points="60.42 109.44 60.42 111.19 61.94 112.07 63.45 111.19 63.45 109.44 61.94 108.57 60.42 109.44" fill="#77229e"/>
          <polygon points="102.06 70.22 102.06 71.97 103.58 72.84 105.09 71.97 105.09 70.22 103.58 69.34 102.06 70.22" fill="#77229e"/>
          <polygon points="105.06 70.22 105.06 71.97 106.58 72.84 108.09 71.97 108.09 70.22 106.58 69.34 105.06 70.22" fill="#77229e"/>
          <polygon points="101.06 53.22 101.06 54.97 102.58 55.84 104.09 54.97 104.09 53.22 102.58 52.34 101.06 53.22" fill="#77229e"/>
          <text transform="translate(14.26 8.09)" font-size="4" font-family="SourceSansPro-Regular, Source Sans Pro">
            40<tspan x="0" y="26">30</tspan><tspan x="0" y="52">20</tspan><tspan x="0" y="78">10</tspan><tspan x="3.98" y="104">0</tspan>
          </text>
          <text transform="translate(34.25 133.69)" font-size="4" font-family="SourceSansPro-Regular, Source Sans Pro">
            0 <tspan x="26" y="0">10</tspan> <tspan x="52" y="0">20</tspan> <tspan x="78" y="0">30</tspan> <tspan x="104" y="0">40</tspan> <tspan x="130" y="0">50</tspan> <tspan x="156" y="0">60</tspan>
          </text>
          <line x1="36.34" y1="120.41" x2="234.62" y2="4.46" fill="none" stroke="#ff5b3a" stroke-miterlimit="10"/>
          <polygon points="34.25 109.2 34.25 110.95 35.77 111.82 37.28 110.95 37.28 109.2 35.77 108.33 34.25 109.2" fill="#081281"/>
          <polygon points="150 77.51 150 79.26 151.52 80.14 153.03 79.26 153.03 77.51 151.52 76.64 150 77.51" fill="#9a3391"/>
          <polygon points="143 92.51 143 94.26 144.52 95.14 146.03 94.26 146.03 92.51 144.52 91.64 143 92.51" fill="#9a3391"/>
          <polygon points="130 83.51 130 85.26 131.52 86.14 133.03 85.26 133.03 83.51 131.52 82.64 130 83.51" fill="#9a3391"/>
          <polygon points="131 78.51 131 80.26 132.52 81.14 134.03 80.26 134.03 78.51 132.52 77.64 131 78.51" fill="#9a3391"/>
          <polygon points="127 77.51 127 79.26 128.52 80.14 130.03 79.26 130.03 77.51 128.52 76.64 127 77.51" fill="#9a3391"/>
          <polygon points="104 83.51 104 85.26 105.52 86.14 107.03 85.26 107.03 83.51 105.52 82.64 104 83.51" fill="#9a3391"/>
          <polygon points="114 77.51 114 79.26 115.52 80.14 117.03 79.26 117.03 77.51 115.52 76.64 114 77.51" fill="#9a3391"/>
          <polygon points="115 68.51 115 70.26 116.52 71.14 118.03 70.26 118.03 68.51 116.52 67.64 115 68.51" fill="#9a3391"/>
          <polygon points="159.99 52.16 159.99 53.91 161.51 54.79 163.02 53.91 163.02 52.16 161.51 51.29 159.99 52.16" fill="#9a3391"/>
          <polygon points="119 68.51 119 70.26 120.52 71.14 122.03 70.26 122.03 68.51 120.52 67.64 119 68.51" fill="#9a3391"/>
          <polygon points="120 64.51 120 66.26 121.52 67.14 123.03 66.26 123.03 64.51 121.52 63.64 120 64.51" fill="#9a3391"/>
          <polygon points="136 66.51 136 68.26 137.52 69.14 139.03 68.26 139.03 66.51 137.52 65.64 136 66.51" fill="#9a3391"/>
          <polygon points="149.15 34.26 149.15 36.01 150.66 36.89 152.18 36.01 152.18 34.26 150.66 33.39 149.15 34.26" fill="#f0ad4f"/>
          <polygon points="121.52 73.51 121.52 75.25 123.03 76.13 124.55 75.25 124.55 73.51 123.03 72.63 121.52 73.51" fill="#f0ad4f"/>
          <polygon points="182.97 39.06 182.97 40.81 184.48 41.68 185.99 40.81 185.99 39.06 184.48 38.18 182.97 39.06" fill="#f0ad4f"/>
          <polygon points="169.17 59.06 169.17 60.81 170.69 61.68 172.2 60.81 172.2 59.06 170.69 58.19 169.17 59.06" fill="#f0ad4f"/>
          <polygon points="144.52 63.73 144.52 65.48 146.03 66.36 147.54 65.48 147.54 63.73 146.03 62.86 144.52 63.73" fill="#e1855a"/>
          <polygon points="147.64 .87 147.64 2.62 149.15 3.5 150.66 2.62 150.66 .87 149.15 0 147.64 .87" fill="#e1855a"/>
          <polygon points="150.64 7.87 150.64 9.62 152.15 10.5 153.66 9.62 153.66 7.87 152.15 7 150.64 7.87" fill="#e1855a"/>
          <polygon points="129.05 41.47 129.05 43.21 130.56 44.09 132.07 43.21 132.07 41.47 130.56 40.59 129.05 41.47" fill="#c55b70"/>
          <polygon points="140.24 46.66 140.24 48.4 141.75 49.28 143.26 48.4 143.26 46.66 141.75 45.78 140.24 46.66" fill="#c55b70"/>
          <polygon points="118.49 62.77 118.49 64.51 120 65.39 121.52 64.51 121.52 62.77 120 61.89 118.49 62.77" fill="#c55b70"/>
          <polygon points="151.52 66.26 151.52 68.01 153.03 68.89 154.54 68.01 154.54 66.26 153.03 65.39 151.52 66.26" fill="#c55b70"/>
          <polygon points="232.62 17.02 232.62 18.77 234.13 19.64 235.64 18.77 235.64 17.02 234.13 16.15 232.62 17.02" fill="#f2f858"/>
          <text transform="translate(108.9 145.85)" font-size="6" font-family="SourceSansPro-SemiBold, Source Sans Pro" font-weight="600">
            Age 65 or older
          </text>
          <text transform="rotate(-90 42.01 35.37)" font-size="6" font-family="SourceSansPro-SemiBold, Source Sans Pro" font-weight="600">
            Retirement
          </text>
        </svg>
        <p>
          <svg viewBox="0 0 20 20" width="15" height="15"><circle cx="10" cy="10" r="8" fill="#23A3C1" /></svg> Retirement<br/>
          <svg viewBox="0 0 20 20" width="15" height="15"><circle cx="10" cy="10" r="8" fill="#9cc9d9" /></svg> Health<br/>
          <svg viewBox="0 0 20 20" width="15" height="15"><circle cx="10" cy="10" r="8" fill="#ffaa92" /></svg> Family<br/>
          <svg viewBox="0 0 20 20" width="15" height="15"><circle cx="10" cy="10" r="8" fill="#FF5B3A" /></svg> Lifestyle<br/>
          <svg viewBox="0 0 20 20" width="15" height="15"><circle cx="10" cy="10" r="8" fill="#F4E9F0" /></svg> Job<br/>
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
