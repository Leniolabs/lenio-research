import * as React from "react";
import Link from "next/link";
import { SectionTitle, MainTitle, MainSubTitle, PlayText } from "./style";
import medals from "./medals.json";
import { useTracking } from "analytics/context";
import { BarChart } from "./BarChart";
import PoleVis from "./PoleVis";
import CustomSelect from "@components/select/select";

const YEAR_OPTIONS = [
  {
    value: "1896",
    name: "Athens, Greece"
  },
  {
    value: "1900",
    name: "Paris, France"
  },
  {
    value: "1904",
    name: "St. Louis, United States"
  },
  {
    value: "1908",
    name: "London, Great Britain"
  },
  {
    value: "1912",
    name: "Stockholm, Sweden"
  },
  {
    value: "1920",
    name: "Antwerp, Belgium"
  },
  {
    value: "1924",
    name: "Paris, France"
  },
  {
    value: "1928",
    name: "Amsterdam,  Netherlands"
  },
  {
    value: "1932",
    name: "	Los Angeles,  United States"
  },
  {
    value: "1936",
    name: "Berlin, Germany"
  },
  {
    value: "1948",
    name: "London, Great Britain"
  },
  {
    value: "1952",
    name: "Helsinki, Finland"
  },
  {
    value: "1956",
    name: "Melbourne, Australia and Stockholm, Sweden"
  },
  {
    value: "1960",
    name: "Rome, Italy"
  },
  {
    value: "1964",
    name: "Tokyo, Japan"
  },
  {
    value: "1968",
    name: "Mexico City, Mexico"
  },
  {
    value: "1972",
    name: "Munich, West Germany"
  },
  {
    value: "1976",
    name: "Montreal, Canada"
  },
  {
    value: "1980",
    name: "Moscow, Soviet Union"
  },
  {
    value: "1984",
    name: "Los Angeles, United States"
  },
  {
    value: "1988",
    name: "Seoul, South Korea"
  },
  {
    value: "1992",
    name: "Barcelona, Spain"
  },
  {
    value: "1996",
    name: "Atlanta, United States"
  },
  {
    value: "2000",
    name: "Sydney, Australia"
  },
  {
    value: "2004",
    name: "Athens, Greece"
  },
  {
    value: "2008",
    name: "Beijing, China"
  },
  {
    value: "2012",
    name: "London, Great Britain"
  },
  {
    value: "2016",
    name: "Rio de Janeiro, Brazil"
  },
  {
    value: "2020",
    name: "Tokyo, Japan"
  }
].map((year, idx) => ({ value: year.value, label: `${year.name} - ${year.value}`, index: idx }));

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
            label="Select Date"
            onChange={onChangeCallback}
            disabledSearch
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
        <div className="justify-center-full-width">
          <p>
            Usa did not finish the olympics. <a>Source link.</a>
          </p>
        </div>
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
