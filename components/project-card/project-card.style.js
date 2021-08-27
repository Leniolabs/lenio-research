import styled from "styled-components";

export const Card = styled.div`
  position: relative;
  min-height: 350px;
  width: 100%;
  min-width: 335px;
  background: #fff;
  padding: 1rem 2rem 3rem;
  box-sizing: border-box;
  margin-bottom: 40px;
  img {
    width: 100%;
  }
  display: grid;
  grid-template-rows: 35px 35px 1fr 160px;
  p {
    color: #2a3f55;
    font-size: 1rem;
    letter-spacing: -0.01px;
    text-overflow: ellipsis;
  }
`;
export const CardTitle = styled.h3`
  text-transform: uppercase;
  margin: 0;
  font-size: 1.5rem;
  color: #2e2f49;
`;

export const CardSubtitle = styled.span`
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
  color: #0f7a9e;
`;

export const Button = styled.a`
  position: absolute;
  background: #0d7a9e;
  padding: 1rem;
  font-size: 1.2rem;
  bottom: -20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  width: 65%;
  margin: auto;
  cursor: pointer;
  &:hover {
    background: #48d58c;
    transition: all 0.8s;
  }
`;
