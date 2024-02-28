import styled from "styled-components";

export const AlertModalContainer = styled.dialog`
  border-radius: 1rem;
  width: 60rem;
  min-height: 40rem;
  border: none;
  display: ${(props) => (props.display ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10rem;
  padding: 2rem;
  background-color: red;
`;

export const AlertModalTitle = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: white;
`;
export const AlertModalContent = styled.div`
  width: 90%;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`;
