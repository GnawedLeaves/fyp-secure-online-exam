// RadioButtonGroup.js

import React from 'react';
import RadioButton from './RadioButton';

const RadioButtonGroup = (props) => {
  
  return (
    <RadioButton 
      index={props.index} 
      options={props.options} 
      onChange={props.onChange}
      selectedOption={props.selectedOption}></RadioButton>
  );
};

export default RadioButtonGroup;