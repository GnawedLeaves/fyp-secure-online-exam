import styled from "styled-components";

export const NavbarContainer = styled.div`
  position: sticky;
  left: 0;
  top: 0;
  height: 100vh;

  z-index: 99;
  height: 100vh;
  background-color: ${(props) => props.theme.background};
  display: flex;
  flex-direction: column;
  align-items: center;

  background: #ffffff;
  box-shadow: 5px 5px 10px #e8e8e8, -5px -5px 10px #ffffff;
`;
export const NavbarLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  align-items: center;
  color: ${(props) => props.theme.text};
  margin: 2rem 2rem;
`;

export const NavbarLogo = styled.div`
  display: flex;
  justify-content: center;
`;
export const NavbarTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
`;
export const NavbarContentContainer = styled.div`
  width: 100%;
`;
export const NavbarLinkContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  // justify-content: center;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0;
  cursor: pointer;
  transition: ${(props) => props.theme.transition};
  font-size: 1.1rem;
  color: ${(props) =>
    props.selected ? props.theme.primary : props.theme.text};
  font-weight: ${(props) => (props.selected ? "bold" : "400")};
  background: ${(props) =>
    props.selected ? props.theme.secondaryLight : "none"};

  &:hover {
    background-color: ${(props) => props.theme.secondaryLight};
  }
`;
export const NavbarLink = styled.div``;
export const NavbarLinkLogo = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.3rem;
`;

export const NavbarItemSelected = styled.div`
  position: absolute;
  z-index: 100;
  width: 0.6rem;
  transform: translateX(-50%);
  border-radius: 1rem;
  height: 100%;
  left: 0;
  top: 0;
  transition: ${(props) => props.theme.transition};
  background: ${(props) => props.theme.primary};
  opacity: ${(props) => (props.selected ? "1" : "0")};
`;

export const NavbarAlignContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.5rem 0;
  padding-left: 2.5rem;
`;

export const NavbarProfileContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 0;
`;

export const NavbarProfile = styled.div``;
export const NavbarLogoutButton = styled.button`
  width: 100%;
  padding: 0.7rem 0;
  font-size: 1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  background: none;
  border: none;
  transition: ${(props) => props.theme.transition};
  &:hover {
    color: ${(props) => props.theme.primary};
  }
`;
