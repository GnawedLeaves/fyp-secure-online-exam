import styled from "styled-components";

// export const ModalContainer = styled.dialog`
//   border-radius: 1rem;
//   width: 35rem;
//   min-height: 15rem;
//   border: none;
//   display: ${(props) => (props.display ? "flex" : "none")};
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   gap: 0.9rem;
//   padding: 2rem;
// `;
export const ModalContainer = styled.dialog`
  border-radius: 1rem;
  width: 35rem;
  max-height: 80vh;
  border: none;
  overflow-y: auto; /* Enable vertical scrolling if content exceeds modal height */
  display: ${(props) => (props.display ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  padding: 2rem;
`;

export const ModalContainerExam = styled.dialog`
  border-radius: 1rem;
  width: 40rem;
  max-height: 80vh;
  border: none;
  overflow-y: auto; /* Enable vertical scrolling if content exceeds modal height */
  display: ${(props) => (props.display ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  padding: 2rem;
`;

export const ModalExamContainer = styled.dialog`
max-height: calc(100vh - 200px);
overflow-y: auto; 
`;

export const ModalTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const ModalTitle = styled.div`
  font-size: 1.6rem;
  font-weight: bold;

`;
export const ModalSucess = styled.div`
  font-size: 2.6rem;
  font-weight: bold;

`;

export const ModalContent = styled.div`
  width: 90%;
  // text-align: center;
  overflow-y: auto;
`;

export const ModalButtonContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

export const EmptyModalContainer = styled.dialog`
  display: ${(props) => (props.display ? "" : "none")};
  border-radius: 1rem;
  border: none;
  min-height: 10rem;
  min-width: 20rem;
  padding: 1rem;
`;
export const EmptyModalCloseContainer = styled.div`
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  display: ${(props) => (props.display ? "flex" : "none")};
`;
