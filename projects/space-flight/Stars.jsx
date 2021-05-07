import * as React from "react";
import { useWindowSize } from "utils/useWindowSize";

export const Stars = ({ scale }) => {
  const size = useWindowSize();

  const scaleN = React.useMemo(() => {
    const s = Math.log(Math.log(scale(5193000001))) * 1.0313 + 0.2369 || 3.43;

    const [width] = size;

    if (1207 * s < width) return width / 1207;
    return s;
  }, [scale, size]);

  return (
    <svg height={760} y={-150} style={{ overflow: "hidden", opacity: 0.5 }}>
      <g
        transform={`translate(0, 400) scale(${scaleN}) translate(0, -400)`}
        style={{ transition: "all 0.4s ease-out" }}>
        <image href={"./stars-bg.svg"} width="1212" height="900" />
        <image href={"./stars.svg"} width="1212" height="900" />
        <image href={"./constelations.svg"} width="1212" height="900" />
      </g>
    </svg>
  );
};

Stars.propTypes = {};
