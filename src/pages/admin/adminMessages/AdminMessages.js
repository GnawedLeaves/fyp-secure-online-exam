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

const AdminMessagesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const messageDisplayRef = useRef(null);
  const messageDisplayRef2 = useRef(null);

  const [messageContent, setMessageContent] = useState("");
  const [allMessagesData, setAllMessagesData] = useState([]);
  const userId = "1";
  const otherPersonId = "2";

  const messagesRef = collection(db, "messages");

  const handleInputFocus = () => {
    setInputFocused(true);
    // You can perform any actions you want when the input is focused
  };

  const handleBlur = () => {
    setInputFocused(false);
    // Perform actions when the input loses focus
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputFocused) {
      event.preventDefault();
      sendMessage();
      // Perform actions when Enter key is pressed
    }
  };

  const sendMessage = async (senderId, recipientId) => {
    if (messageContent !== "") {
      const currentDate = new Date();
      const timestamp = Timestamp.fromDate(currentDate);

      try {
        // Use the addDoc method to add a document and obtain the DocumentReference
        const messageDocRef = await addDoc(messagesRef, {
          messageBody: messageContent,
          senderId: senderId,
          recipientId: recipientId,
          dateAdded: timestamp,
        });

        // Access the generated ID from the DocumentReference
        const sentMessageId = messageDocRef.id;
        console.log("Document added with ID:", sentMessageId);

        // try {
        //   const messageRecipientId = uuidv4();

        //   // Use the addDoc method for the second collection
        //   await addDoc(messageRecipientRef, {
        //     messageId: sentMessageId,
        //     recipientId: recipientId,
        //     dateAdded: timestamp,
        //   });

        //   console.log(
        //     "Message Recipient document added with ID:",
        //     messageRecipientId
        //   );
        // } catch (e) {
        //   console.log("Error sending message to message_recipient: ", e);
        // }
        setMessageContent("");
        getAllMessages(userId, otherPersonId);
      } catch (e) {
        console.log("Error sending message: ", e);
      }
    }
  };

  //Get messages from database and display them
  const getRecievedMessages = async (recipientId, senderId) => {
    try {
      // Create a query to get all messages where recipientId matches
      const messagesQuery = query(
        messagesRef,
        where("recipientId", "==", recipientId),
        where("senderId", "==", senderId)
      );

      // Get the documents based on the query
      const querySnapshot = await getDocs(messagesQuery);

      // Extract the data from the documents
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("All messages for recipientId:", recipientId, messages);

      return messages;
    } catch (error) {
      console.error("Error getting messages:", error);
      return [];
    }
  };

  const getSentMessages = async (recipientId, senderId) => {
    try {
      // Create a query to get all messages where recipientId matches
      const messagesQuery = query(
        messagesRef,
        where("recipientId", "==", senderId),
        where("senderId", "==", recipientId)
      );

      // Get the documents based on the query
      const querySnapshot = await getDocs(messagesQuery);

      // Extract the data from the documents
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("All messages for sent:", recipientId, messages);

      return messages;
    } catch (error) {
      console.error("Error getting messages:", error);
      return [];
    }
  };

  const getAllMessages = async (recipientId, senderId) => {
    const recivedMessages = await getRecievedMessages(recipientId, senderId);
    const sentMessages = await getSentMessages(recipientId, senderId);
    const allMessages = [...recivedMessages, ...sentMessages];
    const sortedArray = sortByFirebaseTimestamp(allMessages, "dateAdded");
    setAllMessagesData([...sortedArray]);
  };

  // When the component mounts, set the scrollTop property to the maximum scroll height
  useEffect(() => {
    getAllMessages(userId, otherPersonId);
  }, []);

  useEffect(() => {
    console.log("allMessagesData", allMessagesData);
    scrollToBottom();
  }, [allMessagesData]);

  const scrollToBottom = () => {
    if (messageDisplayRef.current) {
      const scrollContainer = messageDisplayRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
    if (messageDisplayRef2.current) {
      const scrollContainer = messageDisplayRef2.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  };

  const getDateFromFirebaseDate = (date) => {
    return handleFirebaseDate(date).substring(5);
  };

  return (
    <ThemeProvider theme={theme}>
      <AdminMessagesBigContainer>
        <Navbar linksArray={adminNavbarItems} />
        <AdminMessagesContainer>
          Admin Messages Page
          <br />
          <MessageDisplayContainer>
            <AdminMessagingContainer>
              <AdminMessagingDisplayContainer ref={messageDisplayRef}>
                {allMessagesData &&
                  allMessagesData.map((message, index) => {
                    if (message.recipientId === userId) {
                      return (
                        <AdminRecievedMessageContainer key={index}>
                          <AdminAdminRecievedMessageDate>
                            {getDateFromFirebaseDate(message.dateAdded)}
                          </AdminAdminRecievedMessageDate>
                          <AdminRecievedMessage>
                            {message.messageBody}
                          </AdminRecievedMessage>
                        </AdminRecievedMessageContainer>
                      );
                    } else {
                      return (
                        <AdminSentMessageContainer key={index}>
                          <AdminAdminSentMessageDate>
                            {getDateFromFirebaseDate(message.dateAdded)}
                          </AdminAdminSentMessageDate>
                          <AdminSentMessage>
                            {message.messageBody}
                          </AdminSentMessage>
                        </AdminSentMessageContainer>
                      );
                    }
                  })}
              </AdminMessagingDisplayContainer>
              <AdminMessageInputBar>
                <AdminMessageInput
                  value={messageContent}
                  rows="1"
                  onKeyDown={handleKeyDown}
                  type="text"
                  onFocus={handleInputFocus}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setMessageContent(e.target.value);
                  }}
                />
                <AdminMessageArrowContainer
                  onClick={() => {
                    sendMessage(userId, otherPersonId);
                  }}
                >
                  <IoMdSend size="1.5rem" />
                </AdminMessageArrowContainer>
              </AdminMessageInputBar>
            </AdminMessagingContainer>

            <AdminMessagingContainer>
              <AdminMessagingDisplayContainer ref={messageDisplayRef2}>
                {allMessagesData &&
                  allMessagesData.map((message, index) => {
                    if (message.recipientId !== userId) {
                      return (
                        <AdminRecievedMessageContainer key={index}>
                          <AdminAdminRecievedMessageDate>
                            {getDateFromFirebaseDate(message.dateAdded)}
                          </AdminAdminRecievedMessageDate>
                          <AdminRecievedMessage>
                            {message.messageBody}
                          </AdminRecievedMessage>
                        </AdminRecievedMessageContainer>
                      );
                    } else {
                      return (
                        <AdminSentMessageContainer key={index}>
                          <AdminAdminSentMessageDate>
                            {getDateFromFirebaseDate(message.dateAdded)}
                          </AdminAdminSentMessageDate>
                          <AdminSentMessage>
                            {message.messageBody}
                          </AdminSentMessage>
                        </AdminSentMessageContainer>
                      );
                    }
                  })}
              </AdminMessagingDisplayContainer>
              <AdminMessageInputBar>
                <AdminMessageInput
                  value={messageContent}
                  rows="1"
                  onKeyDown={handleKeyDown}
                  type="text"
                  onFocus={handleInputFocus}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setMessageContent(e.target.value);
                  }}
                />
                <AdminMessageArrowContainer
                  onClick={() => {
                    sendMessage(otherPersonId, userId);
                  }}
                >
                  <IoMdSend size="1.5rem" />
                </AdminMessageArrowContainer>
              </AdminMessageInputBar>
            </AdminMessagingContainer>
          </MessageDisplayContainer>
        </AdminMessagesContainer>
      </AdminMessagesBigContainer>
    </ThemeProvider>
  );
};
export default AdminMessagesPage;
