import type { FC } from "react";

const FriendRequests: FC = () => {
  return (
    <div>
      <p className="text-lg mb-3">Friend requests</p>
      <p className="text-slate-500 dark:text-slate-300 text-sm">
        You currently don't have any friend requests, that's sad.
      </p>
    </div>
  );
};

export default FriendRequests;
