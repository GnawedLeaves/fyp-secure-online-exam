import { ThemeProvider } from "styled-components";
import { theme } from "../../../theme";
import {
  AdminPersonnelBigContainer,
  AdminPersonnelContainer,
  AdminPersonnelFiltersContainer,
  AdminPersonnelFiltersTitle,
  AdminPersonnelHeader,
  AdminPersonnelHeaderContainer,
  AdminPersonnelIconContainer,
  AdminPersonnelNavbarContainer,
  AdminPersonnelSummary,
  AdminPersonnelSummaryButtonsContainer,
  AdminPersonnelSummaryContainer,
  AdminPersonnelTable,
  AdminPersonnelTitle,
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
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../backend/firebase/firebase";
import { handleFirebaseDate } from "../../../backend/firebase/handleFirebaseDate";
import { getAllDocuments } from "../../../backend/firebase/getAllDocuments";
import { useNavigate } from "react-router-dom";
import { IoMailOutline } from "react-icons/io5";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AdminPersonnelPage = () => {
  const filters = ["Teacher", "Student", "Admin", "Others"];
  const [filtersSelected, setFiltersSelected] = useState(["All"]);
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        getUserId(uid);
      }
    });
  }, []);

  const getUserId = async (authId) => {
    const q = query(collection(db, "users"), where("authId", "==", authId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const firstDoc = querySnapshot.docs[0];
      const userId = firstDoc.id;
      setUserId(userId);
    }
  };

  const handleFilterBarData = (data) => {
    const lowerCaseFilters = data.map((filter) => filter.toLowerCase());
    setFiltersSelected(lowerCaseFilters);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //Delete user function
  const usersRef = collection(db, "users");
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [userDataToDelete, setUserDataToDelete] = useState(null);
  const [userAuthIdToDelete, setAuthuserIdToDelete] = useState(null);

  //init

  const deletePersonnel = async () => {
    if (userDataToDelete !== null) {
      //Delete user from the exams if student
      if (userDataToDelete.type === "student") {
        const examsRef = collection(db, "exams");
        userDataToDelete.modules.forEach(async (module) => {
          try {
            const querySnapshot = await getDocs(
              query(examsRef, where("courseId", "==", module))
            );
            if (!querySnapshot.empty) {
              const doc = querySnapshot.docs[0];
              const examData = doc?.data();
              const updatedStudentArray = examData.students.filter(
                (student) => {
                  return student.id !== userDataToDelete.id;
                }
              );
              updateDoc(doc.ref, { students: updatedStudentArray });
              console.log("Remove user from exams complete");
            }
          } catch (e) {
            console.log("Error deleting user from exams", module);
          }
        });
      }

      const documentRef = doc(usersRef, userDataToDelete.id);

      deleteDoc(documentRef)
        .then(() => {
          console.log("Document successfully deleted!", userIdToDelete);
          fetchData();
        })
        .catch((error) => {
          console.error("Error deleting document: ", error);
        });

      setUserIdToDelete(null);
    }
  };

  const headers = [
    // {
    //   title: "ID",
    //   width: "10%",
    // },
    {
      title: "Name",
      width: "25%",
    },
    {
      title: "Type",
      width: "10%",
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
      title: "Date Added",
      width: "25%",
    },
  ];

  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    try {
      const productData = await getAllDocuments("users");
      setUserData(productData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onPersonnelDetailsClick = (userId) => {
    navigate(`/admin/personnel/${userId}`);
  };

  const handleMessagePersonnel = (otherPersonId) => {
    console.log("otherPersonId", otherPersonId);
    sendMessage(userId, otherPersonId);
  };

  const sendMessage = async (senderId, recipientId) => {
    const messagesRef = collection(db, "messages");
    const currentDate = new Date();
    const timestamp = Timestamp.fromDate(currentDate);

    try {
      // Use the addDoc method to add a document and obtain the DocumentReference
      const messageDocRef = await addDoc(messagesRef, {
        messageBody: "",
        senderId: recipientId,
        recipientId: senderId,
        dateAdded: timestamp,
      });
      console.log("message sent");
      navigate("/admin/messages");
    } catch (e) {
      console.log("Error sending message: ", e);
    }
  };

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
        <Modal
          handleModalClose={() => {
            setShowDeleteModal(false);
          }}
          modalType=""
          actionButtonText="Delete"
          actionButtonColor={theme.primary}
          actionButtonClick={() => {
            setShowDeleteModal(false);
          }}
          show={showDeleteModal}
          modalTitle="Message Sent"
          modalContent="Please check the messages tab to continue messaging"
        />

        <Navbar linksArray={adminNavbarItems} />

        <AdminPersonnelContainer>
          <AdminPersonnelTitle>Personnel</AdminPersonnelTitle>
          <AdminPersonnelNavbarContainer>
            <FilterBar
              filters={filters}
              handleFilterBarData={handleFilterBarData}
              buttonFilledColor={theme.primary}
            />
            <Button
              filled={true}
              onClick={() => {
                navigate("/admin/personnel/newuser");
              }}
            >
              Add User +
            </Button>
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
                          userData,
                          header.title.toLowerCase()
                        );
                        setUserData([...sortedArray]);
                      }}
                      upArrowFunction={() => {
                        const sortedArray = descendingAlphabeticalSort(
                          userData,
                          header.title.toLowerCase()
                        );

                        setUserData([...sortedArray]);
                      }}
                    />
                  </AdminPersonnelHeader>
                );
              })}
            </AdminPersonnelHeaderContainer>
            {userData ? (
              userData.map((user, index) => {
                return (
                  <AdminPersonnelSummaryContainer
                    key={index}
                    display={
                      filtersSelected.includes("all") ||
                      filtersSelected.includes(user.type)
                    }
                  >
                    {/* <AdminPersonnelSummary>{user.id}</AdminPersonnelSummary> */}
                    <AdminPersonnelSummary width="25%">
                      {user.name}
                    </AdminPersonnelSummary>
                    <AdminPersonnelSummary>
                      {user.type &&
                        user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                    </AdminPersonnelSummary>
                    <AdminPersonnelSummary>
                      {user.course ? user.course : "-"}
                    </AdminPersonnelSummary>
                    <AdminPersonnelSummary>
                      {user.year ? user.year : "-"}
                    </AdminPersonnelSummary>

                    <AdminPersonnelSummary width="25%">
                      {user.dateCreated}
                    </AdminPersonnelSummary>
                    <AdminPersonnelSummaryButtonsContainer>
                      <AdminPersonnelIconContainer
                        onClick={() => {
                          handleMessagePersonnel(user.id);
                        }}
                      >
                        <IoMailOutline size={"2rem"} />
                      </AdminPersonnelIconContainer>

                      <Button
                        filledColor={theme.text}
                        onClick={() => {
                          onPersonnelDetailsClick(user.id);
                        }}
                      >
                        Details
                      </Button>
                      <Button
                        filled={false}
                        defaultColor={theme.statusError}
                        filledColor={theme.statusError}
                        onClick={() => {
                          setUserDataToDelete(user);

                          setShowDeleteModal(true);
                        }}
                      >
                        Delete
                      </Button>
                    </AdminPersonnelSummaryButtonsContainer>
                  </AdminPersonnelSummaryContainer>
                );
              })
            ) : (
              <>Loading User Data...</>
            )}
          </AdminPersonnelTable>
        </AdminPersonnelContainer>
      </AdminPersonnelBigContainer>
    </ThemeProvider>
  );
};

export default AdminPersonnelPage;
