import React from "react";
import Select, { components } from "react-select";
import {
  LabelPositioner,
  Label,
  ControlContainer,
  CustomPlaceholder
} from "./country-select.style";
import { customThemeColors, customStyles } from "@components/select/select";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const Control = ({ children, ...props }) => {
  // eslint-disable-next-line react/prop-types
  const { label } = props.selectProps;

  return (
    <components.Control {...props}>
      <LabelPositioner>
        <Label>{label}</Label>
        <ControlContainer>{children}</ControlContainer>
      </LabelPositioner>
    </components.Control>
  );
};

const Placeholder = ({ ...props }) => {
  // eslint-disable-next-line react/prop-types
  const { value, options } = props.selectProps;
  // eslint-disable-next-line react/prop-types
  if (value.length === options[1].options.length) {
    return <CustomPlaceholder>All Selected</CustomPlaceholder>;
  }
  // eslint-disable-next-line react/prop-types
  return <CustomPlaceholder>{value.length} Selected</CustomPlaceholder>;
};

export const CountrySelect = ({ options, width = 400, label, selectedOption, ...restProps }) => {
  return (
    <Select
      {...restProps}
      defaultValue={options[options.length - 1]}
      value={selectedOption}
      isMulti
      isClearable={false}
      components={{
        Control,
        IndicatorSeparator: () => null,
        Placeholder
      }}
      label={label}
      width={width}
      theme={(theme) => ({ ...theme, colors: { ...theme.colors, ...customThemeColors } })}
      options={options}
      styles={customStyles}
      hideSelectedOptions={false}
      controlShouldRenderValue={false}
    />
  );
};

CountrySelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })),
  label: PropTypes.string,
  width: PropTypes.number,
  selectedOption: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })
  )
};

export default CountrySelect;
