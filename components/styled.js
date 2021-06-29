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
export const HeadLogoContainer = styled.div`
  padding: 2rem;
`;

export const PostList = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2rem;
  margin: 0 auto;
  max-width: 65em;
`;

export const SectionTitle = styled.h2`
  color: #ffba58;
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: 500;
`;
