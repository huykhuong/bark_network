import { FC, PropsWithChildren } from "react";

const MainContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-w-[550px] p-5 h-full [grid-area:main] overflow-y-auto">
      {children}
    </div>
  );
};

export default MainContainer;
