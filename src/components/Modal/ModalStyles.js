import styled from "styled-components";

export const ModalContainer = styled.dialog`
  border-radius: 1rem;
  // min-width: 15rem;
  min-height: 15rem;
  border: none;
  display: ${(props) => (props.display ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`;

export const ModalTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;
export const ModalContent = styled.div`
  width: 70%;
  text-align: center;
`;
