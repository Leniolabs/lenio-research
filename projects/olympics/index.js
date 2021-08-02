import * as React from "react";
import Link from "next/link";
import { SectionTitle, StickyContainer } from "../map-vis/style";
import { data } from "./data";
import { BarChart } from "./BarChart";
import { CountrySelect } from "@projects/vaccinations/components/country-select/countrySelect";
import { getGroupedOptions, optionGenerator } from "./utils";

export const Index = () => {
  const SELECT_WIDTH = 270;
  // const [isPlaying, setIsPlaying] = React.useState(false);

  const initialBarChartData = data.reduce((acc, it) => {
    acc[it.code] = {
      country: it.country,
      code: it.code,
      total_medals: ((acc[it.code] && acc[it.code].total_medals) || 0) + it.total_medals || 0,
      gold_medals: ((acc[it.code] && acc[it.code].gold_medals) || 0) + it.gold_medals || 0,
      silver_medals: ((acc[it.code] && acc[it.code].silver_medals) || 0) + it.silver_medals || 0,
      bronce_medals: ((acc[it.code] && acc[it.code].bronce_medals) || 0) + it.bronce_medals || 0
    };
    return acc;
  }, {});

  const barChartData = [];
  for (const country in initialBarChartData) {
    barChartData.push(initialBarChartData[country]);
  }

  const countryOptions = React.useMemo(() => {
    return optionGenerator(barChartData);
  }, [barChartData]);

  const groupedOptions = React.useMemo(() => {
    return getGroupedOptions(countryOptions);
  }, [countryOptions]);

  return (
    <section className="chart-wrapper olympics-wrapper">
      <div className="head-main">
        <SectionTitle>
          Olympics
          <br />
          <img src={"/logo-olympics.svg"} alt="logo" />
        </SectionTitle>
      </div>
      <div className="row-container">
        <h2>Pole Vault</h2>
        <svg viewBox="0 0 2365 1282" overflow="visible">
          <image href="olympics-salto.gif" width="2580" height="1127" x="-155" y="80" />
          <path
            fill="none"
            stroke="#2B4055"
            strokeWidth={2.369}
            strokeMiterlimit={10}
            d="M180.9 1117.2V68.8"
          />
          <path
            fill="none"
            stroke="#5961AC"
            strokeWidth={2.293}
            strokeMiterlimit={10}
            d="M164 1100.3h2181.1"
          />
          <text
            transform="translate(137.472 1156.615)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={38}>
            {"1890"}
          </text>
          <text
            transform="translate(249.089 1147.568)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={26}>
            {"1896"}
          </text>
          <text
            transform="translate(104.011 997.117)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={38}>
            {"2.5"}
          </text>
          <text
            transform="translate(104.005 884.162)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={38}>
            {"3.0"}
          </text>
          <text
            transform="translate(104.005 775.148)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={38}>
            {"3.5"}
          </text>
          <text
            transform="translate(104.005 666.583)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={38}>
            {"4.0"}
          </text>
          <text
            transform="translate(104.005 550.821)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={38}>
            {"4.5"}
          </text>
          <text
            transform="translate(104.005 444.56)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={38}>
            {"5.0"}
          </text>
          <text
            transform="translate(103.987 332.428)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={38}>
            {"5.5"}
          </text>
          <text
            transform="translate(103.995 224.041)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={38}>
            {"6.0"}
          </text>
          <text
            transform="translate(103.987 114.76)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={38}>
            {"6.5"}
          </text>
          <text
            transform="rotate(-90 408.259 373.399)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={42}>
            {"Olympic record (meters)"}
          </text>
          <text
            transform="translate(1019.21 1249.98)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={42}>
            {"Olympic year"}
          </text>
          <text
            transform="translate(374.312 1147.568)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={26}>
            {"1904"}
          </text>
          <text
            transform="translate(439.732 1147.568)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={26}>
            {"1908"}
          </text>
          <text
            transform="translate(505.756 1147.568)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={26}>
            {"1912"}
          </text>
          <text
            transform="translate(633.541 1147.568)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={26}>
            {"1920"}
          </text>
          <text
            transform="translate(759.862 1147.568)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={26}>
            {"1928"}
          </text>
          <text
            transform="translate(890.651 1147.568)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={26}>
            {"1936"}
          </text>
          <text
            transform="translate(825.588 1147.568)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={26}>
            {"1932"}
          </text>
          <text
            transform="translate(1140.756 1147.568)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={26}>
            {"1956"}
          </text>
          <text
            transform="translate(1269.353 1147.568)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={26}>
            {"1964"}
          </text>
          <text
            transform="translate(1396.52 1147.568)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={26}>
            {"1972"}
          </text>
          <text
            transform="translate(1718.533 1147.568)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={26}>
            {"1988"}
          </text>
          <text
            transform="translate(1842.927 1147.568)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={26}>
            {"1996"}
          </text>
          <text
            transform="translate(1972.211 1147.568)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={26}>
            {"2004"}
          </text>
          <text
            transform="translate(2103.763 1147.568)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={26}>
            {"2012"}
          </text>
          <text
            transform="translate(2230.658 1156.568)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={38}>
            {"2020"}
          </text>
          <path
            fill="none"
            stroke="#5961AC"
            strokeWidth={1.858}
            strokeMiterlimit={10}
            d="M2064.3 1100.3v16.9m66-16.9v16.9m133-16.9v16.9m-395.8-16.9v16.9m-124.7-16.9v16.9m-321.8-16.9v16.9m-126.2-16.9v16.9"
          />
          <text
            transform="translate(1205.461 1147.568)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={26}>
            {"1960"}
          </text>
          <text
            transform="translate(1331.499 1147.568)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={26}>
            {"1968"}
          </text>
          <text
            transform="translate(1589.652 1147.568)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={26}>
            {"1980"}
          </text>
          <text
            transform="translate(1464.282 1147.568)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={26}>
            {"1976"}
          </text>
          <text
            transform="translate(2038.518 1147.568)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={26}>
            {"2008"}
          </text>
          <text
            transform="translate(2171.102 1147.568)"
            fill="#2B4055"
            fontFamily="'SourceSansPro-Regular'"
            fontSize={26}>
            {"2016"}
          </text>
          <path
            fill="none"
            stroke="#5961AC"
            strokeWidth={1.858}
            strokeMiterlimit={10}
            d="M1231.8 1100.3v16.9m-445.1-16.9v16.9m127-16.9v16.9m-510.6-16.9v16.9m128-16.9v16.9m-255-16.9v16.9m1922.2-16.9v16.9m-200.8-16.9v16.9m-383.5-16.9v16.9m-256.2-16.9v16.9m-191.2-16.9v16.9m-314.9-16.9v16.9M659 1100.3v16.9m-191.9-16.9v16.9"
          />
          <path
            fill="none"
            stroke="#2B4055"
            strokeWidth={1.858}
            strokeMiterlimit={10}
            d="M164 873.1h16.9M164 764.3h16.9M164 655.1h16.9M164 543.4h16.9M164 434.3h16.9M164 322.5h16.9M164 213.4h16.9M164 104.3h16.9"
          />
          <path
            fill="none"
            stroke="#EF4458"
            strokeWidth={5.196}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            d="M274.6 807.2l128.6-41.5 63.5-53.2 63.7-49.4 128.4-29.5L786 609.7l68.1-27.3 59.3-6.7"
          />
          <circle fill="#EF4458" cx={274.6} cy={807.2} r={9.8} />
          <circle fill="#EF4458" cx={402.7} cy={764.3} r={9.8} />
          <circle fill="#EF4458" cx={466.4} cy={713} r={9.8} />
          <circle fill="#EF4458" cx={529.8} cy={663.4} r={9.8} />
          <circle fill="#EF4458" cx={658.2} cy={633} r={9.8} />
          <circle fill="#EF4458" cx={785.7} cy={609.9} r={9.8} />
          <circle fill="#EF4458" cx={853.9} cy={582.1} r={9.8} />
          <circle fill="#EF4458" cx={913.4} cy={575.7} r={9.8} />
          <path
            fill="none"
            stroke="#2B4055"
            strokeWidth={5.196}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            d="M1167.2 531h64.2"
          />
          <circle fill="#2B4055" cx={1167.2} cy={531} r={9.8} />
          <circle fill="#2B4055" cx={1231.4} cy={531} r={9.8} />
          <path
            fill="none"
            stroke="#2C9FAA"
            strokeWidth={5.196}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            d="M1293.6 498.1l64.8-91.1 63.7-60.8 65.7-25.1 126.5-59.9 127.7-26.9 127.1-6.6 126.5-3.7 68.3-2 70-2 70-3 69-66"
          />
          <circle fill="#2C9FAA" cx={1293.6} cy={498.1} r={9.8} />
          <circle fill="#2C9FAA" cx={1357.7} cy={408.1} r={9.8} />
          <circle fill="#2C9FAA" cx={1421.5} cy={346.4} r={9.8} />
          <circle fill="#2C9FAA" cx={1487.6} cy={320.2} r={9.8} />
          <circle fill="#2C9FAA" cx={1614} cy={261.1} r={9.8} />
          <circle fill="#2C9FAA" cx={1742.8} cy={233.9} r={9.8} />
          <circle fill="#2C9FAA" cx={1868.1} cy={227.9} r={9.8} />
          <circle fill="#2C9FAA" cx={1995.2} cy={224} r={9.8} />
          <circle fill="#2C9FAA" cx={2063.9} cy={222} r={9.8} />
          <circle fill="#2C9FAA" cx={2133.9} cy={220} r={9.8} />
          <circle fill="#2C9FAA" cx={2203.9} cy={217} r={9.8} />
          <circle fill="#2C9FAA" cx={2273.9} cy={151} r={9.8} />
          <rect x="2100" y="-10" width="450" height="180" fill="white" stroke="black" />
          <text x="2110" y="40" fontSize="40">
            <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" />
            6.03
            <tspan x="2110" y="95">
              Thiago Braz
            </tspan>
            <tspan x="2110" y="145">
              Brazil, Rio de Janeiro
            </tspan>
          </text>
          <g>
            <text
              transform="translate(391.413 33.188)"
              fill="#2B4055"
              fontFamily="'SourceSansPro-Regular'"
              fontSize={38}>
              {"Solid wood and bamboo poles"}
            </text>
            <circle fill="#EF4458" cx={362.8} cy={21.2} r={10.7} />
          </g>
          <g fill="#2B4055">
            <text
              transform="translate(1045.838 31.54)"
              fontFamily="'SourceSansPro-Regular'"
              fontSize={38}>
              {"Metal poles"}
            </text>
            <circle cx={1017.3} cy={19.6} r={10.7} />
          </g>
          <g>
            <text
              transform="translate(1391.184 31.54)"
              fill="#2B4055"
              fontFamily="'SourceSansPro-Regular'"
              fontSize={38}>
              {"Glass and carbon fibre poles"}
            </text>
            <circle fill="#2C9FAA" cx={1362.6} cy={19.6} r={10.7} />
          </g>
          <path
            fill="none"
            stroke="#5961AC"
            strokeWidth={1.858}
            strokeMiterlimit={10}
            d="M1488 1100.3v16.9"
          />
        </svg>
      </div>
      <div className="row-container">
        <h2>Number of olympic medals by country</h2>
        <p>
          Source: All &nbsp;
          <Link href="https://en.wikipedia.org/wiki/1896_Summer_Olympics_medal_table">
            Summer_Olympics_medal_table
          </Link>{" "}
          at Wikipedia.
        </p>
        <StickyContainer>
          <CountrySelect
            width={SELECT_WIDTH}
            options={groupedOptions}
            selectedOption={groupedOptions.slice(0, 11)}
            label="Countries"
            // onChange={onCountriesChange}
          />
        </StickyContainer>
        <BarChart
          data={barChartData
            .sort((a, b) => (a.total_medals < b.total_medals ? 1 : -1))
            .slice(0, 11)}
          values={[
            [
              { property: "gold_medals", color: "#F7C655", label: "Gold Medals" },
              { property: "silver_medals", color: "#AABFBF", label: "Silver Medals" },
              { property: "bronce_medals", color: "#DB8860", label: "Bronce Medals" }
            ]
          ]}
        />
        <a href="/data-olympics.json">
          <button className="btn download-btn">Download Data</button>
        </a>
      </div>
    </section>
  );
};

export default Index;
