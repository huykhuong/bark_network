import { useState, type FC } from "react";

import { Post as PostModel } from "@graphql-generated";

import CommentSection from "./CommentSection";
import PostEditForm from "./PostEditForm";
import PostHeader from "./PostHeader";
import ReactionSection from "./ReactionSection";

interface Props {
  post: PostModel;
}

const Post: FC<Props> = ({ post: initialPost }) => {
  const [edit, setEdit] = useState(false);
  const [post, setPost] = useState(initialPost);

  const handleToggleEdit = () => {
    setEdit(!edit);
  };

  return (
    <article className="mb-4 break-inside rounded-xl bg-slate-100/40 shadow-sm dark:bg-slate-800 flex flex-col bg-clip-border">
      <PostHeader post={post} edit={edit} handleToggleEdit={handleToggleEdit} />

      {edit ? (
        <PostEditForm
          post={post}
          setPost={setPost}
          setEdit={setEdit}
          handleToggleEdit={handleToggleEdit}
        />
      ) : (
        <div className="px-6">
          {post.title && (
            <h2 className="text-2xl font-bold mb-6">{post.title}</h2>
          )}
          <p className="pb-6">{post.content}</p>
          <ReactionSection postId={post.id} />
          <hr />
          <CommentSection post={post} />
        </div>
      )}
    </article>
  );
};

export default Post;
