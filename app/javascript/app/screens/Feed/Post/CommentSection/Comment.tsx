import { PostComment } from "@graphql-generated";
import type { FC } from "react";

import avatarPlaceholder from "@images/avatarPlaceholder.png";

interface Props {
  comment: PostComment;
}

const Comment: FC<Props> = ({ comment }) => {
  return (
    <article className="flex justify-start items-start text-base rounded-lg dark:bg-gray-900 space-x-4">
      <img
        className="w-8 h-8 rounded-full"
        src={comment.commenterAvatarUrl || avatarPlaceholder}
        alt={`Avatar of ${comment.commenterDisplayName}`}
      />

      <div className="grow">
        <footer className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
              {comment.commenterDisplayName}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {new Date(comment.createdAt).toLocaleDateString()}
            </p>
          </div>
          <button
            id="dropdownComment1Button"
            data-dropdown-toggle="dropdownComment1"
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
            <span className="sr-only">Comment settings</span>
          </button>

          <div
            id="dropdownComment1"
            className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownMenuIconHorizontalButton"
            >
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Edit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Remove
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Report
                </a>
              </li>
            </ul>
          </div>
        </footer>
        <p className="text-gray-500 dark:text-gray-400">{comment.comment}</p>
      </div>
    </article>
  );
};

export default Comment;
