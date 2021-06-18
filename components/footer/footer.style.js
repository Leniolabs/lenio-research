import styled, { css } from "styled-components";

export const FooterContainer = styled.footer`
  background-color: #354156;
  color: #fcfcf4;
  padding: 2rem;
  text-align: right;
  grid-area: footer;
`;

export const FooterLogo = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  div {
    font-size: 1rem;
    margin: 0 1rem 0 0;
  }
  ${({ link }) =>
    link &&
    css`
      cursor: pointer;
    `}
`;

export const FooterLogoContainer = styled.div`
  position: absolute;
  bottom: 125px;
  right: 20px;
`;
