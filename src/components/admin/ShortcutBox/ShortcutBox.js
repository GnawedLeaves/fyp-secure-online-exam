import { ThemeProvider } from "styled-components";
import { theme } from "../../../theme";
import { ShortcutBall, ShortcutBoxContainer } from "./ShortcutBoxStyles";

const ShortcutBox = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <ShortcutBoxContainer>
        {props.children}
        <ShortcutBall ballBackground={props.ballBackground} />
      </ShortcutBoxContainer>
    </ThemeProvider>
  );
};

export default ShortcutBox;
