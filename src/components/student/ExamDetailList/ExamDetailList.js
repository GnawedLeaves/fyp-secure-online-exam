import { ThemeProvider } from "styled-components";
import { PageOrderList } from "./ExamDetailListStyles";
import { theme } from "../../../theme";

const ExamDetailList = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <PageOrderList>
      Section {props.section}: {props.sectionDesc} --- {props.weight}
      </PageOrderList>
    </ThemeProvider>
  );
};

export default ExamDetailList;
