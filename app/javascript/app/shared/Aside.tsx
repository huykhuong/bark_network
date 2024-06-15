import { FC, PropsWithChildren } from "react";

const Aside: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="[grid-area:aside] h-full w-[250px] bg-white py-5 px-4">
      {children}
    </div>
  );
};

export default Aside;
