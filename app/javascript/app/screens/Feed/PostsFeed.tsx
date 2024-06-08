import type { FC } from "react";

import { useGetPostsSuspenseQuery } from "../../../graphql-generated";
import Post from "./Post";

const PostsFeed: FC = () => {
  const { data } = useGetPostsSuspenseQuery({
    variables: { page: 1, perPage: 5 },
  });

  return data.posts.nodes.map((post) => <Post key={post.id} post={post} />);
};

export default PostsFeed;
