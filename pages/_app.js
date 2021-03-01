import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:regular,bold,italic&subset=latin,latin-ext');
  body {
    background-color: #FCFCF4;
    box-sizing: border-box;
    color: #223042;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1.2rem;
    margin: 0 auto;
    padding: 0;
    &:before, &:after { box-sizing: inherit; }
  }
  header {
    background: url("/bg-research.png") no-repeat bottom left;
    background-size: cover;
  }
  .logo {
    align-items: center;
    display: flex;
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
    padding: 2rem;
  }
  .intro {
    margin: 8rem 0;
    max-width: 50ch;
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
    background-color: #f8f3dc;
    .main-chart {
      height: 520px;
      margin-top: 5rem;
      width: 100%;
    }
  }
  .legend { 
    align-items: center;
    color: #5a60ab;
    display: inline-flex;
    font-size: 1rem;
    margin: 1rem;
    svg { margin-right: .5rem; }
  }
  .btn {
    background-color: #69b29a;
    border: 0;
    border-radius: 50px;
    color: white;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    padding: .6rem 1.7rem .7rem;
    &:hover { background-color: #549b81}
  }
  .footer-logo {
    align-items: center;
    display:flex;
    justify-content: flex-end;
    p { font-size: 1rem; margin: 0 1rem 0 0; }
  }
`;

const theme = {
  colors: {
    primary: "#354156"
  }
};

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
