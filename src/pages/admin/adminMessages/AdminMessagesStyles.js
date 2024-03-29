import styled from "styled-components";

export const AdminMessagesBigContainer = styled.div`
  display: flex;
`;
export const AdminMessagesContainer = styled.div`
  padding: 2rem;
  width:100%;
`;

export const AdminMessagingContainer = styled.div`
  border: 2px solid ${(props) => props.theme.text};

  box-sizing: border-box;
  overflow: hidden;
`;
export const AdminMessagingDisplayContainer = styled.div`
  width: 20rem;
  height: 30rem;
  overflow-y: auto;
  padding: 1rem 0;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

export const AdminMessageRecieveDisplay = styled.div``;
export const AdminRecievedMessageContainer = styled.div`
  width: 100%;
  padding: 0.3rem 1rem;
  box-sizing: border-box;
`;

export const AdminAdminRecievedMessageDate = styled.div`
  font-size: 0.65rem;
  color: ${(props) => props.theme.text};
  padding: 0 0.5rem;
`;
export const AdminRecievedMessage = styled.div`
  max-width: 70%;
  width: fit-content;
  padding: 0.5rem 0.8rem;
  background: ${(props) => props.theme.grey};
  color: ${(props) => props.theme.text};
  border-radius: 1rem;
`;

export const AdminSentMessageContainer = styled(AdminRecievedMessageContainer)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const AdminSentMessage = styled(AdminRecievedMessage)`
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.background};
`;

export const AdminAdminSentMessageDate = styled(
  AdminAdminRecievedMessageDate
)``;

export const AdminMessageInput = styled.textarea`
  outline: none;
  width: 80%;
  border: none;
  padding: 1rem;
  font-size: 1rem;
  font-family: "Inter", sans-serif;
  word-wrap: break-word;
  resize: none;

  &::-webkit-scrollbar {
    width: 0px;
  }

  /* Scrollbar track */
  // &::-webkit-scrollbar-track {
  //   box-shadow: inset 0 0 5px grey;
  //   border-radius: 10px;
  // }

  /* Scrollbar handle */
  // &::-webkit-scrollbar-thumb {
  //   background: red;
  //   border-radius: 10px;
  // }

  // /* Scrollbar handle on hover */
  // &::-webkit-scrollbar-thumb:hover {
  //   background: #b30000;
  // }
`;

export const AdminMessageInputBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-top: 2px solid ${(props) => props.theme.grey};
`;

export const AdminMessageArrowContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    transform: scale(1.3);
  }
`;

export const MessageDisplayContainer = styled.div`
  display: flex;
  gap: 5rem;
  flex-wrap: wrap;
`;


export const AdminMessagesTitle = styled.div`
font-size: 2rem;
font-weight: bold;
margin-bottom: 2rem;

`

export const AdminMessagesDisplayBigContainer = styled.div`
display: flex;
justify-content: center;
height: 85vh;
width: 100%;
border: 2px solid ${(props) => props.theme.grey};

`

export const AdminMessagesChatsContainer = styled.div`
width: 30%;
overflow-y: auto;
height: 100%;
border-right: 2px solid ${(props) => props.theme.grey};
`

export const AdminMessageChatTab = styled.div`
width: 100%;
// height:3.5rem;
box-sizing: border-box;
border-bottom: 2px solid ${(props) => props.theme.grey};
padding: 0.8rem 1rem;
cursor: pointer;
background: ${(props) => props.selected ? props.theme.primary : props.theme.background};
color: ${(props) => props.selected ? props.theme.background : props.theme.text};
box-shadow: ${props => props.theme.boxShadow};
border-radius: 4px;
`

export const AdminMessageChatTabTitle = styled.div`
font-size: 1.4rem;
margin-bottom:0.3rem;
font-weight: bold;
`
export const AdminMessageChatTabPreview = styled.div`
overflow: hidden;
font-size: 1rem;
`

export const AdminMessagesMessageContainer = styled.div`
width: 100%;
`

export const AdminNoChatSelectedContainer = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
`;

export const AdminNoChatDisplay = styled.div`
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
`