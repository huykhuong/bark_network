import { Suspense, useContext, type FC } from "react";

import Loader from "@shared/Loader";
import MainContainer from "@shared/MainContainer";
import SidebarNavigation from "@shared/SidebarNavigation";

import ScreenWrapper from "../ScreenWrapper";

import { PostForm } from "./PostForm";
import PostsFeed from "./PostsFeed";

import { UserContext } from "../../contexts/User";

interface Props {
  quote: { id: number; author: string; quote: string };
}

const Feed: FC<Props> = ({ quote }) => {
  const { userLoggedIn } = useContext(UserContext);

  return (
    <>
      <SidebarNavigation />
      <MainContainer>
        <p className="mb-3">
          Good Quote: {quote.quote} - by {quote.author}
        </p>
        {userLoggedIn && <PostForm />}
        <Suspense fallback={<Loader />}>
          {userLoggedIn ? (
            <PostsFeed />
          ) : (
            <p>Please log in to see posts and join barking.</p>
          )}
        </Suspense>
      </MainContainer>
    </>
  );
};

export default ScreenWrapper(Feed);
