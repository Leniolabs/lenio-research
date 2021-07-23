import WomenInTechArticle from "./article";
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
            <a
              href="https://www.linkedin.com/in/lara-schv"
              target="_blank"
              rel="noopener noreferrer">
              Lara Schvartzman
            </a>{" "}
          </span>
        </Presentation>

        <WomenInTechArticle />
      </main>
    </>
  );
};
export default Index;
