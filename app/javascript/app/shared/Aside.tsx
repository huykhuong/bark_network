import { FC, PropsWithChildren } from "react";

const Aside: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="aside bg-white py-5 px-4 sticky top-0">{children}</div>
  );
};

export default Aside;
