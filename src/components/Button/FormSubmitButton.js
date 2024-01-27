import React from 'react';
import Button from './Button';  // Adjust the path accordingly

const FormSubmitButton = ({ onSubmit, ...buttonProps }) => {

  return (
      <Button type="submit" {...buttonProps} />
  );
};

export default FormSubmitButton;