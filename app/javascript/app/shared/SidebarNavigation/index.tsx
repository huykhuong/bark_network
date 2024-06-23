
import { type FC, useContext, useState, useRef } from "react";

import { UserContext } from "@contexts/User";
import { useClickOutside } from "@hooks/useClickOutside";
import avatarPlaceholder from "@images/avatarPlaceholder.png";
import barkLogo from "@images/bark.png";

import NavLink from "./NavLink";
import SearchPanel from "./SearchPanel";


import { getCSRFToken } from "../../utils/getCSRFToken";

const NAV_ELEMENTS = [
  {
    label: "Feeds",
    href: "/",
    icon: (
      <svg
        height={22}
        className="text-gray-900/80 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M168 80c-13.3 0-24 10.7-24 24V408c0 8.4-1.4 16.5-4.1 24H440c13.3 0 24-10.7 24-24V104c0-13.3-10.7-24-24-24H168zM72 480c-39.8 0-72-32.2-72-72V112C0 98.7 10.7 88 24 88s24 10.7 24 24V408c0 13.3 10.7 24 24 24s24-10.7 24-24V104c0-39.8 32.2-72 72-72H440c39.8 0 72 32.2 72 72V408c0 39.8-32.2 72-72 72H72zM176 136c0-13.3 10.7-24 24-24h96c13.3 0 24 10.7 24 24v80c0 13.3-10.7 24-24 24H200c-13.3 0-24-10.7-24-24V136zm200-24h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H376c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 80h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H376c-13.3 0-24-10.7-24-24s10.7-24 24-24zM200 272H408c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 80H408c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
      </svg>
    ),
  },
  {
    label: "Friends",
    href: "/friends",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={19}
        className="text-gray-900/80 fill-current"
        viewBox="0 0 640 512"
      >
        <path
          d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17
        -13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"
        />
      </svg>
    ),
  },
];

const SidebarNavigation: FC = () => {
  const { account, profile, userLoggedIn } = useContext(UserContext);

  const [openSearch, setOpenSearch] = useState(false);

  const handleOpenSearch = () => {
    setOpenSearch(!openSearch);
  };

  const navRef = useRef<HTMLDivElement>(null);

  useClickOutside(navRef, () => setOpenSearch(false));

  return (
    <nav
      ref={navRef}
      className="[grid-area:vertical-navbar] w-52 py-5 px-2 relative"
    >
      <div className="border-r border-slate-200 h-full">
        <ul role="list" className="flex gap-y-3 flex-col h-full">
          <a
            className="flex justify-start items-center space-x-2 mb-5"
            href="/"
          >
            <img src={barkLogo} width={50} />
            <h1 className="text-lg">Bark Network</h1>
          </a>

          {userLoggedIn ? (
            <>
              <li>
                <button
                  className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 group w-full flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6"
                  onClick={handleOpenSearch}
                >
                  <svg
                    height={20}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                  </svg>
                  Search
                </button>
              </li>
              {NAV_ELEMENTS.map((item) => (
                <li key={item.label} className="flex items-center">
                  <NavLink {...item} />
                </li>
              ))}
              <li>
                <form method="post" action="/logout">
                  <input type="hidden" name="_method" value="delete" />
                  <input
                    name="authenticity_token"
                    type="hidden"
                    value={getCSRFToken()}
                  />
                  <button
                    className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 group w-full flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6"
                    type="submit"
                  >
                    <svg
                      height={24}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                    </svg>
                    Logout
                  </button>
                </form>
              </li>
              <li className="grow" />
              <li>
                <a
                  href={`/${account.username}`}
                  className="flex items-center space-x-2"
                >
                  <img
                    className="rounded-full max-w-none w-10 h-10"
                    src={profile.avatar || avatarPlaceholder}
                  />
                  <p>{profile.displayName}</p>
                </a>
              </li>
            </>
          ) : (
            <NavLink
              href="/login"
              label="Login"
              icon={
                <svg
                  height={22}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
                </svg>
              }
            />
          )}
        </ul>
      </div>
      {openSearch && <SearchPanel />}
    </nav>
  );
};

export default SidebarNavigation;
