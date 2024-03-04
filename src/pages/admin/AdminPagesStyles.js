//import e from "cors";
import styled from "styled-components";

export const AdminHomePageContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const AdminHomePage = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 5rem;
`;
export const AdminNavbarContainer = styled.div``;
export const AdminNavbarContentContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const PageTitle = styled.div`
font-size 4rem;
font-weight: 600;
`;

export const OngoingExamsContainer = styled.div`
  width: 85%;
`;

export const OngoingExamsTitle = styled.div`
font-size 2rem;
font-weight: 600;
padding-bottom: 0.5rem;
  border-bottom: 2px solid ${(props) => props.theme.text};
`;

export const OngoingExams = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 3rem 0;
`;

export const AdminExamDetailsPageTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;

  text-align: left;
`;

export const AdminBackButtonContainer = styled.div`
  width: 100%;
  cursor: pointer;
`;

export const AdminTitleAndStatusContainer = styled.div`
  width: 100%;
  border-bottom: 2px solid ${(props) => props.theme.text};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 1rem;
  padding-bottom: 0.5rem;
`;

export const AdminExamStatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 1.4rem;
  font-weight: 600;
`;
export const AdminExamStatusBall = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: ${(props) => props.theme.statusGood};
`;

export const AdminExamAttributesContainer = styled.div`
  width: 100%;
  // background: salmon;
  display: flex;
  justify-content: space-between;
`;

export const AdminExamAttributes = styled.div``;
export const AdminExamAttributesTimeLeftContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
export const AdminExamAttributesTimeLeft = styled.div``;
export const AdminExamAttributesTimeLeftTitle = styled.div`
  font-size: 1.3rem;
`;

export const AdminExamAttributesTimeLeftEditButton = styled.div``;
export const AdminExamAttributesControlsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const AdminExamStudentsContainer = styled.div`
  border: 2px solid ${(props) => props.theme.text};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  padding: 2rem 2rem;
  width: fit-content;
`;

export const AdminExamStudentsTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  width: 100%;
  text-align: center;
`;

export const AdminExamStudentsCheatingContainer = styled.div`
  padding: 2rem 1rem;
  width: 100%;
  box-sizing: border-box;
`;
export const AdminExamStudentsCheatingTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
export const AdminExamStudentsCheatingTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
`;

export const AdminExamStudentsCheatingBubble = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: ${(props) => props.theme.statusError};
  border: 2px solid ${(props) => props.theme.statusError};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: ${(props) => props.theme.background};
`;

export const AdminExamStudentsCheatingBoxContainer = styled.div`
  margin: 1rem 0rem;
  display: flex;
  gap: 1rem;
`;

export const AdminExamStudentsMediumBubble = styled(
  AdminExamStudentsCheatingBubble
)`
  background: ${(props) => props.theme.statusIntermediate};
  border: 2px solid ${(props) => props.theme.statusIntermediate};
`;

export const AdminExamStudentsContainerButtonBar = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  padding: 0 3rem;
  justify-content: flex-end;
`;

export const AdminExamStudentsAndStatsContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
`;

export const AdminExamStatsContainer = styled(AdminExamStudentsContainer)`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
export const AdminExamStatsTitle = styled(AdminExamStudentsTitle)``;
export const AdminExamOneStatContainer = styled.div`
  width: 100%;
`;

export const AdminExamsOneStatViewAllContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  text-decoration: underline;
  cursor: pointer;
`;
export const AdminExamStatsCompletedTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

export const AdminExamStatsButtonBar = styled(
  AdminExamStudentsContainerButtonBar
)``;

export const AdminExamShortcutContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

export const AdminExamAllStudentsContainer = styled.div`
  width: 70rem;
  min-height: 40rem;
  border: 2px solid ${(props) => props.theme.text};
  border-radius: 1rem;
  padding: 1rem;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AdminExamAllStudentsTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const AdminExamAllStudentsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export const AdminExamAllStudentsName = styled.div``;
export const AdminExamAllStudentsVideo = styled.div`
  width: 9rem;
  height: 5rem;
  border: 2px solid ${(props) => props.theme.text};
`;

export const AdminExamAllStudentsBoxContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;
