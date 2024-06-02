import { type FC } from "react";

import Avatar from "./Avatar";
import MainProfile from "./MainProfile";
import MainContainer from "../../shared/MainContainer";
import SidebarNavigation from "../../shared/SidebarNavigation";
import ScreenWrapper from "../ScreenWrapper";

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
