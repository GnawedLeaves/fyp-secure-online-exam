import styled from "styled-components";

export const ExamboxContainer = styled.div`
  border: 2px solid
    ${(props) => (props.ongoing ? props.theme.primary : props.theme.text)};
  background: ${(props) => props.theme.background};
  border-radius: 0.5rem;
  padding: 1.5rem 2rem;
  width: 20rem;
`;

export const ExamboxTitle = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
`;

export const ExamboxDetails = styled.div`
  margin: 1rem 0;
`;
export const ExamboxDetail = styled.div`
  margin: 0.3rem 0;
  font-size: 1.1rem;
`;

export const ExamboxButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const ExamboxButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  width: fit-content;
  padding: 0.5rem 1.7rem;
  border: 2px solid
    ${(props) => (props.ongoing ? props.theme.primary : props.theme.text)};
  color: ${(props) => (props.ongoing ? props.theme.primary : props.theme.text)};
  border-radius: 50rem;
  cursor: pointer;
  transition: ${(props) => props.theme.transition};
  &:hover {
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.background};
    border-color: ${(props) => props.theme.primary};
  }
`;
