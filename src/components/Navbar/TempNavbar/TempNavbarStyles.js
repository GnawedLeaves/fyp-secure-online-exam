import styled from "styled-components";

export const TempNavbarContainer = styled.div`
  width: 15rem;
  height: 100vh;
  overflow-y: auto;
  position: absolute;
  right: 0;
  top: 0;
  background: ${(props) => props.theme.background};
  z-index: 999;
  transition: 0.3s;
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.text};
  padding: 0.5rem 0.2rem;
`;
export const TempNavbarHandle = styled.div`
  position: absolute;
  right: ${(props) => (props.open ? "14rem" : "-1rem")};
  top: 50%;
  width: 2rem;
  height: 5rem;
  z-index: 998;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.text};
  cursor: pointer;
`;
export const TempNavbarContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;
export const TempNavbarHeader = styled.div`
  font-size: 1.5rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export const TempNavbarBoxes = styled.div`
  width: 100%;
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.text};
  padding-bottom: 1rem;
`;
export const TempNavbarBox = styled.div`
  cursor: pointer;
  text-align: left;
  margin: 0.1rem 0;
  &:hover {
    text-decoration: underline;
  }
`;

export const TempNavbarHome = styled.div`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
