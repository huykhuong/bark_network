import { FC, PropsWithChildren } from "react";

const MainContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-w-[550px] p-5 [grid-area:main] overflow-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {children}
    </div>
  );
};

export default MainContainer;
