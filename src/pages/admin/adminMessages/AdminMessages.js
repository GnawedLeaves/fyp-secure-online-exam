import { ThemeProvider } from "styled-components";
import {
  AdminAdminRecievedMessageDate,
  AdminAdminSentMessageDate,
  AdminMessageArrowContainer,
  AdminMessageContainer,
  AdminMessageInput,
  AdminMessageInputBar,
  AdminMessagesBigContainer,
  AdminMessagesContainer,
  AdminMessagingContainer,
  AdminMessagingDisplayContainer,
  AdminRecievedMessage,
  AdminRecievedMessageContainer,
  AdminSentMessage,
  AdminSentMessageContainer,
  MessageDisplayContainer,
} from "./AdminMessagesStyles";
import { theme } from "../../../theme";
import Navbar from "../../../components/Navbar/Navbar";
import { adminNavbarItems } from "../AdminHomePage";
import Modal from "../../../components/Modal/Modal";
import { useState } from "react";
import { useEffect } from "react";
import { IoMdSend } from "react-icons/io";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../backend/firebase/firebase";
import { sortByFirebaseTimestamp } from "../../../functions/sortArray";
import { handleFirebaseDate } from "../../../backend/firebase/handleFirebaseDate";
import Chatbox from "../../../components/Chatbox/Chatbox";

const AdminMessagesPage = () => {
  const messagesRef = collection(db, "messages");

  return (
    <ThemeProvider theme={theme}>
      <AdminMessagesBigContainer>
        <Navbar linksArray={adminNavbarItems} />
        <AdminMessagesContainer>
          Admin Messages Page
          <br />
          <MessageDisplayContainer>
            <Chatbox userId="1" otherPersonId="2" />
            <Chatbox userId="2" otherPersonId="1" />
          </MessageDisplayContainer>
        </AdminMessagesContainer>
      </AdminMessagesBigContainer>
    </ThemeProvider>
  );
};
export default AdminMessagesPage;
