import { FC } from "react";

import { useGetPostsSuspenseQuery } from "../../../graphql-generated";
import Post from "../Feed/Post";
import { UserModel } from "../../models/User";

import avatarPlaceholder from "../../images/avatarPlaceholder.png";

interface Props {
  canEdit: boolean;
  user: UserModel;
}

const MainUserProfile: FC<Props> = ({ canEdit, user }) => {
  const { account, profile } = user;

  const { data } = useGetPostsSuspenseQuery({
    variables: { authorId: account.id, perPage: 40 },
  });

  const totalPosts = data.posts.nodesCount;

  return (
    <div className="mt-5">
      <div className="flex items-center justify-start space-x-16 mb-20">
        <img
          className="rounded-full max-w-none w-32 h-32"
          src={profile.avatar || avatarPlaceholder}
        />
        <div>
          <div className="flex items-center justify-start space-x-4 mb-3">
            <p className="font-bold text-lg">{profile.displayName}</p>
            {canEdit && (
              <a
                href="/profile"
                className="py-1 px-3 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Edit Profile
              </a>
            )}
          </div>
          <div className="flex items-center justify-start space-x-4 mb-3">
            <p>
              <span className="font-bold text-lg">{totalPosts}</span> posts
            </p>
            <p>
              <span className="font-bold text-lg">
                {account.friends.length}
              </span>{" "}
              friends
            </p>
          </div>
          <p className="text-sm">{profile.bio}</p>
        </div>
      </div>

      {data.posts.nodes.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default MainUserProfile;
