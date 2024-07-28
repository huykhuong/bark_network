import { useEffect, useRef, useState, type FC } from "react";

import { PostComment } from "@graphql-generated";
import classNames from "classnames";

import { useClickOutside } from "@hooks/useClickOutside";
import avatarPlaceholder from "@images/avatarPlaceholder.png";

import EditComment from "./EditComment";

interface Props {
  postComment: PostComment;
  postId: number;
  onDeleteComment: (commentId: number) => void;
}

const Comment: FC<Props> = ({ postComment, postId, onDeleteComment }) => {
  const [openActionMenu, setOpenActionMenu] = useState(false);
  const [editing, setEditing] = useState(false);
  const [comment, setComment] = useState(postComment.comment);

  useEffect(() => {
    setComment(postComment.comment);
    setOpenActionMenu(false);
  }, [postComment.comment]);

  const actionMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside(actionMenuRef, () => setOpenActionMenu(false));

  const handleDeleteComment = () => {
    setOpenActionMenu(false);
    onDeleteComment(postComment.id);
  };

  return (
    <article className="flex justify-start items-start text-base rounded-lg dark:bg-gray-900 space-x-4">
      <img
        className="w-8 h-8 rounded-full"
        src={postComment.commenterAvatarUrl || avatarPlaceholder}
        alt={`Avatar of ${postComment.commenterDisplayName}`}
      />

      <div className="grow">
        <footer className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
              {postComment.commenterDisplayName}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {new Date(postComment.createdAt).toLocaleString()}
              {postComment.edited && " · edited"}
            </p>
          </div>
          {postComment.editable && (
            <div className="relative" ref={actionMenuRef}>
              <button
                id="dropdownComment1Button"
                data-dropdown-toggle="dropdownComment1"
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button"
                onClick={() => setOpenActionMenu(!openActionMenu)}
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
              </button>
              <div
                id="dropdownComment1"
                className={classNames(
                  "absolute right-0 top-[100%] z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600",
                  openActionMenu ? "block" : "hidden",
                )}
              >
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownMenuIconHorizontalButton"
                >
                  <li>
                    <button
                      className="w-full text-start py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => {
                        setEditing(true);
                        setOpenActionMenu(false);
                      }}
                    >
                      Edit
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full text-start py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={handleDeleteComment}
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </footer>
        {editing && (
          <EditComment
            postId={postId}
            commentId={postComment.id}
            comment={comment}
            setEditing={setEditing}
            setComment={setComment}
          />
        )}
        {!editing && <p>{comment}</p>}
      </div>
    </article>
  );
};

export default Comment;
