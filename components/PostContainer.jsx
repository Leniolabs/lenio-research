import * as React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  width: 200px;
  height: 120px;
  border: 1px solid white;
`;
const ImageContainer = styled.div`
  width: 200px;
  height: 100px;
`;
const Image = styled.img`
  width: 200px;
  height: 100px;
`;
const Title = styled.div``;

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
