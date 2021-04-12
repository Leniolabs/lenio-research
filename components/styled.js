import styled, { css } from "styled-components";

export const LogoHeaderContainer = styled.div`
  align-items: center;
  display: flex;
  ${({ link }) =>
    link &&
    css`
      cursor: pointer;
    `}
`;

export const MainTitle = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const SecondTitle = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

export const RowContainer = styled.div`
  margin: 0 auto;
  max-width: 65em;
  padding: 2rem;
`;

export const Footer = styled.footer`
  background-color: #354156;
  color: #fcfcf4;
  padding: 2rem;
  text-align: right;
`;

export const FooterLogo = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  p {
    font-size: 1rem;
    margin: 0 1rem 0 0;
  }
  ${({ link }) =>
    link &&
    css`
      cursor: pointer;
    `}
`;

export const PostList = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2rem;
  margin: 0 auto;
  max-width: 65em;
`;
