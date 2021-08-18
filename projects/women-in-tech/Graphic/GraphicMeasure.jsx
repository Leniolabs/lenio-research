import { memo } from "react";
import { PropTypes } from "prop-types";
import { buildMeasureXCoordinate, buildMeasureYCoordinate } from "../utils";
import { GraphicConstants } from "../utils";
import { GraphicColors } from "../women-in-tech.style";

const { TOP_LIMIT } = GraphicConstants;

const GraphicMeasure = ({ measures, legend = "" }) => (
  <>
    <TopGuideline />
    <Axes />
    <HorizontalMeasures xPoints={measures.xPoints} />
    <VerticalMeasures yPoints={measures.yPoints} />
    <Legend legend={legend} />
  </>
);

GraphicMeasure.propTypes = {
  measures: PropTypes.shape({
    xPoints: PropTypes.any,
    yPoints: PropTypes.any
  }),
  legend: PropTypes.string
};

export default memo(
  GraphicMeasure,
  (prevProps, nextProps) =>
    prevProps.legend === nextProps.legend && prevProps.legend === nextProps.legend
);

const Axes = memo(
  () => (
    <>
      <path className="st2" d="M103.9 598.5L105.4 598.5" />
      <path className="st2" d="M762.6 598.5L764.1 598.5" />
      <path className="st2" d="M103.9 425.5L105.4 425.5" />
      <path className="st2" d="M762.6 425.5L764.1 425.5" />
      <path className="st6" d="M105.2 84.4L105.2 954.4" />
      <path className="st6" d="M943.7 944.1L95.7 944.1" />
    </>
  ),
  () => true
);
Axes.displayName = "Axes";

const TopGuideline = memo(
  () => (
    <path
      fill="none"
      stroke={GraphicColors.LIGHT_GREY}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={0.5}
      d={`M103.9 ${TOP_LIMIT} L943.7 ${TOP_LIMIT}`}
    />
  ),
  () => true
);
TopGuideline.displayName = "TopGuideline";

const HorizontalMeasures = ({ xPoints }) =>
  Object.entries(xPoints).map(([point, data], idx, points) => {
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
  });

const VerticalMeasures = ({ yPoints }) =>
  yPoints.map((yPoint, idx, points) => {
    const { label, visibleMark, hideGuideline } = yPoint;
    const yCoord = buildMeasureYCoordinate(idx, points.length);

    if (!visibleMark) {
      return null;
    }

    return (
      <g key={label}>
        <text className="st7 st11" transform={`translate(72.8 ${+yCoord + 4})`}>
          {label}
        </text>
        <path className="st6" d={`M99.9 ${yCoord} L110.1 ${yCoord}`} />

        {/* Guidelines */}
        {!hideGuideline && <path className="st4" d={`M105.4 ${yCoord} L760.6 ${yCoord}`} />}
      </g>
    );
  });

const Legend = ({ legend }) => (
  <g transform="translate(0, 40)">
    <text transform="rotate(-90 313.1 266.9) " className="st7" fontSize={16}>
      {legend}
    </text>
  </g>
);
