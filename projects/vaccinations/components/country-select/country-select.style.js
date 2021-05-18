import styled from "styled-components";

export const LabelPositioner = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.div`
  font-size: 0.9rem;
  text-align: left;
  width: 70%;
  padding-left: 14px;
`;

export const ControlContainer = styled.div`
  display: flex;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.1rem;
  width: 100%;
`;

export const CustomPlaceholder = styled.span`
  white-space: nowrap;
`;
