import { Suspense, type FC } from "react";

import ApolloWrapper from "../../shared/ApolloWrapper";
import { PostForm } from "./PostForm";
import { Toaster } from "react-hot-toast";
import PostsFeed from "./PostsFeed";
import Loader from "../../shared/Loader";

const Feed: FC = () => {
  return (
    <ApolloWrapper>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="w-3/4 mx-auto">
        <PostForm />
        <Suspense fallback={<Loader />}>
          <PostsFeed />
        </Suspense>
      </div>
    </ApolloWrapper>
  );
};

export default Feed;
