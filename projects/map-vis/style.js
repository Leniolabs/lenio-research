import styled from "styled-components";

export const SectionTitle = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
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
    h3 {
      margin: 0 0 0.5rem;
    }
    .legend-row {
      align-items: center;
      svg {
        margin-right: 5px;
      }
      .legend-data {
        display: inline-flex;
        justify-content: space-between;
        min-width: 200px;
      }
    }
    .legend-number {
      font-weight: bold;
      margin-left: auto;
    }
  }
`;
