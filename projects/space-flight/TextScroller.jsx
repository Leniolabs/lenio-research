import * as React from "react";
import { createPortal } from "react-dom";

export const TOOLTIP_WIDTH = 200;

export const TextTooltip = ({ children, width }) => {
  if (!process.browser) {
    return null;
  }
  const mount = React.useRef(document.getElementById("portal-root"));
  const el = document.createElement("div");

  React.useEffect(() => {
    mount.current.appendChild(el);
    return () => mount.current.removeChild(el);
  }, [el, mount]);

  return createPortal(
    <div className="tooltip-none" style={{ position: "absolute", top: 160, left: 20, width }}>
      {children}
    </div>,
    el
  );
};
