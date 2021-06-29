import React from "react";
import PropTypes from "prop-types";
import { CheckboxWrapper, CheckBox, CheckBoxLabel } from "./switch.style";

export const Switch = ({ id, color1, color2, checked, onChange }) => {
  return (
    <CheckboxWrapper>
      <CheckBox id={id} type="checkbox" checked={checked} onChange={onChange} color2={color2} />
      <CheckBoxLabel color1={color1} htmlFor={id} />
    </CheckboxWrapper>
  );
};

Switch.propTypes = {
  id: PropTypes.string,
  color1: PropTypes.string,
  color2: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func
};

export default Switch;
