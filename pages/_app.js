import { createGlobalStyle, ThemeProvider } from "styled-components";
import Head from "next/head";
import { TrackingProvider } from "analytics/context";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f3f1e5;
    box-sizing: border-box;
    color: #45486d;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1.2rem;
    margin: 0 auto;
    padding: 0;
    &:before, &:after { box-sizing: inherit; }
  }
  

  p a { color: #3baacc; }
  header.with-background {
    background: url("/bg-research.png") no-repeat bottom left;
    background-size: cover;
  }
  .lenio-iso-text {
    font-size: 1.2rem;
    margin: 0 0 0 1.2rem;
  }
  .lenio-iso-text span {
    font-size: 1rem;
  }
  .row-container {
    margin: 0 auto;
    max-width: 45em;
    padding: 1rem;
  }
  .intro {
    line-height: 1.5;
    margin: 5rem 0;
    max-width: 58ch;
    h1 { margin-top: 0; }
    .subhead { color: #549b81; margin-bottom: 0; }
  }
  .kpis-wrapper {
    margin: 0 auto 8rem;
  }
  .kpis {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 3rem;
  }
  .kpi-box {
    margin: 1rem auto;
    text-align: center;
    p {
      font-size: 1.3rem;
      margin: 0;
    }
    &:nth-child(1) {
      .kpi-number { color: #3baacd; }
    }
    &:nth-child(2) {
      .kpi-number { color: #69b29a; }
    }
    &:nth-child(3) {
      .kpi-number { color: #e02045; }
    }
  }
  .kpi-number {
    font-size: 2rem;
    font-weight: bold;
  }
  .chart-wrapper {
    background-color: #fffbf3;
    .main-chart {
      margin: 2rem 0 3rem;
      width: 100%;
    }
  }
  .chart-wrapper.map-viz-wrapper {
    background-color: #fff;
  }
  .main-chart-mapvis {
    > g { cursor: pointer; }
    @media (max-width: 72em) {
      width: 90%;
    }
  }
  .hex-legend { 
    align-items: center;
    display: flex;
    margin: .5rem 0;
    svg { margin-right: 5px;}
  }
  .main-chart-mapvis text { fill: 
    #364157; 
    font-weight: bold;
    text-shadow: -3px -2px white; 
  }
  .main-chart-taxes {
    width: 100%;
    text { 
      fill: #45486d;
    }
  }
  .chart-grid {
    @media (min-width: 48em) {
      display: grid;
      grid-template-columns: 2.5fr 1fr;
      margin-bottom: 3rem;
      width: 100%;
    }
  }
  .btn {
    background-color: transparent;
    border: 2px solid #3baacc;
    border-radius: 50px;
    color: #3baacc;
    cursor: pointer;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    margin-top: 2rem;
    padding: .4rem 1.7rem .5rem;
    text-decoration: none;
    &:hover { background-color: #3baacc; color: white; }
  }
  .btn-map { background-color: #fff; float: left; margin: 0 2rem 1rem 0; }
  footer a { color: #fcfcf4; text-decoration: none; }
  .footer-logo {
    background-color: #354156;
    color: #fcfcf4;
    padding: 2rem;
    text-align: right;
  }
  .btn-prev, .btn-next {
    cursor: pointer;
    &:hover {
      opacity: .7;
      + text {
        opacity: .7;
      }
    }
    + text {
      cursor: pointer;
      pointer-events: none;
      &:hover {
        opacity: .7;
      }
    }
  }
  .tooltip-space {
    background-color: #192638;
    border-radius: 2px;
    color: white;
    letter-spacing: -0.02em;
    line-height: 1.5;
    max-width: 90ch;
    padding: .4rem .8rem;
    text-align: justify;
    a {
      color: #ffca31;
      display: inline-block;
      &:hover { text-decoration: none; }
    }
    @media (max-width: 50em) {
      font-size: 1rem;
    }
  }
  .tooltip-none {
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 50em) {
      font-size: 1rem;
    }
  }
  .main-svg-space {
    background-color: #233042;
  }
`;

const theme = {
  colors: {
    primary: "#45486d"
  }
};

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <TrackingProvider>
          <Component {...pageProps} />
        </TrackingProvider>
      </ThemeProvider>
    </>
  );
}
