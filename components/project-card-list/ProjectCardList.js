import React, { useState } from "react";
import { ListContainer } from "./project-card-list.style";
import ProjectCard from "../project-card/ProjectCard";
import { useWindowSize } from "utils/useWindowSize";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, Controller } from "swiper";
import PropTypes from "prop-types";
import styled from "styled-components";
import { SectionTitle } from "../../projects/home/home.style";
import "swiper/swiper-bundle.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";

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
const ProjectCardList = ({ list }) => {
  const [width] = useWindowSize();
  const [controlledSwiper, setControllerSwiper] = useState(null);
  return (
    <>
      <Container>
        <SectionTitle>Latest researches</SectionTitle>
        <ControlContainer>
          <button onClick={() => controlledSwiper.slidePrev()}>Prev</button>
          <button onClick={() => controlledSwiper.slideNext()}>Next</button>
        </ControlContainer>
      </Container>
      <ListContainer>
        <Swiper
          id="main"
          scrollbar={{ draggable: true }}
          // pagination={{ clickable: true }}
          slidesPerView={3}
          spaceBetween={50}
          contoller={{ control: controlledSwiper }}
          onSwiper={setControllerSwiper}
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
