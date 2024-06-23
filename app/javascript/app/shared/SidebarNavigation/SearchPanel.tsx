
import { Suspense, useState, type FC } from "react";

import { useDebounce } from "use-debounce";

import SearchResultsList from "./SearchResultsList";


const SearchBox: FC = () => {
  const [value, setValue] = useState<string>("");
  const [debounceValue] = useDebounce(value, 700);

  return (
    <div className="absolute bottom-0 top-0 -right-60 w-60 bg-white py-5 px-2 shadow-sm z-[999]">
      <input
        type="string"
        className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-sm"
        name="user-search-box"
        id="user-search-box"
        placeholder="Search users..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <hr className="my-5" />
      <Suspense fallback="Loading">
        <SearchResultsList searchQuery={debounceValue} />
      </Suspense>
    </div>
  );
};

export default SearchBox;
