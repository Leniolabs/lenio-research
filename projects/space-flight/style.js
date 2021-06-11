import styled from "styled-components";

export const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  span {
    font-size: 1.2rem;
    display: block;
    color: #ff7d31;
    text-align: center;
  }
`;

export const SectionSubTitle = styled.h3`
  font-size: 1.4rem;
  text-align: center;
`;

export const TextDisclaimer = styled.p`
  font-size: 0.9rem;
  font-style: italic;
  margin: 1rem;
  text-align: right;
`;
