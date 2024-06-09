import type { FC } from "react";

import {
  FriendRequest,
  FriendRequestActionEnums,
  GetReceivedFriendRequestsDocument,
  useGetReceivedFriendRequestsSuspenseQuery,
  useHandleFriendRequestMutation,
} from "../../../graphql-generated";
import FriendCard from "./FriendCard";
import toast from "react-hot-toast";

const FriendRequests: FC = () => {
  const { data } = useGetReceivedFriendRequestsSuspenseQuery();

  const [handleFriendRequest] = useHandleFriendRequestMutation({
    update(cache, { data: { handleFriendRequest } }) {
      const existingFriendRequests: {
        receivedFriendRequests: FriendRequest[];
      } = cache.readQuery({
        query: GetReceivedFriendRequestsDocument,
      });

      if (existingFriendRequests && handleFriendRequest.friendRequestId) {
        cache.writeQuery({
          query: GetReceivedFriendRequestsDocument,
          data: {
            receivedFriendRequests:
              existingFriendRequests.receivedFriendRequests.filter(
                (fr) => fr.id !== handleFriendRequest.friendRequestId
              ),
          },
        });
      }
    },
  });

  const handleClick =
    (displayName: string, friendRequestId: number) =>
    (
      e: React.MouseEvent,
      handleMode?: "Accept" | "Decline"
    ): Promise<boolean> => {
      e.preventDefault();

      return toast.promise(
        handleFriendRequest({
          variables: {
            friendRequestId,
            friendRequestAction: FriendRequestActionEnums["Accept"],
          },
        }).then((res) => {
          if (res.data.handleFriendRequest.errors) {
            throw new Error(res.data.handleFriendRequest.errors);
          }

          return true;
        }),
        {
          loading: "Loading...",
          success:
            handleMode === "Decline"
              ? `You have declined a friend request from ${displayName}.`
              : `You have become friend with ${displayName}.`,
          error: (err) => err.message,
        }
      );
    };

  return (
    <div>
      <p className="text-lg mb-3">Friend requests:</p>

      {data.receivedFriendRequests.length > 0 ? (
        <div className="grid grid-col-1 gap-y-4">
          {data.receivedFriendRequests.map((fr) => (
            <FriendCard
              key={fr.id}
              avatar={fr.userProfile.avatar}
              id={fr.id}
              displayName={fr.userProfile.displayName}
              bio={fr.userProfile.bio}
              mode="received"
              onClick={handleClick(fr.userProfile.displayName, fr.id)}
            />
          ))}
        </div>
      ) : (
        "You currently don't have any friend requests, that's sad."
      )}
    </div>
  );
};

export default FriendRequests;
