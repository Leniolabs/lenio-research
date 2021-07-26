import * as React from "react";
import { SectionTitle } from "../map-vis/style";
import { data } from "./data";
import { BarChart } from "./BarChart";

export const Index = () => {

  const initialBarChartData = data.reduce((acc, it) => {
    acc[it.code] = {
      country: it.country,
      code: it.code,
      total_medals: ((acc[it.code] && acc[it.code].total_medals) || 0) + it.total_medals || 0,
      gold_medals: ((acc[it.code] && acc[it.code].gold_medals) || 0) + it.gold_medals || 0,
      silver_medals: ((acc[it.code] && acc[it.code].silver_medals) || 0) + it.silver_medals || 0,
      bronce_medals: ((acc[it.code] && acc[it.code].bronce_medals) || 0) + it.bronce_medals || 0,
    };
    return acc;
  }, {});

  const barChartData = [];
  for (const country in initialBarChartData) {
    barChartData.push(initialBarChartData[country]);
  }

  return (
    <section className="chart-wrapper olympics-wrapper">
      <div className="head-main">
        <SectionTitle>
          <span className="intro-title">Data visualizations of</span>
          Olympics
          <br /><img src={'/logo-olympics.svg'} alt='logo' width="100px" />
        </SectionTitle>
      </div>
      <div className="row-container">
        <h2>Number of olympic medals by country</h2>
      <BarChart
        data={barChartData.sort((a, b) => (a.total_medals < b.total_medals) ? 1 : -1).slice(0, 10)}
        values={[[
          { property: "gold_medals", color: "#F7C655", label: "medals of Gold" },
          { property: "silver_medals", color: "#AABFBF", label: "medals of Silver" },
          { property: "bronce_medals", color: "#DB8860", label: "medals of Bronce" }
        ]]} />
      </div>
    </section>
  )
}

export default Index;
