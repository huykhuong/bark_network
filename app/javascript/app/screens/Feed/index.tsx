import { Suspense, useContext, type FC } from "react";

import ApolloWrapper from "../../shared/ApolloWrapper";
import { PostForm } from "./PostForm";
import PostsFeed from "./PostsFeed";
import Loader from "../../shared/Loader";
import ScreenWrapper from "../ScreenWrapper";
import { UserContext } from "../../contexts/User";

const Feed: FC = () => {
  const { username } = useContext(UserContext);

  return (
    <ApolloWrapper>
      <div className="w-3/4 mx-auto min-w-[550px]">
        {username && <PostForm />}
        <Suspense fallback={<Loader />}>
          <PostsFeed />
        </Suspense>
      </div>
    </ApolloWrapper>
  );
};

export default ScreenWrapper(Feed);
