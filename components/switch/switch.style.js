import styled from "styled-components";

export const CheckboxWrapper = styled.span`
  z-index: 0;
  position: relative;
  display: inline-block;
  font-size: 16px;
  line-height: 1.5;
`;

export const CheckBoxLabel = styled.label`
  display: inline-block;
  width: 100%;
  cursor: pointer;
  &::before {
    content: "";
    display: inline-block;
    margin: 5px 0 5px 10px;
    border-radius: 7px;
    width: 36px;
    height: 14px;
    background-color: ${(props) => `rgba(${props.color1}, 0.38)`};
    vertical-align: top;
    transition: background-color 0.2s, opacity 0.2s;
  }
  &::after {
    content: "";
    position: absolute;
    top: 2px;
    right: 16px;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background-color: ${(props) => `rgba(${props.color1})`};
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    transition: background-color 0.2s, transform 0.2s;
  }
`;

export const CheckBox = styled.input`
  appearance: none !important;
  -moz-appearance: none;
  -webkit-appearance: none;
  z-index: -1;
  position: absolute;
  right: 6px;
  top: -8px;
  display: block;
  margin: 0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: ${(props) => `rgba(${props.color1}, 0.38)`};
  outline: none;
  opacity: 0;
  transform: scale(1);
  pointer-events: none;
  transition: opacity 0.3s 0.1s, transform 0.2s 0.1s;
  &:checked + ${CheckBoxLabel} {
    right: -10px;
    &::before {
      background-color: ${(props) => `rgba(${props.color2}, 0.6)`};
    }
    &::after {
      background-color: rgba(255, 63, 85);
      transform: translateX(16px);
    }
  }
  &:active {
    opacity: 1;
    transform: scale(0);
    transition: transform 0s, opacity 0s;
    &::before {
      background-color: ${(props) => `rgba(${props.color2}, 0.6)`};
    }
  }
  &:active + ${CheckBoxLabel} {
    &::before {
      background-color: ${(props) => `rgba(${props.color2}, 0.6)`};
    }
  }
`;
