import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { SectionTitle, MainTitle, MainSubTitle, PlayText } from "../olympics/style";
import medals from "./medals.json";
import { YEAR_OPTIONS } from "./paralympics.data";
import { useTracking } from "analytics/context";
import { BarChart } from "../olympics/BarChart";
import CustomSelect from "@components/select/select";
import { getOlympicDataToUse } from "../olympics/utils";

export const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [dataIndex, setDataIndex] = useState(0);
  const { logEvent } = useTracking();
  const [dateChange, setDateChange] = useState(null);
  const { current: quantityOfBest } = useRef(11);
  const bestCountriesPerYear = useRef(getOlympicDataToUse(medals, YEAR_OPTIONS, quantityOfBest));
  const [barChartData, setBarChartData] = useState(bestCountriesPerYear.current[`1960`]);

  useEffect(() => {
    setBarChartData(bestCountriesPerYear.current[YEAR_OPTIONS[dataIndex].value]);
  }, [dataIndex]);

  useEffect(() => {
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

  const onChangeCallback = useCallback((option) => {
    logEvent({
      category: "Paralympics",
      action: "Changed Date",
      label: option.value
    });
    setDataIndex(option.index);
  }, []);

  const repeat = () => {
    setDataIndex(0);
  };

  return (
    <section className="chart-wrapper paralympics-wrapper">
      <div className="head-main">
        <SectionTitle>
          Paralympics
          <br />
          <img src={"/static/paralympics-logo.svg"} alt="logo" />
          <a href="https://www.freepik.com/vectors/people" target="blank">Remix of people vector created by freepik</a>
        </SectionTitle>
      </div>
      <div className="row-container">
        <MainTitle>Paralympics medals per country by year</MainTitle>
        <MainSubTitle>Top countries with paralympics medals</MainSubTitle>
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
              { property: "acc_bronze", color: "#DB8860", label: "Bronze Medals" }
            ]
          ]}
        />
        <div className="justify-center-full-width">
          {/* TODO: update data-paralympics.json with read data  */}
          <a href="/static/data-paralympics.json">
            <button className="btn download-btn">Download Data</button>
          </a>
        </div>
        <p className="sources-text">
          Sources:{" "}
          <Link href="https://en.wikipedia.org/wiki/1960_Summer_Paralympics_medal_table">
            Summer_Paralympics_medal_table
          </Link>{" "}
          at Wikipedia.
        </p>
      </div>
    </section>
  );
};

export default Index;
