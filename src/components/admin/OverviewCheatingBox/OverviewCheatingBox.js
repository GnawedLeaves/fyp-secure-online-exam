import { ThemeProvider } from "styled-components";
import { OverviewCheatingBoxContainer } from "./OverviewCheatingBoxStyles";
import { theme } from "../../../theme";

const OverviewCheatingBox = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <OverviewCheatingBoxContainer>
        Student ID: {props.id}
        <br />
        Issue: {props.issue}
      </OverviewCheatingBoxContainer>
    </ThemeProvider>
  );
};

export default OverviewCheatingBox;
