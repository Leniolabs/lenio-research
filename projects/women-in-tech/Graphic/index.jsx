import GraphicTitle from "./GraphicTitle";
import GraphicFooter from "./GraphicFooter";
import GraphicMeasure from "./GraphicMeasure";
import GraphicEntry from "./GraphicEntry";
import PropTypes from "prop-types";
import { GraphicColors, svgStyles } from "../women-in-tech.style";

const Graphic = ({ children, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    x={0}
    y={0}
    viewBox="0 0 994.6 1078.8"
    xmlSpace="preserve"
    css={svgStyles}
    {...props}>
    <path fill={GraphicColors.WHITE} d="M0 0H994.6V1078.8H0z" />
    {children}
  </svg>
);

Graphic.Title = GraphicTitle;
Graphic.Footer = GraphicFooter;
Graphic.Measure = GraphicMeasure;
Graphic.Entry = GraphicEntry;

Graphic.propTypes = {
  children: PropTypes.any
};

export default Graphic;
