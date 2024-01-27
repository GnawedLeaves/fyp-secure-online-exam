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
import Modal from "../../../components/Modal/Modal";
import {
  ascendingAlphabeticalSort,
  descendingAlphabeticalSort,
} from "../../../functions/sortArray";
import ToggleArrow from "../../../components/ToggleArrow/ToggleArrow";

const AdminPersonnelPage = () => {
  const filters = ["Teacher", "Student", "Admin", "Others"];
  const [filtersSelected, setFiltersSelected] = useState(["All"]);

  const handleFilterBarData = (data) => {
    const lowerCaseFilters = data.map((filter) => filter.toLowerCase());
    setFiltersSelected(lowerCaseFilters);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deletePersonnel = (userId) => {
    console.log("user: ", userId, "deleted");
  };

  const headers = [
    {
      title: "ID",
      width: "10%",
    },
    {
      title: "Name",
      width: "25%",
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
      width: "20%",
    },
  ];

  const [dummyUserData, setDummyUserData] = useState([
    {
      id: "1221",
      name: "gememee",
      course: "EEE",
      year: "4",
      type: "student",
      dateAdded: "24/05/2023",
    },
    {
      id: "5221",
      name: "cememee",
      course: "EEE",
      year: "1",
      type: "student",
      dateAdded: "24/05/2023",
    },
    {
      id: "22131",
      name: "zememee",
      course: "DSAI",
      year: "2",
      type: "teacher",
      dateAdded: "24/05/2023",
    },
    {
      id: "1221",
      name: "aaaaememee",
      course: "IEM",
      year: "3",
      type: "student",
      dateAdded: "24/05/2023",
    },
    {
      id: "91221",
      name: "ememeee  e qwq  h eoioi ijwejqwoijwq o whwe oiqwhohweoiweiq ooeiwhqqwiohq weoi",
      course: "EEE",
      year: "4",
      type: "student",
      dateAdded: "24/05/2023",
    },
    {
      id: "19221",
      name: "yememeee  e qwq  h eoioi ijwejqwoijwq o whwe oiqwhohweoiweiq ooeiwhqqwiohq weoi",
      course: "MAE",
      year: "4",
      type: "admin",
      dateAdded: "24/05/2023",
    },
  ]);

  //todo: sort based on name and year etc: https://chat.openai.com/c/97c7668d-6720-4341-8d1a-52a396cbca8e

  useEffect(() => {
    console.log("dummyUserData", dummyUserData);
  }, [dummyUserData]);

  return (
    <ThemeProvider theme={theme}>
      <AdminPersonnelBigContainer>
        <Modal
          handleModalClose={() => {
            setShowDeleteModal(false);
          }}
          modalType="action"
          actionButtonText="Delete"
          actionButtonColor={theme.statusError}
          actionButtonClick={() => {
            deletePersonnel();
          }}
          show={showDeleteModal}
          modalTitle="Delete User"
          modalContent="Are you sure you want to delete this user? This action cannot be undone."
        />
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
                    <ToggleArrow
                      size="1.5rem"
                      downArrowFunction={() => {
                        const sortedArray = ascendingAlphabeticalSort(
                          dummyUserData,
                          header.title.toLowerCase()
                        );

                        setDummyUserData([...sortedArray]);
                      }}
                      upArrowFunction={() => {
                        const sortedArray = descendingAlphabeticalSort(
                          dummyUserData,
                          header.title.toLowerCase()
                        );

                        setDummyUserData([...sortedArray]);
                      }}
                    />
                  </AdminPersonnelHeader>
                );
              })}
            </AdminPersonnelHeaderContainer>
            {dummyUserData.map((user, index) => {
              return (
                <AdminPersonnelSummaryContainer
                  key={index}
                  display={
                    filtersSelected.includes("all") ||
                    filtersSelected.includes(user.type)
                  }
                >
                  <AdminPersonnelSummary>{user.id}</AdminPersonnelSummary>
                  <AdminPersonnelSummary width="25%">
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
                      onClick={() => {
                        setShowDeleteModal(true);
                      }}
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
