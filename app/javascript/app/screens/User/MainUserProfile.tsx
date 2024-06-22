import { FC, useContext } from "react";

import { useGetPostsSuspenseQuery } from "../../../graphql-generated";
import Post from "../Feed/Post";
import { UserModel } from "../../models/User";

import avatarPlaceholder from "../../images/avatarPlaceholder.png";
import InfoSection from "./InfoSection";
import { UserContext } from "../../contexts/User";

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
    (friend) => friend.friendUsername === account.username
  );

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

      {data.posts.nodes.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default MainUserProfile;
