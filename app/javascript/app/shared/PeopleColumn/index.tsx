import { Suspense, type FC } from "react";

import FriendRequestsReceived from "./FriendRequestsReceived";
import SuggestedFriends from "./SuggestedFriends";
import FriendRequestsSent from "./FriendRequestsSent";

const PeopleColumn: FC = () => {
  return (
    <div className="grid grid-cols-1 gap-y-10">
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
  );
};

export default PeopleColumn;
