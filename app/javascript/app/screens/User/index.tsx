import type { FC } from "react";

import MainContainer from "../../shared/MainContainer";
import SidebarNavigation from "../../shared/SidebarNavigation";
import ScreenWrapper from "../ScreenWrapper";
import MainUserProfile from "./MainUserProfile";
import { UserModel } from "../../models/User";

interface Props {
  canEdit: boolean;
  user: UserModel;
}

const User: FC<Props> = ({ canEdit, user }) => {
  return (
    <>
      <SidebarNavigation />
      <MainContainer>
        <MainUserProfile canEdit={canEdit} user={user} />
      </MainContainer>
    </>
  );
};

export default ScreenWrapper(User);
