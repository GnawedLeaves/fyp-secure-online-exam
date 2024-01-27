import { ThemeProvider } from "styled-components";
import { theme } from "../../../theme";
import {
  AdminPersonnelBigContainer,
  AdminPersonnelContainer,
  AdminPersonnelFiltersContainer,
  AdminPersonnelFiltersTitle,
  AdminPersonnelHeader,
  AdminPersonnelHeaderContainer,
  AdminPersonnelNavbarContainer,
  AdminPersonnelSummary,
  AdminPersonnelSummaryButtonsContainer,
  AdminPersonnelSummaryContainer,
  AdminPersonnelTable,
} from "./AdminPersonnelStyles";
import Navbar from "../../../components/Navbar/Navbar";
import { adminNavbarItems } from "../AdminHomePage";
import Button from "../../../components/Button/Button";
import React, { useState } from "react";
import { useEffect } from "react";
import FilterBar from "../../../components/FilterBar/FilterBar";

const AdminPersonnelPage = () => {
  const filters = ["Teacher", "Student", "Admin", "Others"];
  const [filtersSelected, setFiltersSelected] = useState(["All"]);

  const handleFilterBarData = (data) => {
    const lowerCaseFilters = data.map((filter) => filter.toLowerCase());
    setFiltersSelected(lowerCaseFilters);
  };

  const headers = [
    {
      title: "ID",
      width: "10%",
    },
    {
      title: "Name",
      width: "30%",
    },
    {
      title: "Course",
      width: "10%",
    },
    {
      title: "Year",
      width: "10%",
    },
    {
      title: "Type",
      width: "10%",
    },
    {
      title: "Date Added",
      width: "10%",
    },
  ];

  const dummyUserData = [
    {
      id: "1221",
      name: "mememee",
      course: "EEE",
      year: "4",
      type: "teacher",
      dateAdded: "24/05/2023",
    },
    {
      id: "1221",
      name: "mememee",
      course: "EEE",
      year: "4",
      type: "student",
      dateAdded: "24/05/2023",
    },
    {
      id: "1221",
      name: "mememeee  e qwq  h eoioi ijwejqwoijwq o whwe oiqwhohweoiweiq ooeiwhqqwiohq weoi",
      course: "EEE",
      year: "4",
      type: "student",
      dateAdded: "24/05/2023",
    },
    {
      id: "1221",
      name: "mememeee  e qwq  h eoioi ijwejqwoijwq o whwe oiqwhohweoiweiq ooeiwhqqwiohq weoi",
      course: "EEE",
      year: "4",
      type: "admin",
      dateAdded: "24/05/2023",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <AdminPersonnelBigContainer>
        <Navbar linksArray={adminNavbarItems} />
        <AdminPersonnelContainer>
          <AdminPersonnelNavbarContainer>
            <FilterBar
              filters={filters}
              handleFilterBarData={handleFilterBarData}
              buttonFilledColor={theme.primary}
            />
            <Button filled={true}>Add New +</Button>
          </AdminPersonnelNavbarContainer>

          <AdminPersonnelTable>
            <AdminPersonnelHeaderContainer>
              {headers.map((header, index) => {
                return (
                  <AdminPersonnelHeader width={header.width} key={index}>
                    {header.title}
                  </AdminPersonnelHeader>
                );
              })}
            </AdminPersonnelHeaderContainer>
            {dummyUserData.map((user, index) => {
              return (
                <AdminPersonnelSummaryContainer
                  key={index}
                  display={
                    filtersSelected.includes("all")
                      ? true
                      : filtersSelected.includes(user.type)
                  }
                >
                  <AdminPersonnelSummary>{user.id}</AdminPersonnelSummary>
                  <AdminPersonnelSummary width="30%">
                    {user.name}
                  </AdminPersonnelSummary>
                  <AdminPersonnelSummary>{user.course}</AdminPersonnelSummary>
                  <AdminPersonnelSummary>{user.year}</AdminPersonnelSummary>
                  <AdminPersonnelSummary>{user.type}</AdminPersonnelSummary>
                  <AdminPersonnelSummary>
                    {user.dateAdded}
                  </AdminPersonnelSummary>
                  <AdminPersonnelSummaryButtonsContainer>
                    <Button filledColor={theme.primary}>Details</Button>
                    <Button
                      filled={true}
                      defaultColor={theme.statusError}
                      filledColor={theme.statusError}
                    >
                      Delete
                    </Button>
                  </AdminPersonnelSummaryButtonsContainer>
                </AdminPersonnelSummaryContainer>
              );
            })}
          </AdminPersonnelTable>
        </AdminPersonnelContainer>
      </AdminPersonnelBigContainer>
    </ThemeProvider>
  );
};

export default AdminPersonnelPage;
