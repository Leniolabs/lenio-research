import * as React from "react";
import { createPortal } from "react-dom";

export const TOOLTIP_WIDTH = 200;

const SVGToScreen = (svg, svgX, svgY) => {
  let p = svg.createSVGPoint();
  p.x = svgX;
  p.y = svgY;
  return p.matrixTransform(svg.getScreenCTM());
};


export const TextTooltip = ({ svg, children, positionX, positionY }) => {
  
  const [position, setPosition] = React.useState([0, 0]);
  if (!process.browser) {
    return null;
  }
  const mount = React.useRef(document.getElementById("portal-root"));
  const el = document.createElement("div");
  React.useEffect(() => {
    const screenPosition = SVGToScreen(svg.current, positionX - TOOLTIP_WIDTH / 2, positionY);
    setPosition([screenPosition.x, screenPosition.y]);
  }, [children, positionX, positionY]);

  React.useEffect(() => {
    mount.current.appendChild(el);
    return () => mount.current.removeChild(el);
  }, [el, mount]);

  return createPortal(
    <div className="tooltip-none" style={{ position: "absolute", top: position[1], left: position[0] }}>{children}</div>,
    el
  );
};
