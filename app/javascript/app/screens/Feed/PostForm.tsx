import { FC, useRef } from "react";

import { useCreatePostMutation } from "../../../graphql-generated";
import { toast } from "react-hot-toast";
import classNames from "classnames";

export const PostForm: FC = () => {
  const [createPost, { data }] = useCreatePostMutation();

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    const data = Object.fromEntries(formData.entries());

    toast.promise(
      createPost({
        variables: {
          title: (data.title || "") as string,
          content: (data.content || "") as string,
        },
      }).then((res) => {
        if (Object.keys(res.data.createPost.errors).length !== 0) {
          throw new Error();
        }

        formRef.current.reset();
      }),
      {
        loading: "Posting...",
        success: "New post created successfully.",
        error: "An error occurred while creating your post.",
      }
    );
  };

  return (
    <form ref={formRef} className="w-3/4 mx-auto">
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <input
            id="title"
            name="title"
            className="w-full px-0 text-lg mb-1 text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 outline-none"
            placeholder="Title"
          />

          <textarea
            id="content"
            name="content"
            rows={4}
            className={classNames(
              "w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400",
              { "placeholder-red-500": data?.createPost.errors.content }
            )}
            placeholder={
              data
                ? data?.createPost.errors.content
                : "Hey! Let's bark out what is on your mind...."
            }
          />
        </div>
        <div className="w-full px-3 py-2 border-t dark:border-gray-600">
          <button
            className="ms-auto flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
};
