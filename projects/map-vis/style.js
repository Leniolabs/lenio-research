import styled from "styled-components";

export const SectionTitle = styled.h1`
  font-size: 3rem;
  color: #2a3f55;
  margin: 0 auto 5rem;
  text-align: center;
  .intro-title {
    color: #ff3f55;
    display: block;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  .author {
    display: block;
    font-size: 1.2rem;
    font-weight: normal;
    margin-top: 1rem;
    a {
      color: #2a9faa;
    }
  }
`;

export const StickyContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  // margin: 0 -8%;
  // padding: 1rem 8% 0;
  width: 100%;
  .legends {
    margin: 0 0 1rem auto;
    @media (max-width: 767px) {
      margin: 0 auto 1rem auto;
      font-size: 1rem;
    }
    h3 {
      margin: 0 0 0.5rem;
    }
    .legend-row {
      align-items: center;
      justify-content: space-between;
      display: flex;
      svg {
        margin-right: 5px;
      }
      .legend-data {
        display: inline-flex;
        justify-content: space-between;
        min-width: 360px;
        @media (max-width: 767px) {
          min-width: 300px;
        }
      }
    }
    .legend-number {
      font-weight: bold;
      margin-left: auto;
      min-width: 60px;
      display: flex;
      justify-content: flex-end;
    }
  }
`;

export const Background = styled.rect`
  x: -200;
  y: 60;
  width: 100vw;
  height: 100%;
  fill: transparent;
  @media (max-width: 767px) {
    x: 50;
    width: 135vw;
  }
`;
