import styled from "styled-components";

export const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

export const PlayText = styled.button`
  background-color: #3baacc;
  border: 0 solid #5a60ab;
  border-radius: 4px;
  color: white;
  cursor:pointer;
  font-size: 1rem;
  font-weight: bolder;
  margin-top: 2rem;
  padding: .3rem 1rem;
  transition .3s ease all;
  &:hover {
    background-color: #5a60ab;
    color: white;
  }
`;

export const StickyContainer = styled.div`
  background: rgba(255, 251, 243, 0.9);
  margin: 0 -8%;
  padding: 1rem 8% 0;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
`;
