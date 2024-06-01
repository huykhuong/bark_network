import type { FC } from "react";

import FriendCard from "./FriendCard";
import {
  useCreateFriendRequestMutation,
  useGetSuggestedFriendsSuspenseQuery,
} from "../../../graphql-generated";
import toast from "react-hot-toast";

const SuggestedFriends: FC = () => {
  const { data } = useGetSuggestedFriendsSuspenseQuery();

  const [createFriendRequest] = useCreateFriendRequestMutation();

  const handleClick =
    (displayName: string, id: number) =>
    (e: React.MouseEvent): Promise<boolean> => {
      e.preventDefault();

      return toast.promise(
        createFriendRequest({
          variables: { receiverId: id },
        }).then((res) => {
          if (res.data.createFriendRequest.errors) {
            throw new Error(res.data.createFriendRequest.errors);
          }

          return true;
        }),
        {
          loading: "Sending...",
          success: `A friend request has been sucessfully sent to ${displayName}.`,
          error: (err) => err.message,
        }
      );
    };

  return (
    <div>
      <p className="text-lg mb-3">Suggested friends:</p>

      <div className="grid grid-col-1 gap-y-4">
        {data.suggestedFriends.map((user) => (
          <FriendCard
            key={user.id}
            avatar={user.profile.avatar}
            id={user.profile.id}
            displayName={user.profile.displayName}
            bio={user.profile.bio}
            mode="suggested"
            onClick={handleClick(user.profile.displayName, user.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestedFriends;
