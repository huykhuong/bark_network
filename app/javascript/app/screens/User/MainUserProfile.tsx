import { FC } from "react";

import { useGetPostsSuspenseQuery } from "../../../graphql-generated";
import Post from "../Feed/Post";
import { UserModel } from "../../models/User";

import avatarPlaceholder from "../../images/avatarPlaceholder.png";

interface Props {
  canEdit: boolean;
  friendWith: boolean;
  user: UserModel;
}

const MainUserProfile: FC<Props> = ({ canEdit, friendWith, user }) => {
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
            {friendWith && (
              <div className="py-1 px-3 bg-gray-200 rounded-md hover:bg-gray-300 flex items-center space-x-2">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM625 177L497 305c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L591 143c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                </svg>
                <p>Friend</p>
              </div>
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
