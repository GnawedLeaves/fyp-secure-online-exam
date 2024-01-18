import React, { useEffect, useState } from "react";
import {
  NavbarAlignContainer,
  NavbarContainer,
  NavbarContentContainer,
  NavbarItemSelected,
  NavbarLink,
  NavbarLinkContainer,
  NavbarLinkLogo,
  NavbarLogo,
  NavbarLogoContainer,
  NavbarLogoutButton,
  NavbarProfile,
  NavbarProfileContainer,
  NavbarTitle,
} from "./NavbarStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import { LuBookMarked } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { RiHome4Line } from "react-icons/ri";
import { IoBookOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";

const Navbar = (props) => {
  const navigate = useNavigate();

  const changePage = (path) => {
    console.log(`/${path}`);
    navigate(`/${path}`);
  };
  //TODO: Change depending on who is logged in

  const currentURL = window.location.href;

  return (
    <ThemeProvider theme={theme}>
      <NavbarContainer>
        <NavbarLogoContainer>
          <NavbarLogo>
            <LuBookMarked size="1.4rem" />
          </NavbarLogo>
          <NavbarTitle>ExamPulse</NavbarTitle>
        </NavbarLogoContainer>
        <NavbarContentContainer>
          {props.linksArray ? (
            props.linksArray.map((item, index) => (
              <NavbarLinkContainer
                selected={currentURL.includes(item.path)}
                key={index}
                onClick={() => {
                  navigate(item.path);
                }}
              >
                <NavbarAlignContainer>
                  <NavbarLinkLogo>{item.logo}</NavbarLinkLogo>

                  {item.title}
                </NavbarAlignContainer>
                <NavbarItemSelected selected={currentURL.includes(item.path)} />
              </NavbarLinkContainer>
            ))
          ) : (
            <>Navbar Empty</>
          )}
        </NavbarContentContainer>
        <NavbarProfileContainer>
          <NavbarProfile>Admin_01</NavbarProfile>
          <NavbarLogoutButton
            onClick={() => {
              navigate("/login");
            }}
          >
            <NavbarLinkLogo>
              <IoLogOutOutline />
            </NavbarLinkLogo>
            Logout
          </NavbarLogoutButton>
        </NavbarProfileContainer>
      </NavbarContainer>
    </ThemeProvider>
  );
};

export default Navbar;
