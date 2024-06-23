import type { ComponentType, FC } from "react";
import { NULL_USER, UserContext } from "../contexts/User";
import { UserModel } from "../models/User";
import { Toaster } from "react-hot-toast";
import ApolloWrapper from "../shared/ApolloWrapper";
import { Flash as FlashModel } from "../models/Flash";
import Flash from "../shared/Flash";

interface Props<T> {
  flash: FlashModel | undefined;
  props: T;
  user: UserModel | null;
}

const ScreenWrapper = <T extends object>(Component: ComponentType<any>) => {
  const WrappedComponent: FC<Props<T>> = ({ flash, props, user }) => {
    const userContext = {
      ...user,
      userLoggedIn: !!user?.account?.username,
    };

    return (
      <UserContext.Provider value={userContext || NULL_USER}>
        <Toaster toastOptions={{ duration: 4000 }} />
        <ApolloWrapper>
          <Flash flash={flash} />
          <Component {...props} />
        </ApolloWrapper>
      </UserContext.Provider>
    );
  };

  return WrappedComponent;
};

export default ScreenWrapper;
