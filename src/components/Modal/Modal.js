import { useRef } from "react";
import { useEffect } from "react";
import { ModalContainer, ModalContent, ModalTitle } from "./ModalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import Button from "../Button/Button";

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
        return <></>;
      default:
        return (
          <>
            <ModalTitle>{props.modalTitle}</ModalTitle>
            <ModalContent>{props.modalContent}</ModalContent>
            <Button
              onClick={() => {
                closeModal();
              }}
            >
              {props.closingButtonText ? props.closingButtonText : "OK"}
            </Button>
          </>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ModalContainer display={props.show} ref={modalRef}>
        {getModalType()}
      </ModalContainer>
    </ThemeProvider>
  );
};

export default Modal;
