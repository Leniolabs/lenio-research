import React from "react";
import Link from "next/link";
import { Card, CardTitle, CardSubtitle, Button } from "./project-card.style";
import PropTypes from "prop-types";

const ProjectCard = ({ title, subtitle, imgPreview, description, link }) => {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      <CardSubtitle>{subtitle}</CardSubtitle>
      <img src={imgPreview} alt="preview of post"></img>
      <p>{description}</p>
      <Link href={link}>
        <Button>Explore Data Visualization</Button>
      </Link>
    </Card>
  );
};

ProjectCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  imgPreview: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string
};

export default ProjectCard;
