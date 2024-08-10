import { useContext, type FC } from "react";

import { useAddReactionMutation } from "@graphql-generated";
import classNames from "classnames";

import { PostReactionContext } from "@contexts/PostReaction";
import { UserContext } from "@contexts/User";

import ReactionButton from "./ReactionButton";

interface Props {
  show: boolean;
  postId: number;
  reactions: any;
}

const ReactionsList: FC<Props> = ({ show, postId, reactions }) => {
  const {
    account: { id },
  } = useContext(UserContext);
  const {
    reactions: initialReactions,
    currentUserReaction,
    setReactions,
    setCurrentUserReaction,
  } = useContext(PostReactionContext);

  const [addReaction] = useAddReactionMutation();

  const handleClick = (name: string) => {
    if (currentUserReaction) {
      if (currentUserReaction?.name === name) {
        return;
      }

      addReaction({
        variables: { name, postId, update: true },
      }).then((res) => {
        if (res.data.addReaction.reaction) {
          setCurrentUserReaction(res.data.addReaction.reaction);
        }
      });
    } else {
      addReaction({
        variables: { name, postId, update: false },
      }).then((res) => {
        if (res.data.addReaction.reaction) {
          setReactions([...initialReactions, res.data.addReaction.reaction]);
          setCurrentUserReaction(res.data.addReaction.reaction);
        }
      });
    }
  };

  return (
    <div
      className={classNames(
        "flex items-center space-x-3 absolute top-[-100%] left-0 p-1 bg-white rounded-md z-50 w-max shadow-sm",
        show ? "block" : "hidden",
      )}
    >
      {reactions.map((reaction) => (
        <ReactionButton
          key={reaction.name}
          postId={postId}
          name={reaction.name}
          icon={reaction.icon}
          userId={id}
          decolorized={false}
          onClick={() => handleClick(reaction.name)}
        />
      ))}
    </div>
  );
};

export default ReactionsList;
