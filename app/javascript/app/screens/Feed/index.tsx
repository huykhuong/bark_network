import type { FC } from "react";

import ApolloWrapper from "../../shared/ApolloWrapper";
import { PostForm } from "./PostForm";
import { Toaster } from "react-hot-toast";

const Feed: FC = () => {
  return (
    <ApolloWrapper>
      <Toaster toastOptions={{ duration: 4000 }} />
      <PostForm />
    </ApolloWrapper>
  );
};

export default Feed;
