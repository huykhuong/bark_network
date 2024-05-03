import { FC, useContext } from "react";

import barkLogo from "../../images/bark.png";
import NavLink from "./NavLink";
import { getCSRFToken } from "../../utils/getCSRFToken";
import { UserContext } from "../../contexts/User";
import ScreenWrapper from "../../screens/ScreenWrapper";

const SidebarNavigation: FC = () => {
  const { userSignedIn } = useContext(UserContext);

  return (
    <>
      <div className="h-screen bg-white w-60 col-span-1 py-5 px-2 sticky top-0">
        <div className="flex justify-start items-center space-x-2 mb-10 px-4">
          <img src={barkLogo} width={50} />
          <h1 className="text-lg">Bark Network</h1>
        </div>

        <div className="grid grid-cols-1">
          {userSignedIn ? (
            <>
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
              <form method="post" action="/logout">
                <input type="hidden" name="_method" value="delete" />
                <input
                  name="authenticity_token"
                  type="hidden"
                  value={getCSRFToken()}
                />
                <button
                  className="flex items-center justify-start space-x-4 px-4 py-3 hover:bg-gray-100 rounded-md cursor-pointer"
                  type="submit"
                >
                  <svg
                    height={22}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                  </svg>
                  <span>Logout</span>
                </button>
              </form>
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
        </div>
      </div>
    </>
  );
};

export default ScreenWrapper(SidebarNavigation);
