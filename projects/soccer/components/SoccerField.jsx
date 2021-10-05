import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { scaleLinear } from "d3-scale";

const FIELD_WIDTH = 680;
const FIELD_HEIGHT = 1050;
const MARGIN = {
  TOP: 20,
  BOTTOM: 20
};

const Field = styled.rect`
  stroke: white;
  fill: green;
  stroke-width: 4;
`;

const GoalArea = styled.path`
  stroke: white;
  fill: none;
  stroke-width: 4;
`;
const PenaltyPoint = styled.circle`
  stroke: white;
  fill: white;
  stroke-width: 4;
`;
const MiddleCircle = styled(PenaltyPoint)`
  fill: none;
`;
const AreaCircle = styled(PenaltyPoint)`
  fill: none;
`;
const PenaltyArea = styled.path`
  stroke: white;
  fill: green;
  stroke-width: 4;
`;
const Line = PenaltyArea;
const Goal = styled(PenaltyArea)`
  stroke: yellow;
`;

export const SoccerField = ({ onClick, field }) => {
  const [coords, setCoords] = React.useState({
    received: [],
    shot: []
  });
  const scale = React.useMemo(() => {
    return scaleLinear().range([0, 1400]).domain([0, 1400]);
  }, []);
  const svg = React.useRef();

  const getCoords = React.useCallback(
    (evt) => {
      const point = svg.current.createSVGPoint();
      point.x = evt.clientX;
      point.y = evt.clientY;
      const cursorPoint = point.matrixTransform(svg.current.getScreenCTM().inverse());
      const newCoords = [scale.invert(cursorPoint.x - 20), scale.invert(cursorPoint.y - 20)];
      onClick(newCoords);
      setCoords({
        ...coords,
        [field]: newCoords
      });
    },
    [onClick]
  );

  return (
    <svg
      ref={svg}
      height={1400 - (MARGIN.TOP + MARGIN.BOTTOM)}
      width={800}
      viewBox={`0 0 ${700} ${1400}`}>
      <rect
        x={0}
        y={0}
        width={scale(FIELD_WIDTH + 40)}
        height={scale(FIELD_HEIGHT + 40)}
        fill={"green"}></rect>
      <g onClick={getCoords} transform={`translate(${scale(20)}, ${scale(20)})`}>
        <Field x={0} y={0} width={scale(FIELD_WIDTH)} height={scale(FIELD_HEIGHT)} />
        <Line
          d={`M 0 ${scale(FIELD_HEIGHT / 2)}
              L ${scale(FIELD_WIDTH)} ${scale(FIELD_HEIGHT / 2)}`}
        />
        <MiddleCircle cx={scale(FIELD_WIDTH / 2)} cy={scale(FIELD_HEIGHT / 2)} r={scale(91.5)} />
        <AreaCircle cx={scale(FIELD_WIDTH / 2)} cy={scale(110)} r={scale(91.5)} />
        <AreaCircle cx={scale(FIELD_WIDTH / 2)} cy={scale(FIELD_HEIGHT - 110)} r={scale(91.5)} />
        <PenaltyArea
          d={`M ${scale(101.5)} ${2}
              L ${scale(101.5)} ${scale(160.5)}
              L ${scale(FIELD_WIDTH - 101.5)} ${scale(160.5)}
              L ${scale(FIELD_WIDTH - 101.5)} ${scale(2)}
          `}
        />
        <PenaltyPoint cx={scale(FIELD_WIDTH / 2)} cy={scale(110)} r={scale(1)} />
        <GoalArea
          d={`M ${scale(211.5)} ${0}
              L ${scale(211.5)} ${scale(55)}
              L ${scale(FIELD_WIDTH - 211.5)} ${scale(55)}
              L ${scale(FIELD_WIDTH - 211.5)} ${scale(0)}
          `}
        />
        <PenaltyArea
          d={`M ${scale(101.5)} ${scale(FIELD_HEIGHT - 2)}
              L ${scale(101.5)} ${scale(FIELD_HEIGHT - 160.5)}
              L ${scale(FIELD_WIDTH - 101.5)} ${scale(FIELD_HEIGHT - 160.5)}
              L ${scale(FIELD_WIDTH - 101.5)} ${scale(FIELD_HEIGHT - 2)}
          `}
        />
        <PenaltyPoint cx={scale(FIELD_WIDTH / 2)} cy={scale(FIELD_HEIGHT - 110)} r={scale(1)} />
        <GoalArea
          d={`M ${scale(211.5)} ${scale(FIELD_HEIGHT)}
              L ${scale(211.5)} ${scale(FIELD_HEIGHT - 55)}
              L ${scale(FIELD_WIDTH - 211.5)} ${scale(FIELD_HEIGHT - 55)}
              L ${scale(FIELD_WIDTH - 211.5)} ${scale(FIELD_HEIGHT)}
          `}
        />
        <Goal
          id="goal_top"
          stroke={"yellow"}
          fill={"none"}
          strokeWidth={4}
          d={`M ${scale(FIELD_WIDTH / 2 - 73)} ${scale(0)}
              L ${scale(FIELD_WIDTH / 2 + 73)} ${scale(0)}
          `}
        />
        <Goal
          id="goal_bottom"
          stroke={"yellow"}
          fill={"none"}
          strokeWidth={4}
          d={`M ${scale(FIELD_WIDTH / 2 - 73)} ${scale(FIELD_HEIGHT)}
              L ${scale(FIELD_WIDTH / 2 + 73)} ${scale(FIELD_HEIGHT)}
          `}
        />
        {coords.received.length > 0 && (
          <circle cx={coords.received[0]} cy={coords.received[1]} r="7" fill="blue" />
        )}
        {coords.shot.length > 0 && (
          <circle cx={coords.shot[0]} cy={coords.shot[1]} r="7" fill="red" />
        )}
      </g>
    </svg>
  );
};

SoccerField.propTypes = {
  onClick: PropTypes.func
};
