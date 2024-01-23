import { ThemeProvider } from "styled-components";
import { theme } from "../../../theme";
import {
  AdminPersonnelBigContainer,
  AdminPersonnelContainer,
  AdminPersonnelFiltersContainer,
  AdminPersonnelFiltersTitle,
  AdminPersonnelNavbarContainer,
} from "./AdminPersonnelStyles";
import Navbar from "../../../components/Navbar/Navbar";
import { adminNavbarItems } from "../AdminHomePage";
import Button from "../../../components/Button/Button";
import React, { useState } from "react";
import { useEffect } from "react";
import FilterBar from "../../../components/FilterBar/FilterBar";

const AdminPersonnelPage = () => {
  const filters = ["Teacher", "Student", "Admin", "Others"];
  const [filtersSelected, setFiltersSelected] = useState(["All"]);

  const handleFilterBarData = (data) => {
    setFiltersSelected(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <AdminPersonnelBigContainer>
        <Navbar linksArray={adminNavbarItems} />
        <AdminPersonnelContainer>
          <AdminPersonnelNavbarContainer>
            <FilterBar
              filters={filters}
              handleFilterBarData={handleFilterBarData}
              buttonFilledColor={theme.primary}
            />
            <Button>Add New +</Button>
          </AdminPersonnelNavbarContainer>
          {filtersSelected}
        </AdminPersonnelContainer>
      </AdminPersonnelBigContainer>
    </ThemeProvider>
  );
};

export default AdminPersonnelPage;
