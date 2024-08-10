import { FC, useState } from "react";

import { Reaction, useGetPostReactionsQuery } from "@graphql-generated";

import { PostReactionContext } from "@contexts/PostReaction";

import MainReactionButton from "./MainReactionButton";
import PostReactions from "./PostReactions";

const ReactionSection: FC<{ postId: number }> = ({ postId }) => {
  const [reactions, setReactions] = useState<Reaction[] | undefined>(undefined);
  const [currentUserReaction, setCurrentUserReaction] = useState<
    Reaction | undefined
  >(undefined);

  useGetPostReactionsQuery({
    variables: { postId },
    onCompleted: (data) => {
      setReactions(data.reactions);
      setCurrentUserReaction(
        data.reactions.find((r) => r.isCurrentUserReaction),
      );
    },
  });

  if (!reactions) {
    return null;
  }

  return (
    <PostReactionContext.Provider
      value={{
        reactions,
        currentUserReaction,
        setReactions,
        setCurrentUserReaction,
      }}
    >
      <div className="flex items-center space-x-4 justify-start">
        <MainReactionButton postId={postId} />
        {reactions.length > 0 && <PostReactions reactions={reactions} />}
      </div>
    </PostReactionContext.Provider>
  );
};

export default ReactionSection;
