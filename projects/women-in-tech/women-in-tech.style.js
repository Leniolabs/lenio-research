import { motion } from "framer-motion";
import styled from "styled-components";

export const GraphicContainer = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
`;

export const Presentation = styled.section`
  background-size: 220px;
  padding: 4rem 0 6rem;
  margin-bottom: 5rem;
  text-align: center;
  * {
    margin: 0;
  }
  h1 {
    font-size: 3.2rem;
    line-height: 1;
  }
  p {
    font-size: 1.4rem;
    margin-top: 1rem;
  }
`;
