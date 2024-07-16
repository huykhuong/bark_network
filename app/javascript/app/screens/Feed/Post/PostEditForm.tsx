import React, { FC, useRef } from "react";

import { Post, useUpdatePostMutation } from "@graphql-generated";
import classNames from "classnames";
import toast from "react-hot-toast";

interface Props {
  post: Post;
  setPost: (post: Post) => void;
  setEdit: (edit: boolean) => void;
  handleToggleEdit: () => void;
}

const PostEditForm: FC<Props> = ({
  post,
  setPost,
  setEdit,
  handleToggleEdit,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [updatePost] = useUpdatePostMutation();

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
      },
    );
  };

  return (
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
          "w-full px-6 py-0 resize-none text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400",
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
  );
};

export default PostEditForm;
