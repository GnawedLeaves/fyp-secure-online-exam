
import styled from "styled-components";

export const StudentHomePageContainer = styled.div`
  display: flex;
`;
export const StudentNavbarContentContainer = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
export const PageTitle = styled.div`
  font-size 4rem;
  font-weight: 600;
`;
export const FeatureCheckContainer = styled.div`
  width: 85%;
`;
export const FeatureCheckTitle = styled.div`
  font-size 2rem;
  font-weight: 600;
`;
export const FeatureCheckDescription = styled.p``;
export const FeatureCheckButton = styled.button`
  padding: 15px;
  font-weight: 600;
  width: 20%;
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

//StudentExamPage 
export const ExamTableContainer = styled.div`
  width: 85%;
`;
export const TableTitle = styled.div`
  font-size 2rem;
  font-weight: 600;
`;
export const OpenExams = styled.div`
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  margin-top:5px;
  border: 2px solid black;
`;
export const ExamlistContainer = styled.div``;
export const ExamDetail = styled.div`
    display: inline-block; 
    margin-right: 10px;
    font-weight:500;
`;
export const TableDescription = styled.div``;

//StudentExamDetailPage 
export const StudentExamDetailContainer = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 2rem;
`;
export const PageSubtitle = styled.div`
  font-size 2rem;
  font-weight: 600;
`;
export const PageDescription= styled.div`
    margin:0px 20px 5px;
`;
export const PageList = styled.ol`
  margin: 0 0px 20px;
`;
export const PageOrderList = styled.li``;
export const SectionContainer = styled.div``;
export const RuleContainer = styled.div``;
export const PageButton = styled.div`
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  width: fit-content;
  padding: 0.5rem 1.7rem;
  border: 2px solid
    ${(props) => props.theme.primary};
  color:${(props) => props.theme.primary};
  border-radius: 50rem;
  cursor: pointer;
  transition: ${(props) => props.theme.transition};
  &:hover {
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.background};
    border-color: ${(props) => props.theme.primary};
  }
`;

//StudentExamQuestionpage
export const QuestionContainer = styled.div``;
export const QuestionSection = styled.div``;
export const LeftContainer = styled.div`
  float:left;
`;
export const RightContainer = styled.div`
  margin-left: 70%;
`;
export const QuestionBox = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.background};
    border-color: ${(props) => props.theme.primary};
  }

`;
export const QuestionGrid = styled.div`
  display: grid;

  gap: 10px;
`;
export const QuestionRow = styled.div`
  display: flex;
  justify-content: column;
  gap:10px;
`;
export const LegendBlueColor = styled.div`
  background: green;
  width:25px;
  height:25px;
  margin:5px
`;
export const LegendRedColor = styled.div`
  background: Red;
  width:25px;
  height:25px;
  margin:5px
`;
export const LegendGreyColor = styled.div`
  background: grey;
  width:25px;
  height:25px;
  margin:5px
`;









export const PageTitleDesc = styled.div`
    margin:0 20px;
`;
export const PageDesc = styled.div`
    margin:0 20px;
`;

export const PageContainer = styled.div``;
export const PageEnterSpace = styled.br``;

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