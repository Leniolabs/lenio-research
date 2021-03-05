import React from "react";
import Select, { components } from "react-select";
import styled from "styled-components";
import { customThemeColors, customStyles } from "@components/select";
import PropTypes from "prop-types";

const LabelPositioner = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Label = styled.div`
  font-size: 0.9rem;
  text-align: left;
  width: 70%;
  padding-left: 14px;
`;

const ControlContainer = styled.div`
  display: flex;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.1rem;
  width: 100%;
`;

const CustomPlaceholder = styled.span`
  white-space: nowrap;
`;

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
