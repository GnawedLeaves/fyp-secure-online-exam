
import styled from "styled-components";

export const PageTitle = styled.h1`
    margin:0 20px;
`;
export const PageTitleDesc = styled.p`
    margin:0 20px;
`;
export const PageSubtitle = styled.h3`
    margin:20px 20px 5px;
`;
export const PageDescription= styled.p`
    margin:0px 20px 5px;
`;
export const PageDesc = styled.p`
    margin:0 20px;
`;
export const PageButton = styled.button`
    margin:5px 20px;
  padding: 5px;
  font-weight: 600;
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.primary};
  color: ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.white};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.white};
  }
`;
export const PageContainer = styled.div`
    margin: 50px 35%;
`;
export const PageEnterSpace = styled.br`
`;