import styled from "styled-components";

export const QuestionBox = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.hasOption ? '#ADD8E6' : props.theme.grey)};
  cursor: pointer;
  border: 2px solid ${({ isFlagged }) => (isFlagged ? 'red' : 'grey')};
  &:hover {
    background: ${(props) => props.theme.statusIntermediate};
    color: ${(props) => props.theme.background};
    border-color: ${(props) => props.theme.primary};
  }

`;
export const QuestionFocusBox = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.background};
  border-color: ${(props) => props.theme.primary};
  border: 3px solid ${({ isFlagged }) => (isFlagged ? 'red' : 'blue')};
  &:hover {
    background: ${(props) => props.theme.statusIntermediate};
    color: ${(props) => props.theme.text};
    border-color: ${(props) => props.theme.text};
  }

`;