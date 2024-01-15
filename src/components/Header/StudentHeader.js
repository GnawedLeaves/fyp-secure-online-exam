import React from "react";
import { 
  HeaderContainer,
  ProfileAnchor,
  LogoutAnchor
} from "./HeaderStyles";


const StudentHeader = () => {
  return (
    <HeaderContainer>
      <ProfileAnchor href="###">
          <img title="profile" src="images/profile.svg" alt="profile" width="12px" height="12px" />
          <p>User 1</p>
        
      </ProfileAnchor>
      <LogoutAnchor href="/">Log Out</LogoutAnchor>
    </HeaderContainer>
    
  );
};
export default StudentHeader;
