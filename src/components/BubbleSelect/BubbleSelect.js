import { useEffect, useState } from "react";
import {
  Bubble,
  BubbleAddOption,
  BubbleAddSelect,
  BubbleContainer,
  BubbleSelectContainer,
} from "./BubbleSelectStyles";
import {
  BubbleAddBubble,
  BubbleAddBubblesContainer,
  BubbleAddIconContainer,
} from "../BubbleAdd/BubbleAddStyles";
import { RxCross2 } from "react-icons/rx";

const BubbleSelect = (props) => {
  const [allOptions, setAllOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    // Update state when props change
    setAllOptions(props.allOptions || []);
    setSelectedOptions(props.preSelectedOptions || []);
  }, [props.allOptions, props.preSelectedOptions]);

  const onOptionSelect = () => {
    props.handleOptionsSelected(selectedOptions);
  };

  const handleOptionClick = (option) => {
    setSelectedOptions([...selectedOptions, option]);
    setAllOptions(allOptions.filter((o) => o !== option));
  };

  const handleOptionRemove = (data, index) => {
    setSelectedOptions(selectedOptions.filter((_, i) => i !== index));
    setAllOptions([data, ...allOptions]);
  };

  const updateAllOptions = () => {

    if (allOptions.length !== 0) {
      const filteredOptions = allOptions.filter(option => !selectedOptions.includes(option));
      console.log("updating all options", filteredOptions)
      setAllOptions(filteredOptions);
    }
  }

  useEffect(() => {
    updateAllOptions();
    onOptionSelect();
  }, [selectedOptions]);
  return (
    <BubbleSelectContainer>
      <BubbleAddSelect
        onChange={(event) => {
          handleOptionClick(event.target.value);
        }}
        defaultValue=""
      >
        <option disabled value="">
          -- Select an option --
        </option>

        {allOptions.map((option, index) => {
          return <BubbleAddOption key={index} value={option}>{option}</BubbleAddOption>;
        })}
      </BubbleAddSelect>

      <BubbleAddBubblesContainer>
        {selectedOptions.map((data, index) => {
          return (
            <BubbleAddBubble key={index} newItem={index === 0}>
              {data}
              <BubbleAddIconContainer
                onClick={() => {
                  handleOptionRemove(data, index);
                }}
              >
                <RxCross2 />
              </BubbleAddIconContainer>
            </BubbleAddBubble>
          );
        })}
      </BubbleAddBubblesContainer>
    </BubbleSelectContainer>
  );
};

export default BubbleSelect;
