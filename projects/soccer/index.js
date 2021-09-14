import * as React from "react";
import { Presentation, SoccerContainer } from "./soccer.style";
import jsonGoals from "./messigoals.json";
import { GoalViewer } from "./components/GoalViewer2";

const Index = () => {
  console.log(jsonGoals);
  const [goals, setGoals] = React.useState(jsonGoals);
  const [goalIdx, setGoalIdx] = React.useState(0);

  const onChange = React.useCallback(
    (goal, idx) => {
      const newGoals = goals;
      newGoals[idx] = goal;
      setGoals(newGoals);
      console.log(goal, idx, newGoals);
      setGoalIdx(goalIdx + 1);
    },
    [goals, goalIdx]
  );

  return (
    <>
      <main>
        <Presentation>
          <h1>
            Representation and what happened <br />
            to women in Tech
          </h1>
          <span className="author">
            An article written by{" "}
            <a
              href="https://www.linkedin.com/in/lara-schv"
              target="_blank"
              rel="noopener noreferrer">
              Lara Schvartzman
            </a>{" "}
          </span>
        </Presentation>
        <SoccerContainer>
          <GoalViewer goal={goals[goalIdx]} idx={goalIdx} onSave={onChange} />
        </SoccerContainer>
      </main>
    </>
  );
};
export default Index;
