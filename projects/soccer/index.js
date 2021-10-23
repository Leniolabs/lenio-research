import * as React from "react";
import { Presentation, SoccerContainer } from "./soccer.style";
import { GoalViewer } from "./components/GoalViewer2";

const Index = () => {
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
          <GoalViewer />
        </SoccerContainer>
      </main>
    </>
  );
};
export default Index;
