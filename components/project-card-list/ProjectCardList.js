import React from "react";
// import { List } from "./project-card-list.style";
import ProjectCard from "../project-card/ProjectCard";
import { useWindowSize } from "utils/useWindowSize";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";

SwiperCore.use([Navigation, Pagination, Scrollbar]);

const ProjectCardList = ({ list }) => {
  const [width] = useWindowSize();
  const slides = list.map((item) => {
    const { key, ...rest } = item;
    return (
      <SwiperSlide key={key}>
        {/* <List> */}
        <ProjectCard key={key} {...rest} />
        {/* </List> */}
      </SwiperSlide>
    );
  });
  return (
    <React.Fragment>
      {/* {width > 728 && (
        <Swiper
          id="main"
          navigation
          scrollbar={{ draggable: true }}
          slidesPerView={3}
          spaceBetween={10}
          freeMode>
          {slides}
        </Swiper>
      )} */}
      {/* {width > 728 && ( */}
      <Swiper
        id="main"
        navigation
        pagination={{ clickable: true }}
        slidesPerView={1}
        spaceBetween={30}
        loop>
        {slides}
      </Swiper>
      {/* )} */}
    </React.Fragment>
  );
};

export default ProjectCardList;
