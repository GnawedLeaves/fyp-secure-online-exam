
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
export const PageEnterSpace = styled.br``;
export const PageList = styled.ol`
  margin: 0 0px 20px;
`;
export const PageOrderList = styled.li``;
export const PageChoice = styled.div`
  margin: 5px 0 20px 20px;
`;
export const PageInput = styled.input`
  margin-bottom: 10px;
`;
export const PageLabel = styled.label``;
export const ExamPageContainer = styled.div`
    margin-top: 100px;
    float:left;
    width:65%;
`;
export const ExamPageContainer2 = styled.div`
margin-top: 100px;
margin-left: 70%;
width:25%;
`;
export const QuestionTable = styled.table`
  margin: 30px 0 50px;
`;
export const QuestionTableRow = styled.tr`
`;
export const QuestionTableCell = styled.td`
`;
export const QuestionTableData = styled.button`
  width: 40px;
  height:40px;
  margin: 5px 5px
`;
export const QuestionLegend = styled.table`
`;
export const LegendRow = styled.tr`
`;
export const LegendData = styled.td`
  padding:5px
`;
export const LegendColor = styled.div`
  width:25px;
  height:25px;
  margin:5px
`;
export const LegendText = styled.p`
margin:0
`;