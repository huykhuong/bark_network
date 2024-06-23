import { type FC } from "react";

import MainContainer from "@shared/MainContainer";
import SidebarNavigation from "@shared/SidebarNavigation";

import ScreenWrapper from "../ScreenWrapper";

import Avatar from "./Avatar";
import MainProfile from "./MainProfile";






const Profile: FC = () => {
  return (
    <>
      <SidebarNavigation />
      <MainContainer>
        <div className="grid grid-cols-1 gap-y-5">
          <Avatar />
          <MainProfile />
        </div>
      </MainContainer>
    </>
  );
};

export default ScreenWrapper(Profile);
