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

interface Props {
  post: Post;
  comment: string;
  setComment: (comment: string) => void;
}

const CommentSection: FC<Props> = ({ post, comment, setComment }) => {
  const { account, profile } = useContext(UserContext);

  const [comments, setComments] = useState<PostComment[]>([]);

  const { data, loading } = useGetPostCommentsQuery({
    variables: { postId: post.id },
  });

  useEffect(() => {
    if (data) {
      setComments(data.postComments);
    }
  }, [data]);

  const [createComment] = useCreateCommentMutation({
    onCompleted: (data) => {
      setComment("");
      setComments([
        ...comments,
        {
          ...data.createComment.postComment,
          commenterAvatarUrl: profile.avatar,
          commenterDisplayName: profile.displayName,
        },
      ]);
    },
  });

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

      {loading && <p>Loading comments...</p>}

      {!loading && (
        <div className="grid grid-cols-1 gap-y-4">
          {comments.map((comment, index) => (
            <Comment key={`comment-${index}`} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
