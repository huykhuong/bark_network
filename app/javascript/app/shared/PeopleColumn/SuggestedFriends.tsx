import type { FC } from "react";

import { useGetProfilesSuspenseQuery } from "../../../graphql-generated";
import avatarPlaceholder from "../../images/avatarPlaceholder.png";

const SuggestedFriends: FC = () => {
  const { data } = useGetProfilesSuspenseQuery();

  return (
    <div>
      <p className="text-lg mb-3">Suggested friends:</p>
      <p className="text-slate-500 dark:text-slate-300 text-sm">
        {data.profiles.map((profile) => (
          <div
            key={profile.id}
            className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-transparent bg-clip-border border border-slate-200/80 p-2"
          >
            <div className="relative flex items-center gap-4 pt-0 pb-8 mx-0 overflow-hidden bg-transparent shadow-none rounded-xl bg-clip-border">
              <img
                src={profile.avatar || avatarPlaceholder}
                alt="Tania Andrew"
                className="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center"
              />
              <div className="flex w-full flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-slate-800">
                    {profile.displayName}
                  </h5>
                </div>
                <p className="text-slate-500 dark:text-slate-300 text-sm">
                  {profile.bio}
                </p>
              </div>
            </div>
            <button className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Add friend
            </button>
          </div>
        ))}
      </p>
    </div>
  );
};

export default SuggestedFriends;
