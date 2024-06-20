import type { FC } from "react";

import { useGetUsersSuspenseQuery } from "../../../graphql-generated";

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
          className="hover:bg-slate-100 p-1 rounded-md"
          href={`/${u.username}`}
        >
          {u.username}
        </a>
      ))}
    </div>
  );
};

export default SearchResultsList;
