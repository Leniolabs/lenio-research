import PropTypes from "prop-types";
import { buildMeasureXCoordinate, buildMeasureYCoordinate, GraphicConstants } from "../utils";
import { svgStyles } from "../women-in-tech.style";

const { TOP_LIMIT } = GraphicConstants;

export const DistributionContainer = ({ children, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    x={0}
    y={0}
    viewBox="0 0 994.6 1078.8"
    xmlSpace="preserve"
    css={svgStyles}
    {...props}>
    <path fill="#fffefa" d="M0 0H994.6V1078.8H0z" />
    {children}
  </svg>
);

DistributionContainer.propTypes = {
  children: PropTypes.any
};

export const DistributionTitle = () => (
  <text transform="translate(230.2 58.6)" className="st7" fontSize={30}>
    Percentage of Women Bachelors by field
  </text>
);

export const DistributionMeasures = ({ measures }) => (
  <>
    {/* Y points and labels */}
    {Object.entries(measures.yPoints).map(([point, data], idx, points) => {
      const yCoord = buildMeasureYCoordinate(idx, points.length);

      if (!data.visibleMark) {
        return null;
      }

      return (
        <g key={point}>
          <text className="st7 st11" transform={`translate(72.8 ${+yCoord + 4})`}>
            {point}
          </text>
          <path className="st6" d={`M99.9 ${yCoord} L110.1 ${yCoord}`} />

          {/* Guidelines */}

          {!data.hideGuideline && <path className="st4" d={`M105.4 ${yCoord} L760.6 ${yCoord}`} />}
        </g>
      );
    })}

    {/* X points and labels */}
    {Object.entries(measures.xPoints).map(([point, data], idx, points) => {
      const xCoord = buildMeasureXCoordinate(idx, points.length);

      if (!data.visibleMark) {
        return null;
      }

      return (
        <g key={point}>
          <path className="st6" d={`M${xCoord} 938.9L${xCoord} 949.1`} />
          <text className="st7 st14" transform={`translate(${+xCoord - 13} 963)`}>
            {point}
          </text>
        </g>
      );
    })}

    {/* Top Guide line */}
    <path
      fill="none"
      stroke="#d3d3d3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={0.5}
      d={`M103.9 ${TOP_LIMIT} L943.7 ${TOP_LIMIT}`}
    />

    {/* Axes */}
    <path className="st2" d="M103.9 598.5L105.4 598.5" />
    <path className="st2" d="M762.6 598.5L764.1 598.5" />
    <path className="st2" d="M103.9 425.5L105.4 425.5" />
    <path className="st2" d="M762.6 425.5L764.1 425.5" />
    <path className="st6" d="M105.2 84.4L105.2 954.4" />
    <path className="st6" d="M943.7 944.1L95.7 944.1" />

    <text transform="rotate(-90 313.1 266.9)" className="st7" fontSize={16}>
      % of degrees granted to women
    </text>
  </>
);

DistributionMeasures.propTypes = {
  measures: PropTypes.shape({
    xPoints: PropTypes.any,
    yPoints: PropTypes.any
  })
};

export const DistributionFooter = () => (
  <>
    <path
      d="M161.4 1050.7h-55.1v-55.1h55.1v13.7h-2.8v-10.9h-49.5v49.5h49.5v-11.4h2.8v14.2z"
      className="st15"
    />
    <path
      d="M130.1 1028.4h6.9v2.3h-9.7V1016h2.8v12.4zm18.6 4.5h-9.2v-2.2h9.2v2.2z"
      className="st15"
    />
    <circle cx={116.4} cy={1006.1} r={3.2} fill="#32aab3" />

    <text transform="translate(175.8 1017.8)">
      <tspan x={0} y={0} className="st7 st19">
        {"Data Research "}
      </tspan>
      <tspan x={0} y={22} className="st7 st19">
        {"by Leniolabs_"}
      </tspan>
    </text>

    <path fill="none" d="M644.1 1004.9H964.3V1041.8H644.1z" />
    <text transform="translate(644.1 1013.4)">
      <tspan x={0} y={0} className="st7 st14">
        {"Sources:"}
      </tspan>
      <tspan x={45.7} y={0} className="st7 st14">
        {" National Center for Education Statistics, tables 325 - "}
      </tspan>
      <tspan x={0} y={15} className="st7 st14">
        {"trends in degrees by field and sex"}
      </tspan>
    </text>
  </>
);
