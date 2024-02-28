import { useState } from "react";
import {
  Bubble,
  BubbleContainer,
  BubbleSelectContainer,
} from "./BubbleSelectStyles";

const BubbleSelect = (props) => {
  const allOptions = props.allOptions;
  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <BubbleSelectContainer>
      <select>
        <option>hi</option>
        <option>hieee</option>
        <option>hieqweeqw</option>
      </select>
      <BubbleContainer>
        {selectedOptions.map((option) => {
          return <Bubble>{option}</Bubble>;
        })}
      </BubbleContainer>
    </BubbleSelectContainer>
  );
};

export default BubbleSelect;
