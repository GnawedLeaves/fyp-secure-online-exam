import { ThemeProvider } from "styled-components";
import {
  AdminMessagesBigContainer,
  AdminMessagesContainer,
} from "./AdminMessagesStyles";
import { theme } from "../../../theme";
import Navbar from "../../../components/Navbar/Navbar";
import { adminNavbarItems } from "../AdminHomePage";
import Modal from "../../../components/Modal/Modal";
import { useState } from "react";
import { useEffect } from "react";

const AdminMessagesPage = () => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    console.log("showModal in parent", showModal);
  }, [showModal]);
  return (
    <ThemeProvider theme={theme}>
      <AdminMessagesBigContainer>
        <Modal
          handleModalClose={() => {
            setShowModal(false);
          }}
          show={showModal}
          modalTitle="Delete User"
          modalContent="Are you sure you want to delete this user? This action cannot be undone."
        />

        <Navbar linksArray={adminNavbarItems} />
        <AdminMessagesContainer>
          Admin Messages Page
          <button
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            Show Modal
          </button>
          {showModal} yuh
        </AdminMessagesContainer>
      </AdminMessagesBigContainer>
    </ThemeProvider>
  );
};
export default AdminMessagesPage;
