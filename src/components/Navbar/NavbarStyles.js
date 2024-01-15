import styled from "styled-components";
import { NavLink } from 'react-router-dom';

export const NavbarContainer = styled.div`
  display: flex;
`;
export const NavbarSidebar = styled.div`
  color: black;
  background: white;
  height: 100vh;
  width: 300px;
`;
export const NavbarTopsection = styled.div`
  display:flex;
  align-items: center;
  padding: 10px 15px;
`;
export const NavbarBar = styled.div`
  font-size:25px;
  display: flex;
  margin-left:20px;
`;
export const NavbarLogo = styled.div``;
export const NavbarLogoTitle = styled.h1`
  font-size:30px;
  margin: 0 20px;
`;
export const NavbarAnchorLogo = styled.div`
  font-size: 20px;
`;
export const NavbarAnchor = styled.div`
  font-size: 20px;
`;
export const NavbarMain = styled.main`
  width: 100%;
  padding: 20px;
`;
export const NavBarLink = styled(NavLink)`
  text-decoration:none;
  display: flex;
  color: black;
  padding: 10px 15px;
  gap: 15px;
  transition: all 0.5s;

  &:hover {
    background: blue;
    color: white;
    transition: all 0.5s;
  }
  &.active {
    background: blue;
    color: white;
  }
`;



