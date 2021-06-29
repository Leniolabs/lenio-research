import React from "react";
import { Conclusion } from "../timeline.style";
import PropTypes from "prop-types";

const ConclusionCard = ({ outcome, color, content, link, variants }) => {
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
      <svg className="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g fill="#d32f2f"><rect width="96" height="512" x="304"/><rect width="96" height="512" x="112"/></g><polygon fill="#f44336" points="400 512 304 512 112 0 208 0"/></svg>      <a href={link}>Source</a>
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
