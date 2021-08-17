import { memo } from "react";
import { PropTypes } from "prop-types";

const GraphicTitleComponent = ({ title = "" }) => (
  <text transform="translate(230.2 58.6)" className="st7" fontSize={30}>
    {title}
  </text>
);

GraphicTitleComponent.propTypes = {
  title: PropTypes.string
};

export default memo(
  GraphicTitleComponent,
  (prevProps, nextProps) => prevProps.title === nextProps.title
);
