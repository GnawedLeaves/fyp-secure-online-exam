import styled from "styled-components";

export const ExamlistContainer = styled.div``;
export const ExamDetail = styled.div`
    display: inline-block; 
    margin-right: 10px;
    margin-top: 10px;
    
`;
export const ExamAction = styled.button`
    border: none;
    padding: 0;
    background: none;
    color: ${(props) => props.theme.primary};
    text-decoration: underline;
    cursor: pointer;
    font-size:16px;
    transition: ${(props) => props.theme.transition};
    &:hover {
        font-size:17px;
        font-weight: 350;
    }
`;