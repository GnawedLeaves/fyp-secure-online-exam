import styled from "styled-components";

export const OverviewCheatingBoxContainer = styled.div`
  background: ${(props) => props.theme.background};
  width: 10rem;
  height: 8rem;
  border-radius: 12px;
  border: 2px solid ${(props) => props.theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
`;
