import type { FC } from "react";

import { useGetSentFriendRequestsSuspenseQuery } from "../../../graphql-generated";
import FriendCard from "./FriendCard";

const FriendRequests: FC = () => {
  const { data } = useGetSentFriendRequestsSuspenseQuery();

  // const handleClick =
  //   (displayName: string, id: number) =>
  //   (e: React.MouseEvent): Promise<boolean> => {
  //     e.preventDefault();

  //     return toast.promise(
  //       createFriendRequest({
  //         variables: { receiverProfileId: id },
  //       }).then((res) => {
  //         if (res.data.createFriendRequest.errors) {
  //           throw new Error(res.data.createFriendRequest.errors);
  //         }

  //         return true;
  //       }),
  //       {
  //         loading: "Sending...",
  //         success: `A friend request has been sucessfully sent to ${displayName}.`,
  //         error: (err) => err.message,
  //       }
  //     );
  //   };

  return (
    <div>
      <p className="text-lg mb-3">Friend requests sent:</p>

      <div className="grid grid-col-1 gap-y-4">
        {data.sentFriendRequests.map((user) => (
          <FriendCard
            key={user.id}
            avatar={user.profile.avatar}
            id={user.profile.id}
            displayName={user.profile.displayName}
            bio={user.profile.bio}
            onClick={() => Promise.resolve(true)}
            mode="sent"
            // onClick={handleClick(user.profile.displayName, user.profile.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FriendRequests;
