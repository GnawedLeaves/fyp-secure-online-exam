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

  return (
    <ThemeProvider theme={theme}>
      <AdminMessagesBigContainer>
        <Modal
          show={showModal}
          handleModalClose={() => {
            setShowModal(false);
          }}
          modalType="empty"
          showCross={true}
        >
          <div style={{ width: "20rem", background: "red", height: "20rem" }}>
            content goes here
          </div>
        </Modal>

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
