import type { FC } from "react";

import toast from "react-hot-toast";

import FriendCard from "./FriendCard";

import {
  useHandleFriendRequestMutation,
  useGetSentFriendRequestsSuspenseQuery,
  FriendRequestActionEnums,
} from "../../../graphql-generated";


const FriendRequests: FC = () => {
  const { data } = useGetSentFriendRequestsSuspenseQuery();

  const [cancelFriendRequest] = useHandleFriendRequestMutation();

  const handleClick =
    (displayName: string, friendRequestId: number) =>
    (e: React.MouseEvent): Promise<boolean> => {
      e.preventDefault();

      return toast.promise(
        cancelFriendRequest({
          variables: {
            friendRequestId,
            friendRequestAction: FriendRequestActionEnums["Decline"],
          },
        }).then((res) => {
          if (res.data.handleFriendRequest.errors) {
            throw new Error(res.data.handleFriendRequest.errors);
          }

          return true;
        }),
        {
          loading: "Cancelling...",
          success: `The friend request with ${displayName} has been cancelled.`,
          error: (err) => err.message,
        }
      );
    };

  return (
    <div>
      <p className="text-lg mb-3">Friend requests sent:</p>

      {data.sentFriendRequests.length > 0 ? (
        <div className="grid grid-col-1 gap-y-4">
          {data.sentFriendRequests.map((fr) => (
            <FriendCard
              key={fr.id}
              avatar={fr.userProfile.avatar}
              id={fr.id}
              displayName={fr.userProfile.displayName}
              bio={fr.userProfile.bio}
              mode="sent"
              onClick={handleClick(fr.userProfile.displayName, fr.id)}
            />
          ))}
        </div>
      ) : (
        "(None)"
      )}
    </div>
  );
};

export default FriendRequests;
