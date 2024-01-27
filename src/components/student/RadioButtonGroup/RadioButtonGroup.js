// RadioButtonGroup.js

import React from 'react';
import RadioButton from './RadioButton';

const RadioButtonGroup = (props) => {
  return (
    <RadioButton index={props.index} options={props.options}></RadioButton>
  );
};

export default RadioButtonGroup;