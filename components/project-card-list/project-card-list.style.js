import styled from "styled-components";

export const ListContainer = styled.div`
  .swiper-container {
    width: 100%;
  }
  @media (min-width: 240px) {
    .swiper-container {
      width: 330px;
    }
  }
  @media (min-width: 768px) {
    .swiper-container {
      width: 500px;
    }
  }
  @media (min-width: 1024px) {
    .swiper-container {
      width: 100%;
    }
  }
`;

export const CardsContainer = styled.ul`
  display: grid;
  gap: 64px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  padding: 0;
`;
