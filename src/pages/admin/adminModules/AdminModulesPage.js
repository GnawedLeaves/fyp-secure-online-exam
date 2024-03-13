import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../theme";
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
} from "../AdminPagesStyles";
import Navbar from "../../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { RiHome4Line } from "react-icons/ri";
import { IoBookOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import LoadingPage from "../../common/loadingPage/LoadingPage";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import BubbleSelect from "../../../components/BubbleSelect/BubbleSelect";
import BubbleAdd from "../../../components/BubbleAdd/BubbleAdd";
import { RxCross2 } from "react-icons/rx";
import { db } from "../../../backend/firebase/firebase";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { adminNavbarItems } from "../AdminHomePage";


const AdminModulesPage = () => {
  const navigate = useNavigate();
  const modulesRef = collection(db, "modules");
  //edit this when want to add loading screen
  const [finishedLoading, setFinishedLoading] = useState(true);
  const [allModulesData, setAllModulesData] = useState();
  //MODULES METHODS

  useEffect(() => {
    getModuleData();
  }, []);

  const getModuleData = async () => {
    try {
      const querySnapshot = await getDocs(modulesRef);
      const modulesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAllModulesData(modulesData);
    } catch (e) {
      console.log("Error getting module data: ", e);
    }
  };

  //MODAL METHODS
  const [openAddNewModule, setOpenAddNewModule] = useState(false);
  const [newModuleName, setNewModuleName] = useState("");
  const [newModuleItems, setNewModuleItems] = useState([]);
  const [showAddModuleSuccessModal, setShowAddModuleSuccessModal] =
    useState(false);
  const [showAddModuleFailureModal, setShowAddModuleFailureModal] =
    useState(false);
  const [addModuleError, setAddModuleError] = useState();

  const handleBubbleData = (data) => {
    if (moduleIdToEdit) {
      setModuleEditingClasses(data);
    } else {
      setNewModuleItems(data);
    }
  };

  const handleAddNewModule = async () => {
    if (newModuleName !== "" && newModuleItems.length !== 0) {
      const sortedData = newModuleItems.sort((a, b) => a.localeCompare(b));
      const newModuleObject = {
        name: newModuleName,
        classes: sortedData,
        timestamp: serverTimestamp(),
      };

      try {
        const addModuleRef = await addDoc(modulesRef, newModuleObject);
        setShowAddModuleSuccessModal(true);
        setNewModuleName("");
        setNewModuleItems([]);
        setOpenAddNewModule(false);
        getModuleData();
      } catch (e) {
        setAddModuleError(e);
        setShowAddModuleFailureModal(true);
        console.log("error adding module: ", e);
      }
    } else {
      setAddModuleError("Please enter name of module and at least 1 class.");
      setShowAddModuleFailureModal(true);
    }
  };

  //Delete functions
  const [moduleIdToDelete, setModuleIdToDelete] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const onDeleteClick = (id) => {
    setModuleIdToDelete(id);
    setOpenDeleteModal(true);
  };

  const handleModuleDelete = async () => {
    if (moduleIdToDelete !== null) {
      const documentRef = doc(modulesRef, moduleIdToDelete);
      deleteDoc(documentRef)
        .then(() => {
          console.log("Document successfully deleted!", moduleIdToDelete);
          getModuleData();
        })
        .catch((error) => {
          console.error("Error deleting document: ", error);
        });

      setModuleIdToDelete("");
    }
  };

  //Edit functions
  const [moduleIdToEdit, setModuleIdToEdit] = useState();
  const [moduleEditingName, setModuleEditingName] = useState();
  const [moduleEditingClasses, setModuleEditingClasses] = useState([]);
  const [showModuleEditingSuccessModal, setShowModuleEditingSuccessModal] =
    useState(false);

  const onEditClick = (id, name, classes) => {
    setModuleIdToEdit(id);
    setOpenAddNewModule(true);
    setModuleEditingName(name);
    setModuleEditingClasses(classes);
  };

  const handleModuleEdit = async () => {
    const moduleRef = doc(db, "modules", moduleIdToEdit);
    if (moduleEditingClasses.length !== 0 && moduleEditingName !== "") {
      try {
        await updateDoc(moduleRef, {
          timestamp: serverTimestamp(),
          name: moduleEditingName,
          classes: moduleEditingClasses,
        });
        console.log("Document updated successfully");
        handleEditSuccess();
      } catch (e) {
        console.log("Error updating module", e);
      }
    } else {
      setAddModuleError("Please enter name of module and at least 1 class.");
      setShowAddModuleFailureModal(true);
    }
  };

  const handleEditSuccess = () => {
    setShowModuleEditingSuccessModal(true);
    setOpenAddNewModule(false);
    getModuleData();
    setModuleEditingName();
    setModuleIdToEdit();
    setModuleEditingClasses([]);
  };

  return (
    <ThemeProvider theme={theme}>
      {finishedLoading ? (
        <AdminHomePageContainer>
          <Navbar linksArray={adminNavbarItems} />
          <AdminNavbarContentContainer>
            <Modal
              handleModalClose={() => {
                setShowModuleEditingSuccessModal(false);
              }}
              actionButtonText="OK"
              actionButtonColor={theme.primary}
              filled={true}
              actionButtonClick={() => { }}
              show={showModuleEditingSuccessModal}
              modalTitle="Changes Saved"
              modalContent={`Module ${moduleEditingName ? moduleEditingName : ""
                } has been updated.`}
            />
            <Modal
              handleModalClose={() => {
                setOpenDeleteModal(false);
              }}
              modalType="action"
              actionButtonText="Delete"
              actionButtonColor={theme.statusError}
              actionButtonClick={() => {
                handleModuleDelete();
              }}
              show={openDeleteModal}
              modalTitle="Delete Module"
              modalContent="Are you sure you want to delete this module? This action cannot be undone."
            />
            <Modal
              handleModalClose={() => {
                setShowAddModuleSuccessModal(false);
              }}
              actionButtonText="OK"
              actionButtonColor={theme.primary}
              filled={true}
              actionButtonClick={() => { }}
              show={showAddModuleSuccessModal}
              modalTitle="Success!"
              modalContent="Add module successful."
            />

            <Modal
              handleModalClose={() => {
                setShowAddModuleFailureModal(false);
              }}
              actionButtonText="OK"
              actionButtonColor={theme.statusError}
              filled={true}
              actionButtonClick={() => { }}
              show={showAddModuleFailureModal}
              modalTitle="Error!"
              modalContent={`${addModuleError ? addModuleError : ""}`}
            />
            <Modal
              handleModalClose={() => { }}
              modalType="empty"
              show={openAddNewModule}
            >
              <AdminModuleModalContainer>
                <AdminModuleModalTitle>
                  {moduleIdToEdit ? "Edit Module" : "Add New Module"}
                </AdminModuleModalTitle>
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
                    value={moduleIdToEdit ? moduleEditingName : newModuleName}
                    onChange={(e) => {
                      if (moduleIdToEdit) {
                        setModuleEditingName(e.target.value);
                      } else {
                        setNewModuleName(e.target.value);
                      }
                    }}
                  />
                </AdminModuleFieldContainer>
                <AdminModuleSelectionContainer>
                  <AdminModuleBubbleContaier>
                    <BubbleAdd
                      initData={moduleIdToEdit ? moduleEditingClasses : null}
                      handleBubbleData={handleBubbleData}
                      title="Tutorial Name"
                    />
                  </AdminModuleBubbleContaier>
                </AdminModuleSelectionContainer>
                <Button
                  filled={newModuleName !== "" && newModuleItems.length !== 0}
                  onClick={() => {
                    if (moduleIdToEdit) {
                      handleModuleEdit();
                    } else {
                      handleAddNewModule();
                    }
                  }}
                >
                  {moduleIdToEdit ? "Save Changes" : "Add Module"}
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
                {allModulesData?.map((module, index) => {
                  return (
                    <AdminModuleBox key={index}>
                      <AdminModuleBoxTitle>{module.name}</AdminModuleBoxTitle>
                      <AdminModuleBoxIconsContainer>
                        <AdminModuleBoxIcon
                          onClick={() => {
                            onEditClick(module.id, module.name, module.classes);
                          }}
                        >
                          <MdOutlineEdit size="1.5rem" />
                        </AdminModuleBoxIcon>
                        <AdminModuleBoxIcon
                          onClick={() => {
                            onDeleteClick(module.id);
                          }}
                        >
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

export default AdminModulesPage;
