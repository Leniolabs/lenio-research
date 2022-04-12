import * as React from "react";
import { Presentation, SoccerContainer } from "./soccer.style";
import { GoalViewer } from "./components/GoalViewer2";

const Index = () => {
  return (
    <>
      <main>
        <Presentation>
          <h1>
            Historic World Cup Goals <br />
            since 1930
          </h1>
        </Presentation>
        <SoccerContainer>
          <GoalViewer />
        </SoccerContainer>
      </main>
    </>
  );
};
export default Index;
