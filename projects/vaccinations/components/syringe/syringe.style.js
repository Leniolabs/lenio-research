import styled from "styled-components";

export const BorderPath = styled.path`
  fill: #5a60ab;
  stroke: #5a60ab;
  stroke-width: 2;
`;

export const SyringeColor = styled(BorderPath)`
  fill: ${(props) => props.color};
`;

export const SyringeTop = styled(BorderPath)`
  fill: #fff;
`;

export const BlueFillPath = styled.path`
  fill: #5a60ab;
`;

export const MovingPath = styled.path`
  fill: #dce4fc;
  stroke: #5a60ab;
  stroke-width: 2;
  transition: d 0.2s linear;
`;
export const LoadingMovingPath = styled.path`
  fill: ${props => props.color};
  stroke: #5a60ab;
  stroke-width: 2;
  transition: d 0.2s linear;
`;

export const TSpan = styled.tspan`
  fill: #5a60ab;
  font-size: 1.5rem;
  font-weight: bold;
`;

export const FlagContainer = styled.circle`
  stroke: #5a60ab;
  stroke-width: 2;
  fill: #5a60ab;
`;
