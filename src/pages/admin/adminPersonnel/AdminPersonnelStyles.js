import styled from "styled-components";

export const AdminPersonnelBigContainer = styled.div`
  display: flex;
`;
export const AdminPersonnelContainer = styled.div`
  padding: 2rem;
  width: 100%;
`;

export const AdminPersonnelFiltersContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const AdminPersonnelFiltersTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

export const AdminPersonnelNavbarContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const AdminPersonnelTable = styled.div`
  margin: 3rem 0;
  width: 100%;
`;
export const AdminPersonnelHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0.2rem 1rem;
  box-sizing: border-box;
  border-bottom: 1px solid ${(props) => props.theme.text};
`;

export const AdminPersonnelHeader = styled.div`
  width: ${(props) => (props.width ? props.width : "10%")};
  font-size: 0.9rem;
`;

export const AdminPersonnelSummaryContainer = styled(
  AdminPersonnelHeaderContainer
)`
  align-items: center;
  padding: 0.8rem 1rem;
  display: ${(props) => (props.display ? "flex" : "none")};
`;

export const AdminPersonnelSummary = styled(AdminPersonnelHeader)`
  font-size: 1.1rem;
  box-sizing: border-box;
  padding: 0 0.2rem;
`;

export const AdminPersonnelSummaryButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;
