import { useState, type FC } from "react";

import { useGetPostsSuspenseQuery } from "../../../graphql-generated";
import Post from "./Post";
import ReactPaginate from "react-paginate";

const PostsFeed: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGetPostsSuspenseQuery({
    variables: { page: currentPage },
  });

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <>
      {data.posts.nodes.map((post) => (
        <Post key={post.id} post={post} />
      ))}

      <ReactPaginate
        activeClassName="bg-slate-300 p-1 px-2 rounded-sm"
        className="flex justify-center items-center space-x-5"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1} // Show only 3 page numbers
        marginPagesDisplayed={1}
        pageCount={data.posts.pagesCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default PostsFeed;
