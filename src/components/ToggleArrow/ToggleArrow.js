import { useState } from "react";
import { ToggleArrowContainer } from "./ToggleArrowStyles";
import { BsArrowDownShort } from "react-icons/bs";
import { BsArrowUpShort } from "react-icons/bs";

const ToggleArrow = (props) => {
  const [downArrowState, setDownArrowState] = useState(true);

  return (
    <ToggleArrowContainer
      onClick={() => {
        downArrowState ? props.downArrowFunction() : props.upArrowFunction();
        setDownArrowState(!downArrowState);
      }}
    >
      {downArrowState ? (
        <BsArrowDownShort size={props.size ? props.size : "1rem"} />
      ) : (
        <BsArrowUpShort size={props.size ? props.size : "1rem"} />
      )}
    </ToggleArrowContainer>
  );
};

export default ToggleArrow;
