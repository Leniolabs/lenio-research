import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { scaleLinear } from "d3-scale";
import GoalRecord from "./GoalRecord";
import { GridInformation, Button, SmallParagraph, Title, ButtonImage } from "@projects/soccer/soccer.style";
import { information, getNextInformation } from "../GoalViewer2";
import { CountryFlag } from "utils/getCountryInfo";
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
const FieldForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`
const FormButton = styled(Button)`
  margin: 0px;
  width: 100%;
`
const ChartTitle = styled.label`
  text-transform: capitalize;
  font-size: ${props => props.isActive ? "1.2rem" : "1rem"};
  font-weight: ${props => props.isActive ? "bold" : "normal"};
`;
const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 10px;
  &:hover {
    cursor: pointer;
    font-weight: bolder;
  }
`
export const SoccerField = ({ onSave, onGetGoal, field, setField, goal = {}, recordedGoals = [] }) => {
  const [coords, setCoords] = React.useState({
    received: [],
    shot: [],
    goal: []
  });
  const scale = React.useMemo(() => {
    return scaleLinear().range([0, 1400]).domain([0, 1400]);
  }, []);
  const svg = React.useRef();

  React.useEffect(() => {
    setCoords({
      received: goal.received,
      shot: goal.shot,
      goal: goal.goal
    });
  }, [goal]);

  const getCoords = React.useCallback(
    (evt) => {
      const point = svg.current.createSVGPoint();
      point.x = evt.clientX;
      point.y = evt.clientY;
      const cursorPoint = point.matrixTransform(svg.current.getScreenCTM().inverse());
      const newCoords = [scale.invert(cursorPoint.x - 20), scale.invert(cursorPoint.y - 20)];
      setCoords(coords => ({ ...coords, [field]: newCoords }));
      if (field !== information[information.length - 1]) {
        setField(f => getNextInformation(f));
      }
    },
    [field, setField]
  );
  const playerCountry = goal['Team Initials'] === goal['Home Team Initials'] ? goal['Home Team Name'] : goal['Away Team Name'];
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <span style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <ButtonImage src='/static/caret-up.svg' onClick={() => onGetGoal(goal.id + 1)} />
            <Title style={{ margin: 0 }}>
              #{goal.id ? `${goal.id}` : "No info"}&nbsp;
            </Title>
            <ButtonImage src='/static/caret-down.svg' onClick={() => onGetGoal(goal.id - 1)} />
          </span>
          <img src={`/static/images/soccer/${goal['Year']}.png`} height="60px" style={{ margin: "0 1rem" }} />
          <Title>
            <CountryFlag countryName={playerCountry} />&nbsp;
            {goal['Player Name']} {goal.Minute}'
          </Title>
        </div>
        <GridInformation>
          {information.map((info) => (
            <InformationContainer key={info} onClick={() => setField(info)}>
              <ChartTitle isActive={info === field}>{info[0]}:</ChartTitle>
              {coords[info] ? (
                <>
                  {coords[info].map((goal) => (
                    <SmallParagraph key={goal}>{goal.toFixed(2)}</SmallParagraph>
                  ))}
                </>
              ) : (
                <SmallParagraph style={{ fontStyle: "italic" }}>
                  N/A
                </SmallParagraph>
              )}
            </InformationContainer>
          ))}

        </GridInformation>
      </div>
      <div style={{ width: '100%' }}>
        {
          Object.values(coords).filter(c => c && c.length > 0).length === information.length && (
            <FormButton onClick={() => onSave(coords)}>Save</FormButton>
          )
        }
      </div>
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
          {recordedGoals.map(({ goal: goalCoord, shot, received, id }) => {
            return (
              id !== goal.id ?
                <GoalRecord key={id} shot={shot} received={received} goal={goalCoord} /> : null
            );
          })}
          <GoalRecord shot={coords.shot} received={coords.received} goal={coords.goal} isActive={true} />
        </g>
      </svg>
    </>
  );
};

SoccerField.propTypes = {
  onClick: PropTypes.func
};
