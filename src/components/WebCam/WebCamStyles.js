// WebCamStyles.js

import styled from "styled-components";

export const WebCamSection = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column; /* Changed to column layout */
  align-items: center;
  justify-content: center; 
  margin: auto;
`;

export const WebCamVideo = styled.video`
  width: 100%;
  max-width: 600px;
  margin-bottom: 10px; /* Added margin-bottom for spacing */
`;

export const WebCamButtonContainer = styled.div`
  display: flex;
  gap: 10px; /* Adjust the gap between buttons */
`;

export const WebCamButton = styled.button`
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.5rem 1.7rem;
  border: 2px solid ${(props) => props.theme.primary};
  color: ${(props) => props.theme.primary};
  border-radius: 50rem;
  cursor: pointer;
  transition: ${(props) => props.theme.transition};

  &:hover {
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.background};
    border-color: ${(props) => props.theme.primary};
  }
`;