import styled from "styled-components";

export const LoginPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const LoginPageLogoContainer = styled.div`
  margin: 5rem 0;
`;
export const LoginPageLogo = styled.img``;
export const LoginPageTitle = styled.div`
  font-size: 6rem;
  font-weight: 700;
  letter-spacing: 0.2rem;
  color: ${(props) => props.theme.primary};
`;

export const LoginPageFormContainer = styled.div`
  margin: 5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  position: relative;
`;
export const LoginUsernameInput = styled.input`
  width: 20rem;
  padding: 1rem 1rem;
  border-radius: 15rem;
  border: 1px solid ${(props) => props.theme.text};
  font-size: 1rem;
`;

export const PasswordInputContainer = styled.div``;
export const LoginPasswordInput = styled(LoginUsernameInput)``;
export const DomainSelect = styled.select`
  width: 10rem;
  padding: 0.5rem 0.5rem;
`;

export const ForgotPassword = styled.div`
  font-size: 0.8rem;
  text-align: right;
  width: 100%;
  column-gap: 0;
  row-gap: 0;
  margin-top: 0.5rem;
  width: 95%;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
export const DomainOption = styled.option``;
export const LoginButton = styled.button`
  margin: 2rem 0;
  padding: 0.5rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 15rem;
  border: 1px solid ${(props) => props.theme.primary};
  color: ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.background};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.background};
  }
`;
