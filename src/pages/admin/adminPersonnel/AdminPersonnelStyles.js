import styled from "styled-components";

export const AdminPersonnelBigContainer = styled.div`
  display: flex;
`;
export const AdminPersonnelContainer = styled.div`
  padding: 3rem 2rem;
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
  display: flex;
  align-items: center;
`;

export const AdminPersonnelSummaryContainer = styled(
  AdminPersonnelHeaderContainer
)`
  align-items: center;
  padding: 0.8rem 1rem;
  display: ${(props) => (props.display ? "flex" : "none")};
  border-bottom: 1px solid ${(props) => props.theme.grey};
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
export const AdminNewPersonnelContainer = styled(AdminPersonnelContainer)``;

export const AdminNewPersonnelTitle = styled.div`
  font-size: 3rem;
  font-weight: bold;
`;

export const AdminNewButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const AdminNewFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 20rem;
  margin: 0rem 0;
`;
export const AdminNewFieldTitle = styled.div``;
export const AdminNewField = styled.input`
  font-family: "Inter", sans-serif;
  border: 2px solid ${(props) => props.theme.text};
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  border-radius: 2rem;
`;

export const ToggleButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;

export const AdminPersonnelDetailsContainer = styled.div`
padding: 2rem;
  width: 100%;`

export const AdminNewPersonnelAlignContainer = styled.div`
display: flex;
flex-direction: column;
gap: 2rem;
align-items: center;
`


export const AdminPersonnelDetailsHeader = styled.div`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  `


export const AdminPersonnelTitle = styled.div`
font-size: 2rem;
font-weight: bold;
margin-bottom: 2rem;
  `

export const AdminPersonnelIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right:  1rem;
`


