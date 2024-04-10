// Dropdown.js
import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../theme";

const SelectDropdown = styled.select`
  padding: 0.5rem 1rem;
  border-color: ${(props) => props.theme.text};
  font-size: 1.1rem;
  border-radius: 2rem;
  border: 2px solid ${(props) => props.theme.text};
`;

const SelectOption = styled.option`
  font-family: ${props => props.theme.font};
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  border-color: ${(props) => props.theme.text};
  border-radius: 2rem;
`;

const Dropdown = ({ options, onChange, defaultValue }) => {
  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    onChange(selectedOption);
  };



  return (
    <ThemeProvider theme={theme}>
      <SelectDropdown onChange={handleSelectChange}>
        <SelectOption value="" disabled selected>
          {defaultValue ? defaultValue : "-- Select an option --"}
        </SelectOption>
        {options.map((option, index) => (
          <SelectOption key={index} value={option}>
            {option}
          </SelectOption>
        ))}
      </SelectDropdown>
    </ThemeProvider>
  );
};

export default Dropdown;
