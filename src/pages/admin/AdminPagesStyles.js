//import e from "cors";
import e from "cors";
import styled from "styled-components";

export const AdminHomePageContainer = styled.div`
  width: 100%;
  display: flex;
  background: ${(props) => props.theme.background};
`;

export const AdminHomePage = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 2rem 2rem;
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

export const AdminAddModuleContainer = styled.div`
  width: 100%;
  padding: 0 5rem;
  box-sizing: border-box;
`;

export const AdminAddModuleTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

export const AdminAddModuleTitleAndButton = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AdminModuleBoxesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const AdminModuleBox = styled.div`
  display: flex;
  width: 15rem;
  padding: 1rem 2rem;
  ${(props) => props.theme.boxShadow};

  border-radius: 0.3rem;
  align-items: center;
  justify-content: space-between;
  // border: 1px solid ${(props) => props.theme.text};

  background: ${(props) => props.theme.white};
`;
export const AdminModuleBoxTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

export const AdminModuleBoxIconsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const AdminModuleBoxIcon = styled.div`
  cursor: pointer;
`;

export const AdminModuleModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  position: relative;
  width: 20rem;
`;

export const AdminModuleModalTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const AdminModuleFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 15rem;
`;
export const AdminModuleFieldTitle = styled.div``;
export const AdminModuleField = styled.input`
  font-family: ${(props) => props.theme.font};
  border: 2px solid ${(props) => props.theme.text};
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  border-radius: 2rem;
`;

export const AdminModuleSelectionContainer = styled.div``;
export const AdminModuleModalIcon = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  cursor: pointer;
`;

export const AdminModuleBubbleContaier = styled.div`
  width: 100%;
`;

export const AdminExamDetailsTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

export const AdminExamDetailsSubtitle = styled.div`
  font-size: 1rem;
`;

export const AdminExamDetailsDetailsContainer = styled.div`
  margin-top: -10rem;
  width: 100%;
  background: ${(props) => props.theme.white};
  height: 100%;
  // background: red;
  position: relative;
  z-index: 90;
  border-top: 3px solid ${(props) => props.theme.grey};
  padding: 0 2rem;
  box-sizing: border-box;
  padding-top: 12rem;
`;

export const AdminExamDetailsTimeContainer = styled.div`
  background: ${(props) => props.theme.white};
  ${(props) => props.theme.boxShadow};
  border-top: 1px solid ${(props) => props.theme.grey};
  box-sizing: border-box;
  padding: 2rem 1rem;
  border-radius: 1rem;
  width: 30rem;
  // min-height: 20rem;
  margin-top: 3rem;
  position: relative;
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const AdminExamDetailsTimeField = styled.div`
  font-size: 1.1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.4rem;
`;

export const AdminExamDetailsPage = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AdminExamDetailsStatusDisplay = styled.div`
  margin-top: 2rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const AdminExamDetailsBackButtonContainer = styled.div`
  width: 100%;
  padding-left: 3rem;
`;

export const AdminExamDetailsStatusBall = styled.div`
  background: ${(props) =>
    props.status === "Ongoing" ? props.theme.statusError : ""};
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 1rem;
  animation: 2s fade 0s infinite;
  @keyframes fade {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;

export const EditTimeModalTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const EditTimeModalContainer = styled.div`
  // padding: 1rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const EditTimeModalInput = styled.input`
  height: 2rem;
  font-size: 1rem;
  cursor: pointer;
`;

export const EditTimeModalButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const EditTimeModalEditIconContainer = styled.div`
  display: flex;
  cursor: pointer;
`;
export const EditTimeModalTitleAndIcon = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 1.2rem;
  align-items: center;
`;

export const AdminExamDetailsDetailsTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const AdminExamDetailsPersonnel = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
export const AdminExamDetailsPersonnelBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  ${(props) => props.theme.boxShadow};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 1rem;
`;

export const AdminExamDetailsPersonnelBoxButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;
