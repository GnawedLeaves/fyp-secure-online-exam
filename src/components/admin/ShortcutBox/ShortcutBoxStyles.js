import styled from "styled-components";

export const ShortcutBoxContainer = styled.div`
  width: 10rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid ${(props) => props.theme.text};
  border-radius: 1rem;
  gap: 0.7rem;
  font-weight: 600;
  font-size: 1.2rem;
  cursor: pointer;
  transition: 0.2s;
`;

export const ShortcutBall = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: ${(props) => props.ballBackground};
`;
