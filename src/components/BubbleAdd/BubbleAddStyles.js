import styled, { css, keyframes } from "styled-components";

const addBubble = keyframes`
  0% {
    transform: translateY(-20%);
    opacity: 0.1;
  }

  100% {
    transform: translateY(0%);
    opacity: 1;
  }
`;

const animation = (props) =>
  css`
    0.5s ${addBubble} 0s;
  `;

export const BubbleAddContainer = styled.div`
  margin: 1rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BubbleAddBubblesContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0.5rem;
  gap: 0.5rem;
  width: 100%;
`;
export const BubbleAddBubble = styled.div`
  display: flex;
  box-shadow: ${(props) => props.theme.boxShadow};
  background: ${(props) => props.theme.grey};
  padding: 0.5rem 0.8rem;
  border-radius: 0.5rem;
  align-items: center;
  justify-content: space-between;
  font-size: 1.1rem;
  gap: 1rem;
  // animation: ${(props) => props.newItem && animation};
  animation: ${animation};
`;

export const BubbleAddIconContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;
