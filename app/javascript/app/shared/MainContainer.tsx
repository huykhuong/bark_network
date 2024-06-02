import { FC, PropsWithChildren } from "react";

const MainContainer: FC<PropsWithChildren> = ({ children }) => {
  return <div className="w-3/4 mx-auto min-w-[550px] main">{children}</div>;
};

export default MainContainer;
