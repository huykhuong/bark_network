import { Suspense, type FC } from "react";

import MainContainer from "@shared/MainContainer";
import SidebarNavigation from "@shared/SidebarNavigation";

import ScreenWrapper from "../ScreenWrapper";
import { YourFriends } from "./YourFriends";
import FriendRequestsReceived from "./FriendRequestsReceived";
import FriendRequestsSent from "./FriendRequestsSent";
import SuggestedFriends from "./SuggestedFriends";

const Friends: FC = () => {
  return (
    <>
      <SidebarNavigation />
      <MainContainer>
        <div className="grid grid-cols-1 gap-y-10">
          <YourFriends />
          <Suspense fallback="Loading friend requests...">
            <FriendRequestsReceived />
          </Suspense>
          <Suspense fallback="Loading sent friend requests...">
            <FriendRequestsSent />
          </Suspense>
          <Suspense fallback="Loading...">
            <SuggestedFriends />
          </Suspense>
        </div>
      </MainContainer>
    </>
  );
};

export default ScreenWrapper(Friends);
