import styled from "styled-components";
import { useState } from "react";

export const DashButton = styled.a`
text-decoration: none;
display: block;
padding: 20px 0 20px 30px;
color: #bbb;
letter-spacing: 1px;
transition: color 0.2s, background-color 0.2s;

&:hover {
    background: #273849;
    color: white;
    text-decoration: none;
    font-weight: bold;
}

&.active {
    background: #273849;
    color: white;
    text-decoration: none;
`;

// Main body starts here
export const InstructorDashboardContainer = styled.div `
  width: 100%;
  padding: 2rem;
  flex-direction: row;
  align-items: center;
  gap: 2rem;

`;

export const Name = styled.span`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 3px;
`;

export const Info = styled.span`
  color: #888;
`;
export const StyledLink = styled.a`
  text-decoration: none;
  color: #7cbbea;
  transition: color 0.2s;

  &:hover {
    text-decoration: underline;
    color: cyan;
  }
`;

export const LogoutLink = styled.a`
  text-decoration: none;
`;

export const LogoutButton = styled.span`
  position: relative;
  float: right;
  padding: 5px 10px;
  color: tomato;
  font-weight: bold;
  border: 2px solid tomato;
  cursor: pointer;
  user-select: none;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: tomato;
    color: white;
  }

  &:active {
    top: 1px;
  }
`;

// Navbar 2 starts here
export const NavContainer = styled.ul`
  position: absolute;
  bottom: 0;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 15px;
`;

export const NavItem = styled.li`
  display: inline-block;
  margin-right: 30px;
  padding: 7px 0;
  color: ${(props) => (props.active ? "black" : "inherit")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  border-bottom: ${(props) => (props.active ? "4px solid #2DCC70" : "none")};
  cursor: pointer;
  transition: color 0.2s, border-bottom 0.2s;
  font-size: 20px;
  &:hover {
    border-bottom: 4px solid #2dcc70;
    text-decoration: none;
  }
`;


// contact admin page
export const InstructorHomeContainer = styled.div`
  display: flex;
`;

export const InstructorNavBarContainer = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const MainContentContainer = styled.div `
 width: 85%;
`;

export const MainContentCon =styled.div `
display: flex;
flex-wrap: wrap;
gap: 2rem;
margin: 3rem 0;
`;

export const PageTitleInstructor = styled.div`
  font-size 3rem;
  font-weight: 400;
`;

// set exam page
export const SetExamTableContainer = styled.div`
  display: table;
  width: 80%;
  border-spacing: 10px;
`;

export const SetExamTableRow = styled.div`
  display: table-row;
  
`;
export const SetExamTableData = styled.div`
  display: table-cell;
 
`;
