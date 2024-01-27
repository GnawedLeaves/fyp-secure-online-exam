import React from 'react';
import { 
    CustomSelectContainer,
    CustomSelectLabel,
    CustomSelectSection,
    CustomSelectOption
} from "./CustomSelectStyles";

const CustomSelect = ({ label, options, value, onChange }) => {
  return (
    <CustomSelectContainer>
      <CustomSelectLabel>
        {label}:
      </CustomSelectLabel>
      <CustomSelectSection
        name={label}
        value={value}
        onChange={onChange}
        style={{ fontSize: "16px" }}
      >
        {options.map((option, index) => (
          <CustomSelectOption key={index} value={option.toLowerCase()}>
            {option}
          </CustomSelectOption>
        ))}
      </CustomSelectSection>
    </CustomSelectContainer>
  );
};

export default CustomSelect;