import styled from "styled-components";

export const FooterParagraph = styled.div`
  position:absolute;
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme.primary};
  text-align: center;
  padding: 1px;
  display: block;
  width: 100%;
  bottom:0;
  right:0;
`;
