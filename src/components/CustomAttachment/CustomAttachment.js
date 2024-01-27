import React from 'react';
import { 
    CustomAttachmentContainer,
    CustomAttachmentLabel,
    CustomAttachmentSection,
    CustomAttachmentInput
} from "./CustomAttachmentStyles";

const CustomAttachment = ({ label, value, onChange }) => {
  return (
    <CustomAttachmentContainer>
      <CustomAttachmentLabel>
        {label}:
      </CustomAttachmentLabel>
        <CustomAttachmentSection>
            <CustomAttachmentInput
            type="file"
            name={label}
            value={value}
            onChange={onChange}
            style={{
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "16px",
              }}
            />
        </CustomAttachmentSection>
    </CustomAttachmentContainer>
  );
};

export default CustomAttachment;