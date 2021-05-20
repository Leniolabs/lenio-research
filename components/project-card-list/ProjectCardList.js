import React from "react";
import { ListContainer } from "./project-card-list.style";
import ProjectCard from "../project-card/ProjectCard";
import { useWindowSize } from "utils/useWindowSize";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";

SwiperCore.use([Navigation, Pagination, Scrollbar]);
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
const ProjectCardList = ({ list }) => {
  const [width] = useWindowSize();
  const slides = list.map((item) => {
    const { key, ...rest } = item;
    return (
      <SwiperSlide key={key}>
        <ProjectCard key={key} {...rest} />
      </SwiperSlide>
    );
  });
  return (
    <ListContainer>
      <Swiper
        id="main"
        navigation
        scrollbar={{ draggable: true }}
        // pagination={{ clickable: true }}
        slidesPerView={3}
        spaceBetween={50}
        freeMode
        breakpoints={breakpoints}>
        {slides}
      </Swiper>
    </ListContainer>
  );
};

export default ProjectCardList;
