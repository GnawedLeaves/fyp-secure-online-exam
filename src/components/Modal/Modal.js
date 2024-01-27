import { useRef } from "react";
import { useEffect } from "react";
import {
  ModalButtonContainer,
  ModalContainer,
  ModalContent,
  ModalTitle,
} from "./ModalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import Button from "../Button/Button";

//Props:
{
  /* <Modal
handleModalClose={() => {
  setShowModal(false);
}}
modalType="action"
actionButtonText="Delete"
actionButtonColor={theme.statusError}
actionButtonClick={() => {}}
show={showModal}
modalTitle="Delete User"
modalContent="Are you sure you want to delete this user? This action cannot be undone."
/> */
}

//Usage:
//1. In the parent element just send a boolean prop (true/false), true will open the modal, false will close it.

const Modal = (props) => {
  const modalRef = useRef(null);
  const modalType = props.modalType;

  const showModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
      props.handleModalClose();
    }
  };

  useEffect(() => {
    if (props.show) {
      showModal();
    } else {
      closeModal();
    }
  }, [props.show]);

  const getModalType = () => {
    switch (modalType) {
      case "action":
        return (
          <ModalButtonContainer>
            <Button
              filled={true}
              filledColor={props.actionButtonColor}
              defaultColor={props.actionButtonColor}
              onClick={() => {
                closeModal();
                props.actionButtonClick();
              }}
            >
              {props.actionButtonText ? props.actionButtonText : "OK"}
            </Button>
            <Button
              onClick={() => {
                closeModal();
              }}
            >
              {props.closingButtonText ? props.closingButtonText : "Cancel"}
            </Button>
            '
          </ModalButtonContainer>
        );
      default:
        return (
          <ModalButtonContainer>
            <Button
              onClick={() => {
                closeModal();
              }}
            >
              {props.closingButtonText ? props.closingButtonText : "OK"}
            </Button>
          </ModalButtonContainer>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ModalContainer display={props.show} ref={modalRef}>
        <ModalTitle>{props.modalTitle}</ModalTitle>
        <ModalContent>{props.modalContent}</ModalContent>
        {getModalType()}
      </ModalContainer>
    </ThemeProvider>
  );
};

export default Modal;
