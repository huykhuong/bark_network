import { FC } from "react";

import barkLogo from "../../images/bark.png";
import NavLink from "./NavLink";

const SidebarNavigation: FC = () => {
  return (
    <div className="h-screen bg-white w-60 py-5 px-2 shadow-lg">
      <div className="flex justify-start items-center space-x-2 mb-10 px-4">
        <img src={barkLogo} width={50} />
        <h1 className="text-lg">Bark Network</h1>
      </div>

      <div className="grid grid-cols-1">
        <NavLink
          href="/"
          label="Feeds"
          icon={
            <svg
              height={22}
              className="text-gray-900/80 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M168 80c-13.3 0-24 10.7-24 24V408c0 8.4-1.4 16.5-4.1 24H440c13.3 0 24-10.7 24-24V104c0-13.3-10.7-24-24-24H168zM72 480c-39.8 0-72-32.2-72-72V112C0 98.7 10.7 88 24 88s24 10.7 24 24V408c0 13.3 10.7 24 24 24s24-10.7 24-24V104c0-39.8 32.2-72 72-72H440c39.8 0 72 32.2 72 72V408c0 39.8-32.2 72-72 72H72zM176 136c0-13.3 10.7-24 24-24h96c13.3 0 24 10.7 24 24v80c0 13.3-10.7 24-24 24H200c-13.3 0-24-10.7-24-24V136zm200-24h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H376c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 80h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H376c-13.3 0-24-10.7-24-24s10.7-24 24-24zM200 272H408c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 80H408c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
            </svg>
          }
        />
        <NavLink
          label="Profile"
          href="/profile"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height={22}
              className="text-gray-900/80 fill-current"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
          }
        />
      </div>
    </div>
  );
};

export default SidebarNavigation;
