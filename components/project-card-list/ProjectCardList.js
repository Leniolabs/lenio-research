import React from "react";
// eslint-disable-next-line no-unused-vars
import { CardsContainer, ListContainer } from "./project-card-list.style";
import ProjectCard from "../project-card/ProjectCard";
import SwiperCore, { Navigation, Pagination, Scrollbar, Controller } from "swiper";
import PropTypes from "prop-types";
import "swiper/swiper-bundle.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { SectionTitle } from "../../projects/home/home.style";
import NextIcon from "../../projects/svg-components/next-icon";
import PrevIcon from "../../projects/svg-components/prev-icon";

SwiperCore.use([Navigation, Pagination, Scrollbar, Controller]);
const breakpoints = {
  240: {
    slidesPerView: 1
  },
  768: {
    slidesPerView: 2
  },
  1024: {
    slidesPerView: 3
  }
};
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ControlContainer = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonSlide = styled.button`
  border: none;
  background: #00000000;
  padding: 4;
`;
const ProjectCardList = ({ list }) => {
  const [swiper, setSwiper] = React.useState(null);
  const [isBeginning, setIsBeginning] = React.useState(true);
  const [isEnd, setIsEnd] = React.useState(false);

  return (
    <>
      <Container>
        <SectionTitle>Latest researches</SectionTitle>
        <ControlContainer>
          <ButtonSlide
            onClick={() => {
              swiper.slidePrev();
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            style={{ cursor: `${isBeginning ? `not-allowed` : `pointer`}` }}>
            <PrevIcon disabled={isBeginning} />
          </ButtonSlide>
          <ButtonSlide
            onClick={() => {
              swiper.slideNext();
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            style={{ cursor: `${isEnd ? `not-allowed` : `pointer`}` }}>
            <NextIcon disabled={isEnd} />
          </ButtonSlide>
        </ControlContainer>
      </Container>
      <ListContainer>
        <Swiper
          id="main"
          scrollbar={{ draggable: true }}
          // pagination={{ clickable: true }}
          slidesPerView={3}
          spaceBetween={50}
          contoller={{ control: swiper }}
          onSwiper={setSwiper}
          breakpoints={breakpoints}>
          {list.map((item) => {
            const { key, ...rest } = item;
            return (
              <SwiperSlide key={key}>
                <ProjectCard key={key} {...rest} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </ListContainer>
    </>
  );
};

ProjectCardList.propTypes = {
  list: PropTypes.array
};

export default ProjectCardList;
