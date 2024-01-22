import styled, { keyframes } from "styled-components";

export const LoadingPageContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  z-index: 9999;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 3rem;
  background: ${(props) => props.theme.background};
  gap: 2rem;
`;

// Define the keyframes for the spin animation
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.div`
  border: 7px solid ${(props) => props.theme.background};
  border-top: 7px solid ${(props) => props.theme.primary};
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: ${spin} 1.5s linear infinite;
`;
