import type { FC } from "react";

import {
  useCancelFriendRequestMutation,
  useGetSentFriendRequestsSuspenseQuery,
} from "../../../graphql-generated";
import FriendCard from "./FriendCard";
import toast from "react-hot-toast";

const FriendRequests: FC = () => {
  const { data } = useGetSentFriendRequestsSuspenseQuery();

  const [cancelFriendRequest] = useCancelFriendRequestMutation();

  const handleClick =
    (displayName: string, friendRequestId: number) =>
    (e: React.MouseEvent): Promise<boolean> => {
      e.preventDefault();

      return toast.promise(
        cancelFriendRequest({
          variables: { friendRequestId },
        }).then((res) => {
          if (res.data.cancelFriendRequest.errors) {
            throw new Error(res.data.cancelFriendRequest.errors);
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

      <div className="grid grid-col-1 gap-y-4">
        {data.sentFriendRequests.map((fr) => (
          <FriendCard
            key={fr.id}
            avatar={fr.receiverProfile.avatar}
            id={fr.id}
            displayName={fr.receiverProfile.displayName}
            bio={fr.receiverProfile.bio}
            mode="sent"
            onClick={handleClick(fr.receiverProfile.displayName, fr.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FriendRequests;
