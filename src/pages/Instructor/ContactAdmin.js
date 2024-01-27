import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import Navbar from "../../components/Navbar/Navbar";
import { RiHome4Line } from "react-icons/ri";
import { IoBookmarksOutline, IoLibraryOutline, IoMailOpenOutline, IoPeopleOutline, IoSettingsOutline } from "react-icons/io5";
import { InstructorHomeContainer, InstructorNavBarContainer, MainContentCon, MainContentContainer, PageTitleInstructor } from "./InstructorStyle";
import { PageTitle } from "../admin/AdminPagesStyles";
import FeedbackForm from "./FeedbackForm";


// nav settings. should do it as a component. tbd
export const instructorNavBarItems = [
  {
    title: "DASHBOARD",
    path: "/Instructor/InstructorPage",
    logo: <RiHome4Line />,
  },

  {
    title: "Library",
    path: "/Instructor/InstructorLibrary",
    logo: <IoLibraryOutline />,
  },

  {
    title: "Exams",
    path: "/Instructor/InstructorExamPage",
    logo: <IoBookmarksOutline />,
  },

  {
    title: "Proctor",
    path: "/Instructor/InstructorProctor",
    logo: <IoPeopleOutline />,
  },

  {
    title: "To Admin",
    path: "/Instructor/ContactAdmin",
    logo: <IoMailOpenOutline />,
  },

  {
    title: "Settings",
    path: "/Instructor/InstructorSettings",
    logo: <IoSettingsOutline />,
  },
];


const ContactForm = () => {
    const handleSubmit = (event) => {
        // Handle form submission logic here
        event.preventDefault();
        // Additional logic...
    };


};


const ContactAdmin = () => {

    return(

  <ThemeProvider theme={theme}>
    <InstructorHomeContainer>
    <Navbar linksArray={instructorNavBarItems} />
    <InstructorNavBarContainer>
        <PageTitleInstructor>Contact Admin</PageTitleInstructor>
        <FeedbackForm/>
       

    </InstructorNavBarContainer>
    
    </InstructorHomeContainer>
  </ThemeProvider>
  );
};

export default ContactAdmin;
