import styled from "styled-components";

export const AdminHomePageContainer = styled.div`
  display: flex;
`;
export const AdminNavbarContainer = styled.div``;
export const AdminNavbarContentContainer = styled.div`
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

export const AdminExamDetailsPageTitle = styled.div``;
