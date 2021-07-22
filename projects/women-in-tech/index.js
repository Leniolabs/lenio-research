import TechRepresentation from "./tech-representation";
import { Presentation } from "./women-in-tech.style";

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
            <a href="https://www.TODO/url" target="_blank" rel="noreferrer">
              Lara Schvartzman
            </a>{" "}
          </span>
        </Presentation>

        <TechRepresentation />
      </main>
    </>
  );
};
export default Index;
