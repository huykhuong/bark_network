import { createContext } from "react";

import { Reaction } from "@graphql-generated";

type ReactionContext = {
  reactions: Reaction[];
  currentUserReaction: Reaction | undefined;
  setReactions: (reactions: Reaction[]) => void;
  setCurrentUserReaction: (reaction: Reaction) => void;
};

const REACTION_CONTEXT = {
  reactions: [],
  currentUserReaction: undefined,
  setReactions: () => {},
  setCurrentUserReaction: () => {},
};

export const PostReactionContext =
  createContext<ReactionContext>(REACTION_CONTEXT);
