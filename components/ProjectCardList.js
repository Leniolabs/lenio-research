import React from "react";
import styled from "styled-components";
import ProjectCard from "./ProjectCard";

const List = styled.ul`
  display: grid;
  gap: 64px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  padding: 0;
`;
const ProjectCardList = ({ list }) => {
  return (
    <List>
      {list.map(({ key, ...rest }) => (
        <ProjectCard key={key} {...rest}></ProjectCard>
      ))}
    </List>
  );
};

export default ProjectCardList;
