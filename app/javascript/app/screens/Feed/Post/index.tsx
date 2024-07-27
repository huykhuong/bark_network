import { useState, type FC } from "react";

import { Post as PostModel } from "@graphql-generated";

import CommentSection from "./CommentSection";
import PostEditForm from "./PostEditForm";
import PostHeader from "./PostHeader";

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
        <>
          {post.title && (
            <h2 className="text-2xl font-bold px-6 mb-6">{post.title}</h2>
          )}
          <p className="pr-6 pl-6 pb-6">{post.content}</p>
          <CommentSection post={post} />
        </>
      )}
    </article>
  );
};

export default Post;
