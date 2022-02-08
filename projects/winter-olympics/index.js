import React from "react";
import Link from "next/link";
import { SectionTitle, MainTitle, MainSubTitle } from "./style";
import WinterOlympicVis from "./WinterOlympicVis";

export const Index = () => {
  return (
    <section className="chart-wrapper winter-wrapper">
      <div className="head-main">
        <SectionTitle>
          Winter Olympics
          <br />
          <img src={"/static/logo-olympics.svg"} alt="logo" />
          <Link href="https://www.freepik.com/macrovector" className="pic-author">
            Remix of athlete set vectors created by macrovector
          </Link>
        </SectionTitle>
      </div>
      <div className="row-container">
        <MainTitle>Gender Gap in Winter Olympic Games</MainTitle>
        <MainSubTitle>Move over the line to see the list of sports by gender per year</MainSubTitle>
        <WinterOlympicVis />
        <p className="sources-text">
          Sources: <Link href="https://www.sports-reference.com/">Sports reference,</Link>{" "}
          <Link href="https://www.kaggle.com/heesoo37/120-years-of-olympic-history-athletes-and-results">
            Kaggle,
          </Link>{" "}
          <Link href="https://www.statista.com/statistics/266368/number-of-winter-olympic-games-participants-since-1924-by-gender/">
            Statista
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Index;
