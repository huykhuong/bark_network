import { Suspense, useContext, type FC } from "react";

import Loader from "@shared/Loader";
import MainContainer from "@shared/MainContainer";
import SidebarNavigation from "@shared/SidebarNavigation";

import ScreenWrapper from "../ScreenWrapper";

import { PostForm } from "./PostForm";
import PostsFeed from "./PostsFeed";

import { UserContext } from "../../contexts/User";

const Feed: FC = () => {
  const { userLoggedIn } = useContext(UserContext);

  return (
    <>
      <SidebarNavigation />
      <MainContainer>
        {userLoggedIn && <PostForm />}
        <Suspense fallback={<Loader />}>
          <PostsFeed />
        </Suspense>
      </MainContainer>
    </>
  );
};

export default ScreenWrapper(Feed);
