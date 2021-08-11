import * as React from "react";
import Link from "next/link";
import { SectionTitle, MainTitle, MainSubTitle, PlayText } from "./style";
import medals from "./medals.json";
import { YEAR_OPTIONS } from "./olympics.data";
import { useTracking } from "analytics/context";
import { BarChart } from "./BarChart";
import PoleVis from "./PoleVis";
import CustomSelect from "@components/select/select";

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
        <MainTitle>Olympic medals per country by year</MainTitle>
        <MainSubTitle>Top 12 countries with olympic medals</MainSubTitle>
        <div className="justify-center-full-width">
          <CustomSelect
            options={YEAR_OPTIONS}
            selectedOption={YEAR_OPTIONS[dataIndex]}
            label=""
            isDisabled={isPlaying}
            onChange={onChangeCallback}
            disabledSearch
            width={300}
            maxWidth={700}
          />
        </div>
        <div className="justify-center-full-width">
          <PlayText
            x="50"
            disabled={isPlaying && dataIndex < YEAR_OPTIONS.length - 1}
            onClick={() => (dataIndex === YEAR_OPTIONS.length - 1 ? repeat() : setIsPlaying(true))}>
            {dataIndex === YEAR_OPTIONS.length - 1 ? "▶️ Replay" : "▶️ Play"}
          </PlayText>
        </div>
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
        <p className={`olympics-sources-text${YEAR_OPTIONS[dataIndex].value === "1948" ? ' bold-source-text' : ''}`}>
          1948: Germany and Japan were not invited to participate in the games. {' '}
          <Link href="https://en.wikipedia.org/wiki/1948_Summer_Olympics">Source link.</Link>
        </p>
        <p className={`olympics-sources-text${YEAR_OPTIONS[dataIndex].value === "1980" ? ' bold-source-text' : ''}`}>
          1980: USA and Japan were part of the boycott to protest against the Soviet invasion of Afghanistan. {' '}
          <Link href="https://en.wikipedia.org/wiki/1948_Summer_Olympics">Source link.</Link>
        </p>
        <p className={`olympics-sources-text${YEAR_OPTIONS[dataIndex].value === "1984" ? ' bold-source-text' : ''}`}>
          1984: Russia and Poland were part of the boycott claiming 'chauvinistic sentiments and an anti-Soviet hysteria being whipped up in the United States. {' '}
          <Link href="https://en.wikipedia.org/wiki/1948_Summer_Olympics">Source link.</Link>
        </p>
        <div className="justify-center-full-width">
          <a href="/data-olympics.json">
            <button className="btn download-btn">Download Data</button>
          </a>
        </div>
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
