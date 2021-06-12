import React from "react";
import Link from "next/link";
import { Card, CardTitle, CardSubtitle, Button } from "./project-card.style";

const ProjectCard = ({ title, subtitle, imgPreview, description, link }) => {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      <CardSubtitle>{subtitle}</CardSubtitle>
      <img src={imgPreview}></img>
      <p>{description}</p>
      <Link href={link}>
        <Button>Explore Data Visualization</Button>
      </Link>
    </Card>
  );
};

export default ProjectCard;
