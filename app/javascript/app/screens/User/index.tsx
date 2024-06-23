import type { FC } from "react";

import ScreenWrapper from "../ScreenWrapper";

import MainUserProfile from "./MainUserProfile";

import { UserModel } from "../../models/User";
import MainContainer from "../../shared/MainContainer";
import SidebarNavigation from "../../shared/SidebarNavigation";


interface Props {
  canEdit: boolean;
  user: UserModel;
}

const User: FC<Props> = (props) => {
  return (
    <>
      <SidebarNavigation />
      <MainContainer>
        <MainUserProfile {...props} />
      </MainContainer>
    </>
  );
};

export default ScreenWrapper(User);
