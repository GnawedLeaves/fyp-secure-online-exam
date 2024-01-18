import { ThemeProvider } from "styled-components";
import {
  AdminMessagesBigContainer,
  AdminMessagesContainer,
} from "./AdminMessagesStyles";
import { theme } from "../../../theme";
import Navbar from "../../../components/Navbar/Navbar";
import { adminNavbarItems } from "../AdminHomePage";

const AdminMessagesPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <AdminMessagesBigContainer>
        <Navbar linksArray={adminNavbarItems} />
        <AdminMessagesContainer>Admin Messages Page</AdminMessagesContainer>
      </AdminMessagesBigContainer>
    </ThemeProvider>
  );
};
export default AdminMessagesPage;
