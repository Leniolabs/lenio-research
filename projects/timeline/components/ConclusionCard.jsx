import React from "react";
import { Conclusion } from "../timeline.style";
import PropTypes from "prop-types";

const ConclusionCard = ({ outcome, color, content, link }) => {
  const [_, mainContent, author] = content.match(/(.*)-(.*)/);
  return (
    <Conclusion>
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
