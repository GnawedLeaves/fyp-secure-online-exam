import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import {
  AdminAddModuleContainer,
  AdminAddModuleTitle,
  AdminAddModuleTitleAndButton,
  AdminHomePageContainer,
  AdminModuleBox,
  AdminModuleBoxIcon,
  AdminModuleBoxIconsContainer,
  AdminModuleBoxTitle,
  AdminModuleBoxesContainer,
  AdminModuleBubbleContaier,
  AdminModuleField,
  AdminModuleFieldContainer,
  AdminModuleFieldTitle,
  AdminModuleModalContainer,
  AdminModuleModalIcon,
  AdminModuleModalTitle,
  AdminModuleSelectionContainer,
  AdminNavbarContentContainer,
  PageTitle,
} from "./AdminPagesStyles";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { RiHome4Line } from "react-icons/ri";
import { IoBookOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import LoadingPage from "../common/loadingPage/LoadingPage";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import BubbleSelect from "../../components/BubbleSelect/BubbleSelect";
import BubbleAdd from "../../components/BubbleAdd/BubbleAdd";
import { RxCross2 } from "react-icons/rx";

export const adminNavbarItems = [
  {
    title: "Home",
    path: "/admin/home",
    logo: <RiHome4Line />,
  },
  {
    title: "Exams",
    path: "/admin/exams",
    logo: <IoBookOutline />,
  },
  {
    title: "Personnel",
    path: "/admin/personnel",
    logo: <IoPeopleOutline />,
  },
  {
    title: "Messages",
    path: "/admin/messages",
    logo: <IoMailOutline />,
  },
  {
    title: "Settings",
    path: "/admin/settings",
    logo: <IoSettingsOutline />,
  },
];

const AdminHomePage = () => {
  const navigate = useNavigate();
  //edit this when want to add loading screen
  const [finishedLoading, setFinishedLoading] = useState(true);

  //MODULES METHODS

  const dummyModuleData = [
    {
      code: "IE4717",
      tutorials: ["EE01", "EE02", "EE03"],
    },
    {
      code: "AB1234",
      tutorials: ["AA01", "AA02", "AA03"],
    },
    {
      code: "CD5678",
      tutorials: ["BB01", "BB02", "BB03"],
    },
    {
      code: "FG91011",
      tutorials: ["CC01", "CC02", "CC03"],
    },
    {
      code: "HI121314",
      tutorials: ["DD01", "DD02", "DD03"],
    },
    {
      code: "JK151617",
      tutorials: ["FF01", "FF02", "FF03"],
    },
    {
      code: "LM181920",
      tutorials: ["GG01", "GG02", "GG03"],
    },
    {
      code: "NO212223",
      tutorials: ["HH01", "HH02", "HH03"],
    },
    {
      code: "PQ242526",
      tutorials: ["II01", "II02", "II03"],
    },
    {
      code: "RS272829",
      tutorials: ["JJ01", "JJ02", "JJ03"],
    },
  ];

  //MODAL METHODS
  const [openAddNewModule, setOpenAddNewModule] = useState(true);
  const [newModuleName, setNewModuleName] = useState("");
  const [newModuleItems, setNewModuleItems] = useState([]);

  const handleBubbleData = (data) => {
    console.log("data at parent level", data);
  };

  return (
    <ThemeProvider theme={theme}>
      {finishedLoading ? (
        <AdminHomePageContainer>
          <Navbar linksArray={adminNavbarItems} />
          <AdminNavbarContentContainer>
            <Modal
              handleModalClose={() => {}}
              modalType="empty"
              show={openAddNewModule}
            >
              <AdminModuleModalContainer>
                <AdminModuleModalTitle>Add New Module</AdminModuleModalTitle>
                <AdminModuleModalIcon
                  onClick={() => {
                    setOpenAddNewModule(false);
                  }}
                >
                  <RxCross2 size={"1.5rem"} />
                </AdminModuleModalIcon>

                <AdminModuleFieldContainer>
                  <AdminModuleFieldTitle>Name</AdminModuleFieldTitle>
                  <AdminModuleField
                    onChange={(e) => {
                      setNewModuleName(e.target.value);
                    }}
                  />
                </AdminModuleFieldContainer>
                <AdminModuleSelectionContainer>
                  <AdminModuleBubbleContaier>
                    <BubbleAdd
                      handleBubbleData={handleBubbleData}
                      title="Tutorials Name"
                    />
                  </AdminModuleBubbleContaier>
                </AdminModuleSelectionContainer>
                <Button
                  filled={true}
                  onClick={() => {
                    setOpenAddNewModule(false);
                  }}
                >
                  Add Module
                </Button>
              </AdminModuleModalContainer>
            </Modal>

            <PageTitle>Home</PageTitle>
            <AdminAddModuleContainer>
              <AdminAddModuleTitleAndButton>
                <AdminAddModuleTitle>Modules</AdminAddModuleTitle>
                <Button
                  filled={true}
                  onClick={() => {
                    setOpenAddNewModule(true);
                  }}
                >
                  Add Module +
                </Button>
              </AdminAddModuleTitleAndButton>

              <AdminModuleBoxesContainer>
                {dummyModuleData.map((module) => {
                  return (
                    <AdminModuleBox>
                      <AdminModuleBoxTitle>{module.code}</AdminModuleBoxTitle>
                      <AdminModuleBoxIconsContainer>
                        <AdminModuleBoxIcon>
                          <MdOutlineEdit size="1.5rem" />
                        </AdminModuleBoxIcon>
                        <AdminModuleBoxIcon>
                          <MdOutlineDelete size="1.5rem" />
                        </AdminModuleBoxIcon>
                      </AdminModuleBoxIconsContainer>
                    </AdminModuleBox>
                  );
                })}
              </AdminModuleBoxesContainer>
            </AdminAddModuleContainer>
          </AdminNavbarContentContainer>
        </AdminHomePageContainer>
      ) : (
        <LoadingPage />
      )}
    </ThemeProvider>
  );
};

export default AdminHomePage;
