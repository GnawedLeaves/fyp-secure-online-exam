import { ThemeProvider } from "styled-components";
import { 
    ButtonInput,
    PageInput,
    PageLabel,
    PageEnterSpace 
} from "./RadioButtonGroupStyles";
import { theme } from "../../../theme";

const RadioButton = ({ options, index }) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        {options.map((option, optionIndex) => (
          <ButtonInput key={optionIndex}>
            <PageInput type="radio" name={`Answer.${index}`} value={option} />
            <PageLabel>{option}</PageLabel>
            <PageEnterSpace />
          </ButtonInput>
        ))}
      </>
    </ThemeProvider>
  );
};

export default RadioButton;
