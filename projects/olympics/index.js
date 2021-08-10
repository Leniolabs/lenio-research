import * as React from "react";
import Link from "next/link";
import { SectionTitle, MainTitle, MainSubTitle } from "./style";
import { data } from "./data";
// import { BarChart } from "./BarChart";
// import { CountrySelect } from "@projects/vaccinations/components/country-select/countrySelect";
// import { getGroupedOptions, optionGenerator } from "./utils";
import PoleVis from "./PoleVis";

export const Index = () => {
  // const SELECT_WIDTH = 270;
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

  // const countryOptions = React.useMemo(() => {
  //   return optionGenerator(barChartData);
  // }, [barChartData]);

  // const groupedOptions = React.useMemo(() => {
  //   return getGroupedOptions(countryOptions);
  // }, [countryOptions]);

  return (
    <section className="chart-wrapper olympics-wrapper">
      <div className="head-main">
        <SectionTitle>
          Olympics
          <br />
          <img src={"/static/logo-olympics.svg"} alt="logo" />
          <Link href="https://www.freepik.com/macrovector" className="pic-author">
            Remix of athlete set vectors created by macrovector
          </Link>
        </SectionTitle>
      </div>
      <div className="row-container">
        <MainTitle>Pole vault olympic records</MainTitle>
        <MainSubTitle>Evolution of pole materials</MainSubTitle>
        <PoleVis></PoleVis>
        <p className="sources-text">
          Sources:{" "}
          <Link href="https://www.nature.com/nmat/">
            Materials and technology in sport. Mike Caine, Kim Blair and Mike Vasquez. NATURE
            MATERIALS | VOL 11 | AUGUST 2012
          </Link>{" "}
          and{" "}
          <Link href="https://www.youtube.com/watch?v=K9t0JSCxaQY&list=LL&index=9&t=2s">
            Evolution of the Pole Vault Olympic Record! | Top Moments
          </Link>
        </p>
      </div>
      {/*       <div className="row-container">
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
 */}
    </section>
  );
};

export default Index;
