import { Suspense, useContext, type FC } from "react";

import ScreenWrapper from "../ScreenWrapper";

import { PostForm } from "./PostForm";
import PostsFeed from "./PostsFeed";

import { UserContext } from "../../contexts/User";
import Aside from "../../shared/Aside";
import Loader from "../../shared/Loader";
import MainContainer from "../../shared/MainContainer";
import PeopleColumn from "../../shared/PeopleColumn";
import SidebarNavigation from "../../shared/SidebarNavigation";



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
