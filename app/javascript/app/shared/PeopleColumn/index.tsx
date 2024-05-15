import { Suspense, type FC } from "react";

import SuggestedFriends from "./SuggestedFriends";
import FriendRequests from "./FriendRequests";
import ApolloWrapper from "../ApolloWrapper";

const PeopleColumn: FC = () => {
  return (
    <ApolloWrapper>
      <div className="h-screen bg-white w-64 col-span-1 py-5 px-4 sticky top-0">
        <div className="grid grid-cols-1 gap-y-10">
          <FriendRequests />

          <Suspense fallback="Loading...">
            <SuggestedFriends />
          </Suspense>
        </div>
      </div>
    </ApolloWrapper>
  );
};

export default PeopleColumn;
