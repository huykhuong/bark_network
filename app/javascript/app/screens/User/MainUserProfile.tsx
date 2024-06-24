import { FC, useContext } from "react";

import { useGetPostsSuspenseQuery } from "@graphql-generated";

import avatarPlaceholder from "@images/avatarPlaceholder.png";

import InfoSection from "./InfoSection";
import LockedProfileNotice from "./LockedProfileNotice";
import PostLists from "./PostLists";

import { UserContext } from "../../contexts/User";
import { UserModel } from "../../models/User";

interface Props {
  canEdit: boolean;
  user: UserModel;
}

const MainUserProfile: FC<Props> = ({ canEdit, user }) => {
  const { account, profile } = user;

  const { account: currentUserAccount } = useContext(UserContext);

  const { data } = useGetPostsSuspenseQuery({
    variables: { authorId: account.id, perPage: 40 },
  });

  const totalPosts = data.posts.nodesCount;

  const friendWith = currentUserAccount.friendships.some(
    (friend) => friend.friendUsername === account.username,
  );

  const locked = account.locked && currentUserAccount.id !== account.id;

  return (
    <div className="mt-5">
      <div className="flex items-center justify-start space-x-16 mb-20">
        <img
          className="rounded-full max-w-none w-32 h-32"
          src={profile.avatar || avatarPlaceholder}
        />
        <InfoSection
          friends={account.friendships.length}
          canEdit={canEdit}
          friendWith={friendWith}
          profile={profile}
          totalPosts={totalPosts}
        />
      </div>

      {locked ? (
        <LockedProfileNotice />
      ) : (
        <PostLists posts={data.posts.nodes} />
      )}
    </div>
  );
};

export default MainUserProfile;
