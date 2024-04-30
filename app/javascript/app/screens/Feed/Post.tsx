import type { FC } from "react";
import { Post as PostModel } from "../../../graphql-generated";
import ReactTimeAgo from "react-time-ago";

interface Props {
  post: PostModel;
}

const Post: FC<Props> = ({ post }) => {
  return (
    <article className="mb-4 break-inside rounded-xl bg-white dark:bg-slate-800 flex flex-col bg-clip-border">
      <div className="flex p-6 items-center justify-between">
        <div className="flex">
          <a className="inline-block mr-4" href="#">
            <img
              className="rounded-full max-w-none w-14 h-14"
              src="https://randomuser.me/api/portraits/women/67.jpg"
            />
          </a>
          <div className="flex flex-col">
            <div className="flex items-center">
              <a className="inline-block text-lg font-bold mr-2" href="#">
                {post.authorName}
              </a>
            </div>
            <span className="text-slate-500 dark:text-slate-300 text-sm">
              <ReactTimeAgo date={new Date(post.createdAt)} />
            </span>
          </div>
        </div>
      </div>
      {post.title && (
        <h2 className="text-2xl font-bold px-6 mb-6">{post.title}</h2>
      )}
      <p className="pr-6 pl-6 pb-6">{post.content}</p>
    </article>
  );
};

export default Post;
