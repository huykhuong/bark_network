import type { FC } from "react";

import { Reaction } from "@graphql-generated";

const PostReactions: FC<{ reactions: Reaction[] }> = ({ reactions }) => {
  const name = reactions.length > 1 ? "reactions" : "reaction";

  return (
    <span className="text-gray-500">
      {reactions.length} {name}
    </span>
  );
};

export default PostReactions;
