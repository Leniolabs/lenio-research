import styled from "styled-components";

export const PlayText = styled.button`
  background-color: ${(props) => props.disabled ? '#b5b5b5': '#3baacc'};
  border: 0 solid #5a60ab;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
  font-weight: bolder;
  margin: 1rem 0;
  padding: .3rem 1rem;
  transition .3s ease all;
  opacity: ${(props) => props.disabled ? '0.4': '1'};
  &:hover {
    background-color: ${(props) => props.disabled ? '#b5b5b5': '#5a60ab'};
    color: white;
    cursor: ${(props) => props.disabled ? 'default': 'pointer'};
  }
`;

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
  img {
    margin-top: 1rem;
    + a {
      color: inherit;
      font-size: 0.8rem;
      font-weight: normal;
      opacity: 0.8;
      position: absolute;
      bottom: -24px;
      right: 10px;
      text-decoration: none;
      &:hover {
        opacity: 1;
      }
    }
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

export const MainTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 0.5rem;
`;

export const MainSubTitle = styled.p`
  font-size: 1.3rem;
  font-weight: normal;
  margin: 0 auto 3rem;
  text-align: center;
`;

export const poleGif = styled.image`
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
