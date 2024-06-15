import { useContext, useRef, useState, type FC } from "react";

import {
  Post as PostModel,
  useUpdatePostMutation,
} from "../../../graphql-generated";
import ReactTimeAgo from "react-time-ago";
import classNames from "classnames";
import toast from "react-hot-toast";
import avatarPlaceholder from "../../images/avatarPlaceholder.png";
import { UserContext } from "../../contexts/User";

interface Props {
  post: PostModel;
}

const Post: FC<Props> = ({ post: initialPost }) => {
  const { account } = useContext(UserContext);

  const isAuthor = initialPost.authorUsername === account?.username || false;

  const [edit, setEdit] = useState(false);
  const [post, setPost] = useState(initialPost);

  const [updatePost] = useUpdatePostMutation();

  const formRef = useRef<HTMLFormElement>(null);

  const handleToggleEdit = () => {
    setEdit(!edit);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    const data = Object.fromEntries(formData.entries());

    toast.promise(
      updatePost({
        variables: {
          postId: post.id,
          title: (data.title || "") as string,
          content: (data.content || "") as string,
        },
      }).then((res) => {
        if (Object.keys(res.data.updatePost.errors).length !== 0) {
          throw new Error();
        }

        formRef.current.reset();

        setPost({
          ...post,
          title: res.data.updatePost.post.title,
          content: res.data.updatePost.post.content,
          edited: res.data.updatePost.post.edited,
        });

        setEdit(false);
      }),
      {
        loading: "Updating post...",
        success: "Post updated successfully.",
        error: "An error occurred while updating your post.",
      }
    );
  };

  return (
    <article className="mb-4 break-inside rounded-xl bg-slate-100/40 shadow-sm dark:bg-slate-800 flex flex-col bg-clip-border">
      <div className="flex p-6 items-start justify-between">
        <div className="flex">
          <div className="inline-block mr-4">
            <img
              className="rounded-full max-w-none w-14 h-14"
              src={post.authorProfile.avatar || avatarPlaceholder}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <a className="inline-block text-lg font-bold mr-2" href="#">
                {post.authorProfile.displayName}
              </a>
            </div>
            <span className="flex items-center text-slate-500 dark:text-slate-300 text-sm">
              Posted&nbsp; <ReactTimeAgo date={new Date(post.createdAt)} />
              {post.edited && (
                <div>
                  &nbsp;&middot;&nbsp;
                  <small>Edited</small>
                </div>
              )}
            </span>
          </div>
        </div>

        {isAuthor && !edit && (
          <svg
            height={15}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="cursor-pointer"
            onClick={handleToggleEdit}
          >
            <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
          </svg>
        )}
      </div>
      {edit ? (
        <form ref={formRef}>
          {post.title && (
            <input
              id="title"
              name="title"
              className="text-2xl font-bold px-6 mb-6 block w-full outline-none"
              defaultValue={post.title}
            />
          )}
          <textarea
            id="content"
            name="content"
            rows={4}
            className={classNames(
              "w-full px-6 py-0 resize-none text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            )}
            defaultValue={post.content}
          />
          <div className="flex items-center justify-end space-x-4 w-full px-3 py-2 border-t dark:border-gray-600 bg-gray-50 rounded-b-lg">
            <button
              className="rounded-md bg-white border px-3 py-1.5 text-sm font-semibold leading-6 text-gray-700 shadow-sm hover:bg-gray-50/50"
              onClick={handleToggleEdit}
            >
              Cancel
            </button>
            <button
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div>
          {post.title && (
            <h2 className="text-2xl font-bold px-6 mb-6">{post.title}</h2>
          )}
          <p className="pr-6 pl-6 pb-6">{post.content}</p>
        </div>
      )}
    </article>
  );
};

export default Post;
