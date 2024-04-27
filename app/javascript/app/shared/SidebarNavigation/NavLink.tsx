import type { FC } from "react";

interface Props {
  href: string;
  label: string;
  icon: JSX.Element;
}

const NavLink: FC<Props> = ({ href, icon, label }) => {
  return (
    <a
      className="px-4 py-3 hover:bg-gray-100 rounded-md flex items-center justify-start space-x-4"
      href={href}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
};

export default NavLink;
