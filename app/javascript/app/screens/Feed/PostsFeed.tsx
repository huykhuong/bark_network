import type { FC } from "react";

import { useGetPostsSuspenseQuery } from "../../../graphql-generated";
import Post from "./Post";

const PostsFeed: FC = () => {
  const { data } = useGetPostsSuspenseQuery();

  return data.posts.map((post) => <Post key={post.id} post={post} />);
};

export default PostsFeed;
