import { Suspense, useContext, type FC } from "react";

import { PostForm } from "./PostForm";
import PostsFeed from "./PostsFeed";
import Loader from "../../shared/Loader";
import ScreenWrapper from "../ScreenWrapper";
import { UserContext } from "../../contexts/User";
import PeopleColumn from "../../shared/PeopleColumn";
import SidebarNavigation from "../../shared/SidebarNavigation";
import MainContainer from "../../shared/MainContainer";
import Aside from "../../shared/Aside";

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
      {userLoggedIn && (
        <Aside>
          <PeopleColumn />
        </Aside>
      )}
    </>
  );
};

export default ScreenWrapper(Feed);
