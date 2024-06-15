import { FC, PropsWithChildren } from "react";

const MainContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-3/4 mx-auto min-w-[550px] py-5 [grid-area:main] overflow-auto">
      {children}
    </div>
  );
};

export default MainContainer;
