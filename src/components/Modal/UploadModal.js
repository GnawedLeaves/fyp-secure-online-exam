import { useRef } from "react";
import { useEffect } from "react";
import {
  EmptyModalCloseContainer,
  EmptyModalContainer,
  ModalButtonContainer,
  ModalContainer,
  ModalContent,
  ModalTitle,
} from "./ModalStyles";
import {
  AlertModalContainer,
  AlertModalContent,
  AlertModalTitle,
} from "./AlertModalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import Button from "../Button/Button";
import { IoMdClose } from "react-icons/io";

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

//Exmaple of empty modal with custom content:
{
  /* <Modal
  show={showModal}
  handleModalClose={() => {
    setShowModal(false);
  }}
  modalType="empty"
  showCross={true}
>
  <div style={{ width: "20rem", background: "red", height: "20rem" }}>
    content goes here
  </div>
</Modal>; */
}

//Usage:
//1. In the parent element just send a boolean prop (true/false), true will open the modal, false will close it.

const UploadModal = (props) => {
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
    console.log('props.imageCaptured:', props.imageCaptured);
    switch (modalType) {
      case "empty":
        return (
          <EmptyModalContainer ref={modalRef} display={props.show}>
            <EmptyModalCloseContainer display={props.showCross}>
              <IoMdClose
                size="1.8rem"
                onClick={() => {
                  closeModal();
                }}
                style={{ cursor: "pointer" }}
              />
            </EmptyModalCloseContainer>

            {props.children}
          </EmptyModalContainer>
        );
      case "addPhoto":
        return (
          <ModalContainer display={props.show} ref={modalRef}>
            <ModalTitle>{props.modalTitle}</ModalTitle>
            <ModalContent>{props.modalContent}</ModalContent>
            <img src={props.imageCaptured} alt="Captured" width="50%"/>
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
            </ModalButtonContainer>
          </ModalContainer>
        );
        case "alert":
        return (
          <AlertModalContainer display={props.show} ref={modalRef}>
            <AlertModalTitle>{props.modalTitle}</AlertModalTitle>
            <AlertModalContent>{props.modalContent}</AlertModalContent>
            <ModalButtonContainer>
              <Button
                filled={false}
                filledColor={props.actionButtonColor}
                defaultColor={props.actionButtonColor}
                onClick={() => {
                  closeModal();
                  props.actionButtonClick();
                }}
              >
                {props.actionButtonText ? props.actionButtonText : "OK"}
              </Button>
            </ModalButtonContainer>
          </AlertModalContainer>
        );
        case "action":
        return (
          <ModalContainer display={props.show} ref={modalRef}>
            <ModalTitle>{props.modalTitle}</ModalTitle>
            <ModalContent>{props.modalContent}</ModalContent>
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
            </ModalButtonContainer>
          </ModalContainer>
        );
      default:
        return (
          <ModalContainer display={props.show} ref={modalRef}>
            <ModalTitle>{props.modalTitle}</ModalTitle>
            <ModalContent>{props.modalContent}</ModalContent>
            <ModalButtonContainer>
              <Button
                onClick={() => {
                  closeModal();
                }}
              >
                {props.closingButtonText ? props.closingButtonText : "OK"}
              </Button>
            </ModalButtonContainer>
          </ModalContainer>
        );
    }
  };

  return <ThemeProvider theme={theme}>{getModalType()}</ThemeProvider>;
};

export default UploadModal;
