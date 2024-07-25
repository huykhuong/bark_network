import { useEffect, useState, type FC } from "react";
import { useContext } from "react";

import {
  Post,
  PostComment,
  useCreateCommentMutation,
  useGetPostCommentsQuery,
} from "@graphql-generated";

import { UserContext } from "@contexts/User";
import TextArea from "@shared/TextArea";
import Comment from "./Comment";
import Loader from "@shared/Loader";

interface Props {
  post: Post;
  comment: string;
  setComment: (comment: string) => void;
}

const CommentSection: FC<Props> = ({ post, comment, setComment }) => {
  const { account, profile } = useContext(UserContext);

  const [comments, setComments] = useState<PostComment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);

  const { data, fetchMore } = useGetPostCommentsQuery({
    variables: { postId: post.id, offset },
    onCompleted(data) {
      setComments([...comments, ...data.postComments.comments]);
      setInitialLoading(false);
    },
  });

  const [createComment] = useCreateCommentMutation({
    onCompleted: (data) => {
      setComment("");
      if (data.createComment.errors) {
        setError(data.createComment.errors.join(", "));
        return;
      }
      setComments([
        ...comments,
        {
          ...data.createComment.postComment,
          commenterAvatarUrl: profile.avatar,
          commenterDisplayName: profile.displayName,
        },
      ]);
      setError(null);
    },
  });

  const handleFetchMoreComments = () => {
    setFetchMoreLoading(true);

    fetchMore({ variables: { offset: offset + 3 } })
      .then((res) => {
        if (res.data) {
          setComments([...comments, ...res.data.postComments.comments]);
        }
      })
      .finally(() => {
        setFetchMoreLoading(false);
      });

    setOffset(offset + 3);
  };

  return (
    <div className="p-6">
      <hr />

      <h2 className="text-lg font-bold my-4 text-gray-900 dark:text-white">
        Comments ({comments.length || 0})
      </h2>

      <TextArea
        placeholder="Bark your comment here..."
        name="post-comment"
        label=""
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        className="me-auto rounded-md block mb-10 mt-4 bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() =>
          createComment({
            variables: {
              comment,
              commenterId: account.id,
              postId: post.id,
            },
          })
        }
      >
        Comment
      </button>

      {initialLoading && <p>Loading comments...</p>}

      {!initialLoading && (
        <div className="grid grid-cols-1 gap-y-4">
          {comments.map((comment, index) => (
            <Comment
              key={`comment-${index}`}
              postComment={comment}
              postId={post.id}
            />
          ))}
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
