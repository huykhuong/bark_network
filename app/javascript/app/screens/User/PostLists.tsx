import { FC } from "react";

import { Post as PostModel } from "@graphql-generated";

import Post from "../Feed/Post";

interface Props {
  posts: PostModel[];
}

const PostLists: FC<Props> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostLists;
