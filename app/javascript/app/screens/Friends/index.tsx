import type { FC } from "react";

import ScreenWrapper from "../ScreenWrapper";
import avatarPlaceholder from "../../images/avatarPlaceholder.png";
import { ProfileModel } from "../../models/Profile";
import SidebarNavigation from "../../shared/SidebarNavigation";
import MainContainer from "../../shared/MainContainer";

interface Props {
  friends: ProfileModel[];
}

const Friends: FC<Props> = ({ friends }) => {
  return (
    <>
      <SidebarNavigation />
      <MainContainer>
        <p className="text-lg mb-3">Your Friends:</p>
        <div className="grid grid-cols-2 gap-5">
          {friends.map((friend: ProfileModel) => (
            <div
              key={friend.id}
              className="bg-white p-2 rounded-lg shadow-sm flex items-center justify-start space-x-2"
            >
              <img
                src={friend.avatar || avatarPlaceholder}
                alt={`user_${friend.displayName}`}
                className="relative inline-block h-14 w-14 !rounded-full  object-cover object-center"
              />
              <p>{friend.displayName}</p>
            </div>
          ))}
        </div>
      </MainContainer>
    </>
  );
};

export default ScreenWrapper(Friends);
