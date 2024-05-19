import type { FC } from "react";

import Friend from "./Friend";
import { useGetSuggestedFriendsSuspenseQuery } from "../../../../graphql-generated";

const SuggestedFriends: FC = () => {
  const { data } = useGetSuggestedFriendsSuspenseQuery();

  return (
    <div>
      <p className="text-lg mb-3">Suggested friends:</p>
      <p className="text-slate-500 dark:text-slate-300 text-sm">
        {data.suggestedFriends.map((user) => (
          <Friend
            key={user.id}
            avatar={user.profile.avatar}
            id={user.profile.id}
            displayName={user.profile.displayName}
            bio={user.profile.bio}
          />
        ))}
      </p>
    </div>
  );
};

export default SuggestedFriends;
