import { Suspense, type FC } from "react";

import FriendRequestsReceived from "./FriendRequestsReceived";
import ApolloWrapper from "../ApolloWrapper";
import SuggestedFriends from "./SuggestedFriends";
import FriendRequestsSent from "./FriendRequestsSent";

const PeopleColumn: FC = () => {
  return (
    <ApolloWrapper>
      <div className="aside bg-white py-5 px-4 sticky top-0">
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
      </div>
    </ApolloWrapper>
  );
};

export default PeopleColumn;
