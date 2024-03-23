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

//TODO: fix this component's not updating 

const BubbleSelect = (props) => {
  const [allOptions, setAllOptions] = useState(props.allOptions);
  const [selectedOptions, setSelectedOptions] = useState(props.preSelectedOptions ? props.preSelectedOptions : []);
  useEffect(() => {
    setAllOptions(props.allOptions);
  }, [props.allOptions]);

  const onOptionSelect = () => {
    props.handleOptionsSelected(selectedOptions);
  };

  const handleOptionClick = (option) => {
    setSelectedOptions([...selectedOptions, option]);
    // const removedArray = allOptions.filter((o) => {
    //   return o !== option;
    // });

    // setAllOptions(removedArray);
  };


  const updateAllOptions = () => {
    if (allOptions.length !== 0) {
      const filteredOptions = allOptions.filter(option => !selectedOptions.includes(option));
      setAllOptions(filteredOptions);
    }
  }

  useEffect(() => {
    setSelectedOptions(props.preSelectedOptions)
    updateAllOptions()
  }, [props.preSelectedOptions, props.allOptions])

  useEffect(() => {
    onOptionSelect();
    updateAllOptions();
  }, [selectedOptions]);

  const handleOptionRemove = (data, index) => {
    if (selectedOptions.length === 1) {
      setSelectedOptions([]);
    } else {
      const temp = [
        ...selectedOptions.slice(0, index),
        ...selectedOptions.slice(index + 1),
      ];
      setSelectedOptions(temp);
    }
    setAllOptions([data, ...allOptions]);
  };

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
        {selectedOptions?.map((data, index) => {
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
