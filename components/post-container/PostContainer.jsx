import * as React from "react";
import { Container, ImageContainer, Image, Title } from "./post-container.style";
import PropTypes from "prop-types";

export const PostContainer = () => {
  return (
    <Container>
      <ImageContainer>
        <Image src="/vaccinations_twitter_cover.png" alt="Vaccinations Post Cover"></Image>
      </ImageContainer>
      <Title>Vaccination Progress</Title>
    </Container>
  );
};

PostContainer.propTypes = {};
