import * as React from "react";
import PropTypes from "prop-types";
import { SoccerContainer } from "../soccer.style";
import { SoccerField } from "./SoccerField";

export const GoalViewer = ({ goal, idx, onSave }) => {
  const [innerGoal, setInnerGoal] = React.useState(goal);
  const [field, setField] = React.useState("received");

  React.useEffect(() => {
    setInnerGoal(goal);
    setField("received");
  }, [goal]);

  const onChange = React.useCallback(
    (coords) => {
      setInnerGoal({
        ...innerGoal,
        [field]: coords
      });
      setField("shot");
    },
    [field, innerGoal]
  );

  const onInputChange = React.useCallback(
    (value) => {
      setInnerGoal({
        ...innerGoal,
        url: value
      });
    },
    [innerGoal]
  );
  return (
    <SoccerContainer>
      <div style={{ gridArea: "field" }}>
        <SoccerField onClick={(coords) => onChange(coords)} />
      </div>
      <div>
        <pre>{JSON.stringify(innerGoal, undefined, 2)}</pre>
        <label htmlFor={"url"}>URL</label>
        <input
          name="url"
          onChange={(event) => onInputChange(event.target.value)}
          value={innerGoal.url}></input>
      </div>
      <button onClick={() => onSave(innerGoal, idx)}>Next</button>
    </SoccerContainer>
  );
};

GoalViewer.propTypes = {
  goal: PropTypes.any,
  idx: PropTypes.number,
  onSave: PropTypes.func
};
