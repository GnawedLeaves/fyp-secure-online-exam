import styled from "styled-components";

export const ExamboxContainer = styled.div`
  background: ${(props) => props.theme.white};
  border-radius: 1rem;
  // padding: 1.5rem 2rem;
  width: fit-content;

  ${(props) => props.theme.boxShadow};
`;

export const ExamboxTitleOngoing = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  background: ${(props) =>
    props.ongoing ? props.theme.primary : props.theme.background};
  color: ${(props) =>
    props.ongoing ? props.theme.background : props.theme.text};
  width: 25rem;
  padding: 1rem 1.5rem;
  border-radius: 1rem 1rem 0px 0px;
  font-size: 1.5rem;
  box-sizing: border-box;
`;

export const ExamboxTitle = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  width: 25rem;
  padding: 1.2rem 1.7rem;
  border-radius: 1rem 1rem 0px 0px;
  font-size: 1.5rem;
  box-sizing: border-box;
`;

export const ExamboxDetailsContainer = styled.div`
  border-radius: 0px 0px 1rem 1rem;
  width: 25rem;
  padding: 1.5rem 2rem;
  box-sizing: border-box;
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
  margin-top: 1.5rem;
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
    ${(props) => (props.ongoing ? props.theme.primary : props.theme.primary)};

  color: ${(props) =>
    props.ongoing ? props.theme.background : props.theme.primary};

  background: ${(props) =>
    props.ongoing ? props.theme.primary : props.theme.background};
  border-radius: 50rem;
  cursor: pointer;
  transition: ${(props) => props.theme.transition};
  &:hover {
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.background};
    border-color: ${(props) => props.theme.primary};
  }
`;
