import type { FC } from "react";

const FriendRequests: FC = () => {
  return (
    <div>
      <p className="text-lg mb-3">Friend requests sent</p>
      <p className="text-slate-500 dark:text-slate-300 text-sm">(None)</p>
    </div>
  );
};

export default FriendRequests;
