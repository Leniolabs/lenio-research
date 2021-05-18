import styled from "styled-components";

export const Card = styled.div`
  position: relative;
  min-height: 350px;
  width: 45%;
  background: #fff;
  padding: 16px 32px;
  box-sizing: border-box;
  margin-bottom: 20px;
  img {
    width: 100%;
  }
  display: grid;
  grid-template-rows: 45px 1fr 120px;
  p {
    color: #000;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: 1200px) {
    width: 55%;
  }
  @media (max-width: 960px) {
    width: 65%;
  }
  @media (max-width: 768px) {
    width: 75%;
  }
`;
export const CardTitle = styled.h6`
  text-transform: uppercase;
  margin: 0;
  font-size: 1.5rem;
  color: #000;
  padding-bottom: 16px;
`;

export const Button = styled.a`
  position: absolute;
  background: #00beff;
  padding: 16px;
  font-size: 14px;
  bottom: -20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  width: 65%;
  margin: auto;
  cursor: pointer;
  &:hover {
    background: #00beffee;
    transition: all 0.8s;
  }
`;
