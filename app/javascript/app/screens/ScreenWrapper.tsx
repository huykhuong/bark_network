import type { ComponentType, FC } from "react";
import { NULL_USER, UserContext } from "../contexts/User";
import { UserModel } from "../models/User";
import { Toaster } from "react-hot-toast";

type Context = {
  user: UserModel | null;
};

interface Props<T> {
  props: T;
  context: Context;
}

const ScreenWrapper = <T extends object>(Component: ComponentType<any>) => {
  const WrappedComponent: FC<Props<T>> = ({ props, context }) => {
    return (
      <UserContext.Provider value={context.user || NULL_USER}>
        <Toaster toastOptions={{ duration: 4000 }} />
        <Component {...props} />
      </UserContext.Provider>
    );
  };

  return WrappedComponent;
};

export default ScreenWrapper;
