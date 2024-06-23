import type { FC } from "react";

import { useGetUsersSuspenseQuery } from "@graphql-generated";

import avatarPlaceholder from "@images/avatarPlaceholder.png";

interface Props {
  searchQuery: string;
}

const SearchResultsList: FC<Props> = ({ searchQuery }) => {
  const { data } = useGetUsersSuspenseQuery({
    variables: { searchQuery },
  });

  if (!data.users) return;

  if (data.users.length === 0) {
    return <p>No users found</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-2">
      {data.users.map((u) => (
        <a
          className="hover:bg-slate-100 p-1 rounded-md flex items-center justify-start space-x-2"
          href={`/${u.username}`}
        >
          <img
            className="rounded-full max-w-none w-10 h-10"
            src={u.profile.avatar || avatarPlaceholder}
          />
          <span>{u.username}</span>
        </a>
      ))}
    </div>
  );
};

export default SearchResultsList;
