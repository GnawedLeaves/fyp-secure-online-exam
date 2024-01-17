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
const Navbar = () => {
  const navigate = useNavigate();

  const changePage = (url) => {
    console.log(`/${url}`);
    navigate(`/${url}`);
  };
  //TODO: Change depending on who is logged in
  const navbarItems = [
    {
      title: "Home",
      url: "adminhome",
      logo: <RiHome4Line />,
    },
    {
      title: "Exams",
      url: "adminhome",
      logo: <IoBookOutline />,
    },
    {
      title: "Personnel",
      url: "adminhome",
      logo: <IoPeopleOutline />,
    },
    {
      title: "Messages",
      url: "adminhome",
      logo: <IoMailOutline />,
    },
    {
      title: "Settings",
      url: "adminhome",
      logo: <IoSettingsOutline />,
    },
  ];
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    console.log(selected);
  }, [selected]);

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
          {navbarItems.map((item, index) => (
            <NavbarLinkContainer
              selected={selected === index}
              key={index}
              onClick={() => {
                setSelected(index);
                const string = "/" + item.url;
                navigate(string);
              }}
            >
              <NavbarAlignContainer>
                <NavbarLinkLogo>{item.logo}</NavbarLinkLogo>

                {item.title}
              </NavbarAlignContainer>
              <NavbarItemSelected selected={selected === index} />
            </NavbarLinkContainer>
          ))}
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
