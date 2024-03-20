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
} from "../../components/Navbar/NavbarStyles";
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
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const ProctorNavbar = (props) => {
  const navigate = useNavigate();

  const changePage = (path) => {
    console.log(`/${path}`);
    navigate(`/${path}`);
  };
  const currentURL = window.location.href;
  //TODO: Change depending on who is logged in

  const [loggedInUserId, setLoggedInUserId] = useState("");
  const [userData, setUserData] = useState();

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setLoggedInUserId(uid);
        setUserData(true);
        console.log("user is signed in: ", uid);
      } else {
        setUserData(false);
        //TODO: uncomment this when project finished
        // navigate("/login");
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out successful");
        navigate("/login");
      })
      .catch((error) => {
        console.log("Error when signing out: ", error);
      });
  };

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
                  if (item.path === '/Instructor/InstructorProctor') {
                    // Refresh the page
                    window.location.reload();
                  }
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
          <NavbarProfile>
            {loggedInUserId ? loggedInUserId : "Not Logged In"}
          </NavbarProfile>
          <NavbarLogoutButton
            onClick={() => {
              handleSignOut();
              // navigate("/login");
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

export default ProctorNavbar;
