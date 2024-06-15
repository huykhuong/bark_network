import type { FC } from "react";

interface Props {
  href: string;
  label: string;
  icon: JSX.Element;
}

const NavLink: FC<Props> = ({ href, icon, label }) => {
  return (
    <a
      className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 group w-full flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6"
      href={href}
    >
      {icon}
      {label}
    </a>
  );
};

export default NavLink;
