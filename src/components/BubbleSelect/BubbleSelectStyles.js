import styled from "styled-components";

export const BubbleSelectContainer = styled.div``;

export const Bubble = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BubbleContainer = styled.div``;

export const BubbleAddSelect = styled.select`
  width: 100%;
  padding: 0.5rem 1.2rem;
  font-size: 1.1rem;
  border-radius: 2rem;
  border: 2px solid ${(props) => props.theme.text};
`;

export const BubbleAddOption = styled.option``;
