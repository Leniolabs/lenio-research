import React from "react";
import { List } from "./project-card-list.style";
import ProjectCard from "../project-card/ProjectCard";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";

SwiperCore.use([Navigation, Pagination, Scrollbar]);

const ProjectCardList = ({ list }) => {
  const slides = list.map((item) => {
    const { key, ...rest } = item;
    return (
      <SwiperSlide key={key}>
        <List>
          <ProjectCard key={key} {...rest} />
        </List>
      </SwiperSlide>
    );
  });
  return (
    <React.Fragment>
      <Swiper
        id="main"
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        spaceBetween={0}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}>
        {slides}
      </Swiper>
    </React.Fragment>
  );
};

export default ProjectCardList;
