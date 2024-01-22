import { ThemeProvider } from "styled-components";
import { ButtonContainer } from "./ButtonStyles";
import { theme } from "../../theme";
import { useEffect } from "react";

//INSTRUCTIONS FOR USE
// 3 props:
//1. filledColor (String) - The color when the button is filled, text will be white by default
//2. defaultColor (String) - The color when the button is not filled, will colour the border and the text tgt. You cannot have different coloured text and border for this.
//3. filled (String) - "filled" / "not filled" When set to "filled", the button will be by default filled and when hovered it will changed to not filled, and vice versa.
//4. onClick - You need to create a function in the parent element (the level above this)

//See AdminExamDetailsPage line 97 onwards for example

const Button = (props) => {
  const filled = props.filled;

  const filledColor = props.filledColor ? props.filledColor : theme.text;

  useEffect(() => {
    console.log("filled", filled);
  }, [filled]);
  return (
    <ThemeProvider theme={theme}>
      <ButtonContainer
        filledColor={filledColor}
        defaultColor={props.defaultColor}
        filled={filled}
        onClick={props.onClick}
      >
        {props.children}
      </ButtonContainer>
    </ThemeProvider>
  );
};

export default Button;
