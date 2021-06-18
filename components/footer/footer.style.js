import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: #354156;
  color: #fcfcf4;
  padding: 2rem;
  grid-area: footer;
  display: flex;
  justify-content: space-between;
`;

export const GithubContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  div,
  a {
    display: flex;
    align-items: center;
    font-size: 1rem;
    margin: 0 1rem 0 0;
  }
  svg {
    font-size: 0.7rem;
    margin: 0 1rem 0 0;
    fill: currentColor;
  }
`;

export const CreatedByContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  div,
  a {
    font-size: 1rem;
    margin: 0 1rem 0 0;
  }
`;
