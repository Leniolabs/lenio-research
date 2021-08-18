import { useMemo } from "react";
import { GraphicColors } from "../women-in-tech.style";
import { PropTypes } from "prop-types";

const GraphicFooter = ({ sources }) => {
  const formattedSources = useMemo(() => {
    sources = `Sources: ${sources}`;

    return sources
      .split("\n")
      .map((str) => str.trim())
      .map((line, idx) => (
        <tspan key={line} x={0} y={idx * 15} className="st7 st14">
          {line}
        </tspan>
      ));
  }, [sources]);

  return (
    <>
      <path
        d="M161.4 1050.7h-55.1v-55.1h55.1v13.7h-2.8v-10.9h-49.5v49.5h49.5v-11.4h2.8v14.2z"
        className="st15"
      />
      <path
        d="M130.1 1028.4h6.9v2.3h-9.7V1016h2.8v12.4zm18.6 4.5h-9.2v-2.2h9.2v2.2z"
        className="st15"
      />
      <circle cx={116.4} cy={1006.1} r={3.2} fill={GraphicColors.CYAN} />

      <text transform="translate(175.8 1017.8)">
        <tspan x={0} y={0} className="st7 st19">
          {"Data Research "}
        </tspan>
        <tspan x={0} y={22} className="st7 st19">
          {"by Leniolabs_"}
        </tspan>
      </text>

      <path fill="none" d="M644.1 1004.9H964.3V1041.8H644.1z" />
      <text transform="translate(644.1 1013.4)">{formattedSources}</text>
    </>
  );
};

GraphicFooter.propTypes = {
  sources: PropTypes.string
};

export default GraphicFooter;
