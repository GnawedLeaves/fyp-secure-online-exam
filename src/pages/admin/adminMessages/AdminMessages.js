import { ThemeProvider } from "styled-components";
import {
  AdminAdminRecievedMessageDate,
  AdminAdminSentMessageDate,
  AdminMessageArrowContainer,
  AdminMessageChatTab,
  AdminMessageChatTabPreview,
  AdminMessageChatTabTitle,
  AdminMessageContainer,
  AdminMessageInput,
  AdminMessageInputBar,
  AdminMessagesBigContainer,
  AdminMessagesChatsContainer,
  AdminMessagesContainer,
  AdminMessagesDisplayBigContainer,
  AdminMessagesMessageContainer,
  AdminMessagesTitle,
  AdminMessagingContainer,
  AdminMessagingDisplayContainer,
  AdminNoChatDisplay,
  AdminNoChatSelectedContainer,
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
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../backend/firebase/firebase";
import { sortByFirebaseTimestamp } from "../../../functions/sortArray";
import { handleFirebaseDate } from "../../../backend/firebase/handleFirebaseDate";
import Chatbox from "../../../components/Chatbox/Chatbox";
import { PageTitle } from "../AdminPagesStyles";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import e from "cors";
import ChatboxBig from "../../../components/Chatbox/ChatboxBig";

const AdminMessagesPage = () => {
  const messagesRef = collection(db, "messages");
  const [userId, setUserId] = useState();
  const [allMessagesData, setAllMessagesData] = useState([])
  const [uniqueSenderIds, setUniqueSenderIds] = useState([])
  const [uniquePreviewChats, setUniquePreviewChats] = useState([])
  const [chatIdSelected, setChatIdSelected] = useState("");
  const [chatNameSelected, setChatNameSelected] = useState("Name Not Available");


  const auth = getAuth()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
        console.log(uid)

      }
    });
  }, []);

  useEffect(() => { getAllMessages() }, [userId])

  useEffect(() => { constructPreviews() }, [uniqueSenderIds])

  //Unqiue senders ids
  useEffect(() => {
    const filteredSenderIDs = allMessagesData
      .filter(message => message.recipientId === userId)
      .map(message => message.senderId);
    const uniqueArray = [...new Set(filteredSenderIDs)];
    setUniqueSenderIds(uniqueArray)
  }, [allMessagesData])

  //function to get all messages with the specific userId
  const constructPreviews = async () => {
    try {
      // Filter messages only once
      const filteredMessages = uniqueSenderIds.map(senderId =>
        allMessagesData.find(message => message.senderId === senderId)
      );

      // Fetch user names for all filtered messages in parallel
      const userNamesPromises = filteredMessages.map(message =>
        getUserNameFromId(message.senderId)
      );
      const userNames = await Promise.all(userNamesPromises);

      // Combine filtered messages with user names
      const filteredMessagesWithName = filteredMessages.map((message, index) => ({
        ...message,
        name: userNames[index] // Use the corresponding user name
      }));

      // Update state with filtered messages including user names
      setUniquePreviewChats(filteredMessagesWithName);
    } catch (error) {
      console.error("Error constructing previews:", error);
    }
  }



  const getAllMessages = async (recipientId, senderId) => {
    const recivedMessages = await getRecievedMessages(userId);
    //const sentMessages = await getSentMessages(recipientId, senderId);
    const allMessages = [...recivedMessages];
    const sortedArray = sortByFirebaseTimestamp(allMessages, "dateAdded").reverse();
    setAllMessagesData([...sortedArray]);
  };


  //Get messages from database and display them
  const getRecievedMessages = async (recipientId) => {
    try {
      // Create a query to get all messages where recipientId matches
      const messagesQuery = query(
        messagesRef,
        where("recipientId", "==", recipientId)
      );

      // Get the documents based on the query
      const querySnapshot = await getDocs(messagesQuery);

      // Extract the data from the documents
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
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

      return messages;
    } catch (error) {
      console.error("Error getting messages:", error);
      return [];
    }
  };

  const constructTruncatedText = (text, maxLength) => {
    const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    return truncatedText;
  }

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setChatIdSelected("")
      console.log("escape pressed")
    }
  };


  const getUserNameFromId = async (id) => {
    const userRef = doc(db, "users", id);

    try {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log(userData.name)
        return userData.name + " (" + userData.type + " ID: " + id + ")"
      }
      else {
        console.log("user does not exist")
        return "Name Not Available (ID: " + id + ")"
      }
    }
    catch (e) {
      console.log("Error getting user data", e)
    }
  }


  return (
    <ThemeProvider theme={theme}>
      <AdminMessagesBigContainer>
        <Navbar linksArray={adminNavbarItems} />
        <AdminMessagesContainer >
          <AdminMessagesTitle>Messages</AdminMessagesTitle>
          <AdminMessagesDisplayBigContainer onKeyDown={handleKeyDown}>
            {uniquePreviewChats?.length !== 0 ? <>
              <AdminMessagesChatsContainer>
                {uniquePreviewChats?.map((message, index) => (
                  <AdminMessageChatTab key={index} selected={chatIdSelected === message.senderId} onClick={() => {
                    setChatIdSelected(message.senderId);
                    setChatNameSelected(message.name)
                  }}>
                    <AdminMessageChatTabTitle>

                      {constructTruncatedText(message.name, 15)}

                    </AdminMessageChatTabTitle>
                    <AdminMessageChatTabPreview>
                      {constructTruncatedText(message.messageBody, 40)}
                    </AdminMessageChatTabPreview>
                  </AdminMessageChatTab>
                ))}
              </AdminMessagesChatsContainer>

              {chatIdSelected !== "" ? <AdminMessagesMessageContainer>
                <ChatboxBig userId={userId} otherPersonId={chatIdSelected} otherPersonName={chatNameSelected} />
              </AdminMessagesMessageContainer> : <AdminNoChatSelectedContainer>Select a chat to start messaging</AdminNoChatSelectedContainer>}</> : <AdminNoChatDisplay >You have no chats</AdminNoChatDisplay>}



          </AdminMessagesDisplayBigContainer>
          <MessageDisplayContainer>
            {/* HvsgLenfY6boyakI2YP3e63NgeC3 */}
            {/* 1 */}
            {/* cKL7rVQnMbvlqeXwys8F */}


          </MessageDisplayContainer>
        </AdminMessagesContainer>
      </AdminMessagesBigContainer>
    </ThemeProvider>
  );
};
export default AdminMessagesPage;
