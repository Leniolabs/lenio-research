/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Conclusion } from "../timeline.style";
import PropTypes from "prop-types";

const ConclusionCard = ({ outcome, color, content, link, variants, logo }) => {
  const [_, mainContent, author] = content.match(/(.*)-(.*)/);
  return (
    <Conclusion variants={variants}>
      <p>
        <svg width="15" height="15">
          <rect width="15" height="15" fill={color} />
        </svg>
        {outcome}
      </p>
      <blockquote>
        {mainContent} <span>-{author}</span>
      </blockquote>
      <a href={link}>Source</a>
      {logo && (
        <div className="image-wrapper">
          <img src={logo.src} alt={logo.alt}></img>
        </div>
      )}
    </Conclusion>
  );
};

ConclusionCard.prototype = {
  outcome: PropTypes.string,
  color: PropTypes.string,
  content: PropTypes.string,
  link: PropTypes.string
};

export default ConclusionCard;
