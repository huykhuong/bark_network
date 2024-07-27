import { useState, type FC } from "react";

import {
  Post,
  PostComment,
  useCreateCommentMutation,
  useGetPostCommentsQuery,
} from "@graphql-generated";

import Loader from "@shared/Loader";
import TextArea from "@shared/TextArea";

import Comment from "./Comment";

interface Props {
  post: Post;
}

const CommentSection: FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(comments.length);
  const [initialLoading, setInitialLoading] = useState(true);
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);

  const { data, fetchMore } = useGetPostCommentsQuery({
    variables: { postId: post.id, offset },
    onCompleted(data) {
      setComments([...data.postComments.comments]);
      setInitialLoading(false);
    },
  });

  const [createComment] = useCreateCommentMutation();

  const handleCreateComment = () => {
    createComment({
      variables: {
        comment: newComment,
        postId: post.id,
        commentId: null,
      },
    }).then((res) => {
      if (res.data) {
        setNewComment("");

        if (res.data.createComment.errors.length > 0) {
          setError(res.data.createComment.errors.join(", "));
        } else {
          setComments([
            res.data.createComment.postComment,
            ...comments.slice(0, 4),
          ]);
          setError(null);
        }
      }
    });
  };

  const handleFetchMoreComments = () => {
    setFetchMoreLoading(true);

    fetchMore({ variables: { offset: offset + 5 } })
      .then((res) => {
        if (res.data) {
          setComments([...comments, ...res.data.postComments.comments]);
        }
      })
      .finally(() => {
        setFetchMoreLoading(false);
      });

    setOffset(offset + 5);
  };

  return (
    <div className="p-6">
      <hr />

      <h2 className="text-lg font-bold my-4 text-gray-900 dark:text-white">
        Comments ({data?.postComments.totalCount || 0})
      </h2>

      <TextArea
        placeholder="Bark your comment here..."
        name="post-comment"
        label=""
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        className="me-auto rounded-md block mb-10 mt-4 bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={handleCreateComment}
      >
        Comment
      </button>

      {initialLoading && <p>Loading comments...</p>}

      {!initialLoading && (
        <div>
          <div className="grid grid-cols-1 gap-y-4 max-h-80 overflow-y-auto mb-8">
            {comments.map((comment, index) => (
              <Comment
                key={`comment-${index}`}
                postComment={comment}
                postId={post.id}
              />
            ))}
          </div>
          {fetchMoreLoading && <Loader />}
          {!fetchMoreLoading && data?.postComments.hasMoreComments && (
            <>
              <button className="w-fit" onClick={handleFetchMoreComments}>
                Load More
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
