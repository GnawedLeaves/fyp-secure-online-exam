import styled from "styled-components";

export const WebCamSection = styled.div`
    width:80%;
`;
export const WebCamVideo = styled.video``;
export const WebCamButton = styled.button`
align-items: center;
gap: 0.5rem;
font-size: 1.1rem;
font-weight: 600;
text-align: center;
width: fit-content;
padding: 0.5rem 1.7rem;
margin:10px;
border: 2px solid
  ${(props) => props.theme.primary};
color:${(props) => props.theme.primary};
border-radius: 50rem;
cursor: pointer;
transition: ${(props) => props.theme.transition};
&:hover {
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.background};
  border-color: ${(props) => props.theme.primary};
}
`;