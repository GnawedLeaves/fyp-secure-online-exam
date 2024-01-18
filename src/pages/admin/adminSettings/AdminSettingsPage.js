import { ThemeProvider } from "styled-components";
import Navbar from "../../../components/Navbar/Navbar";
import { adminNavbarItems } from "../AdminHomePage";
import {
  AdminSettingsBigContainer,
  AdminSettingsContainer,
} from "./AdminSettingsStyles";
import { theme } from "../../../theme";

const AdminSettingsPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <AdminSettingsBigContainer>
        <Navbar linksArray={adminNavbarItems} />
        <AdminSettingsContainer>Admin Settings Page</AdminSettingsContainer>
      </AdminSettingsBigContainer>
    </ThemeProvider>
  );
};

export default AdminSettingsPage;
