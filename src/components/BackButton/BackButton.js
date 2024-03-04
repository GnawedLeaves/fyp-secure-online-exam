//INSTRUCTIONS TO USE:
// Place this component at the top of your page container and when you click it it will go back to the previous page

//PARAMETERS:
//props.size --> format eg. size="2rem"

import { HiArrowLongLeft } from "react-icons/hi2";
import { AdminBackButtonContainer } from "./BackButtonStyles";
import { useNavigate } from "react-router-dom";

const BackButton = (props) => {
  const navigate = useNavigate();
  const navigateBack = () => {
    if (props.onClick) {
      props.onClick();
    } else {
      navigate(-1);
    }
  };
  return (
    <AdminBackButtonContainer
      onClick={() => {
        navigateBack();
      }}
    >
      <HiArrowLongLeft size={props.size} />
    </AdminBackButtonContainer>
  );
};

export default BackButton;
