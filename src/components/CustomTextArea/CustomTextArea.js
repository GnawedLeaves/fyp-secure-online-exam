import React from 'react';
import { 
    CustomTextAreaContainer,
    CustomTextAreaLabel,
    CustomTextAreaSection
} from "./CustomTextAreaStyles";

const CustomTextArea = ({ label, value, onChange, required }) => {
  return (
    <CustomTextAreaContainer>
      <CustomTextAreaLabel style={{ fontSize: "18px", fontFamily: "Your Desired Font, sans-serif", fontWeight: "bold" }}>
        {label}:
      </CustomTextAreaLabel>
      <CustomTextAreaSection
        name={label}
        rows="10"
        cols="80"
        value={value}
        onChange={onChange}
        required={required}
        style={{ fontSize: "18px", fontFamily: "sans-serif" }}
      ></CustomTextAreaSection>
    </CustomTextAreaContainer>
  );
};

export default CustomTextArea;
