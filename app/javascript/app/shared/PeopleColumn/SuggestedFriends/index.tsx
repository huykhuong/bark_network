import type { FC } from "react";

import Friend from "./Friend";
import { useGetSuggestedFriendsSuspenseQuery } from "../../../../graphql-generated";

const SuggestedFriends: FC = () => {
  const { data } = useGetSuggestedFriendsSuspenseQuery();

  return (
    <div>
      <p className="text-lg mb-3">Suggested friends:</p>

      <div className="grid grid-col-1 gap-y-4">
        {data.suggestedFriends.map((user) => (
          <Friend
            key={user.id}
            avatar={user.profile.avatar}
            id={user.profile.id}
            displayName={user.profile.displayName}
            bio={user.profile.bio}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestedFriends;
