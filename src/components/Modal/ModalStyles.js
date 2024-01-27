import styled from "styled-components";

export const ModalContainer = styled.dialog`
  border-radius: 1rem;
  width: 23rem;
  min-height: 10rem;
  border: none;
  display: ${(props) => (props.display ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  padding: 2rem;
`;

export const ModalTitle = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
`;
export const ModalContent = styled.div`
  width: 90%;
  text-align: center;
`;

export const ModalButtonContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
`;
