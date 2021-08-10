import * as React from "react";
import Link from "next/link";
import { SectionTitle, MainTitle, MainSubTitle, PlayText } from "./style";
import medals from "./medals.json";
import { useTracking } from "analytics/context";
import { BarChart } from "./BarChart";
import PoleVis from "./PoleVis";
import CustomSelect from "@components/select/select";

const YEAR_OPTIONS = [
  "1896",
  "1900",
  "1904",
  "1908",
  "1912",
  "1920",
  "1924",
  "1928",
  "1932",
  "1936",
  "1948",
  "1952",
  "1956",
  "1960",
  "1964",
  "1968",
  "1972",
  "1976",
  "1980",
  "1984",
  "1988",
  "1992",
  "1996",
  "2000",
  "2004",
  "2008",
  "2012",
  "2016",
  "2020"
].map((year, idx) => ({ value: year, label: year, index: idx }));

export const Index = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [dataIndex, setDataIndex] = React.useState(0);
  const { logEvent } = useTracking();
  const [dateChange, setDateChange] = React.useState(null);
  const [barChartData, setBarChartData] = React.useState(medals[1896]);

  React.useEffect(() => {
    setBarChartData(
      medals[YEAR_OPTIONS[dataIndex].value]
        .sort((a, b) => (a.total_medals < b.total_medals ? 1 : -1))
        .slice(0, 11)
    );
  }, [dataIndex]);

  React.useEffect(() => {
    if (dataIndex < YEAR_OPTIONS.length - 1 && isPlaying) {
      setTimeout(() => {
        if (dateChange) {
          setDataIndex(dateChange);
          setDateChange(null);
        } else {
          setDataIndex((prevDataIndex) => prevDataIndex + 1);
        }
      }, 1000);
    } else {
      setIsPlaying(false);
    }
  }, [dataIndex, isPlaying]);

  const onChangeCallback = React.useCallback((option) => {
    logEvent({
      category: "Olympics",
      action: "Changed Date",
      label: option.value
    });
    setDataIndex(option.index);
  }, []);

  const repeat = () => {
    setDataIndex(0);
  };

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
      <div className="row-container">
        <MainTitle>Medals accumulated by year</MainTitle>
        <MainSubTitle>Olympic medals per country over time</MainSubTitle>
        <CustomSelect
          options={YEAR_OPTIONS}
          selectedOption={YEAR_OPTIONS[dataIndex]}
          label="Select Date"
          onChange={onChangeCallback}
        />
        <PlayText x="50" disabled={isPlaying && dataIndex < YEAR_OPTIONS.length - 1} onClick={() => dataIndex === YEAR_OPTIONS.length - 1 ? repeat() : setIsPlaying(true)}>
          {dataIndex === YEAR_OPTIONS.length - 1 ? "⏹ Reset" : "▶️ Play"}
        </PlayText>
        <BarChart
          data={barChartData}
          values={[
            [
              { property: "acc_gold", color: "#F7C655", label: "Gold Medals" },
              { property: "acc_silver", color: "#AABFBF", label: "Silver Medals" },
              { property: "acc_bronce", color: "#DB8860", label: "Bronce Medals" }
            ]
          ]}
        />
        <a href="/data-olympics.json">
          <button className="btn download-btn">Download Data</button>
        </a>
        <p className="sources-text">
          Sources:{" "}
          <Link href="https://en.wikipedia.org/wiki/1896_Summer_Olympics_medal_table">
            Summer_Olympics_medal_table
          </Link>{" "}
          at Wikipedia.
        </p>
      </div>
    </section>
  );
};

export default Index;
