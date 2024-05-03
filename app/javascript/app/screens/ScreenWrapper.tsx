import type { ComponentType, FC } from "react";
import { UserContext } from "../contexts/User";
import { UserModel } from "../models/User";

type Context = {
  user: UserModel;
};

interface Props<T> {
  props: T;
  context: Context;
}

const ScreenWrapper = <T extends object>(Component: ComponentType<any>) => {
  const WrappedComponent: FC<Props<T>> = ({ props, context }) => {
    return (
      <UserContext.Provider value={context.user}>
        <Component {...props} />
      </UserContext.Provider>
    );
  };

  return WrappedComponent;
};

export default ScreenWrapper;
