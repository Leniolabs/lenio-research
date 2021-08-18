import WomenInTechArticle from "./article";
import Link from "next/link";
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
          <Link href="https://www.freepik.com/vectors/people" className="pic-author">
            Remix of people vector created by jcomp
          </Link>
        </Presentation>

        <WomenInTechArticle />
      </main>
    </>
  );
};
export default Index;
