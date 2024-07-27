import { FC, useState } from "react";

import { useCreateCommentMutation } from "@graphql-generated";

import TextArea from "@shared/TextArea";

const COMMON_CLASSES =
  "rounded-md block mb-10 mt-4 bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";

const EditComment: FC<{
  comment: string;
  commentId: number;
  postId: number;
  setEditing: (value: boolean) => void;
  setComment: (value: string) => void;
}> = ({ comment, commentId, postId, setEditing, setComment }) => {
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState(comment);

  const [createComment, { loading }] = useCreateCommentMutation({
    onCompleted: (data) => {
      if (data.createComment.errors && data.createComment.errors.length > 0) {
        setError(data.createComment.errors.join(", "));
      } else {
        setEditing(false);
        setError(null);
        setComment(data.createComment.postComment.comment);
      }
    },
  });

  return (
    <>
      <TextArea
        placeholder="Bark your comment here..."
        name="post-comment"
        label=""
        disabled={loading}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex items-center justify-start space-x-2">
        <button
          className={COMMON_CLASSES}
          disabled={loading}
          onClick={() =>
            createComment({
              variables: {
                comment: newComment,
                postId,
                commentId: commentId,
              },
            })
          }
        >
          Edit Comment
        </button>
        <button
          className={COMMON_CLASSES}
          disabled={loading}
          onClick={() => setEditing(false)}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default EditComment;
