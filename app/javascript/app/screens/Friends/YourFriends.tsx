import { UserContext } from "@contexts/User";
import { useRemoveFriendMutation } from "@graphql-generated";
import { FC, useContext } from "react";
import avatarPlaceholder from "@images/avatarPlaceholder.png";
import toast from "react-hot-toast";

export const YourFriends: FC = () => {
  const { account } = useContext(UserContext);

  const [removeFriend, { error: serverError }] = useRemoveFriendMutation();

  const handleRemoveFriend = (friendRequestId: number, friendName: string) => {
    toast.promise(
      removeFriend({ variables: { friendRequestId } }).then((res) => {
        if (res.data.removeFriend.errors) {
          throw new Error(res.data.removeFriend.errors);
        }
      }),
      {
        loading: "Processing...",
        success: `You are no longer a friend with ${friendName}.`,
        error: (err) =>
          serverError
            ? "Something went wrong. Please try again later."
            : err.message,
      },
    );
  };

  return (
    <div>
      <p className="text-lg mb-3 font-medium">Your Friends:</p>
      <div className="grid grid-cols-2 gap-5">
        {account.friendships.length > 0 ? (
          <>
            {account.friendships.map((friendship) => (
              <div
                key={friendship.id}
                className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 flex justify-between items-center space-x-2 max-w-[400px]"
              >
                <div>
                  <img
                    src={friendship.friendProfile.avatar || avatarPlaceholder}
                    alt={`user_${friendship.friendProfile.displayName}`}
                    className="relative inline-block h-14 w-14 !rounded-full object-cover object-center mr-5"
                  />
                  <p className="inline">
                    {friendship.friendProfile.displayName}
                  </p>
                </div>
                <button
                  className="py-1 px-2 bg-slate-100 hover:bg-slate-200 rounded-md"
                  onClick={() =>
                    handleRemoveFriend(
                      friendship.id,
                      friendship.friendProfile.displayName,
                    )
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </>
        ) : (
          <>You currently don't have any friend requests, that's sad.</>
        )}
      </div>
    </div>
  );
};
