import { Button, Input } from "@heroui/react";
import Comment from "./Comment";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import { useContext, useState } from "react";
import {
  createCommentApi,
  getPostCommentsApi,
  updateCommentApi,
} from "../Services/commentServices";
import { AuthContext } from "../Context/AuthContext";
import DropDownActions from "./DropDownActions";
import CreatePost from "./CreatePost";
import { getAllPostsApi } from "../Services/postServices";
import CommentForm from "./CommentForm";

function PostCard({ post, commentLimit, callback }) {
  const [comments, setComments] = useState(post.comments);
  const [editPost, setEditPost] = useState(false);
  const [isDeletePost, setIsDeletePost] = useState(true);
  const [isUpdateComment, setIsUpdateComment] = useState(true);

  const { userData } = useContext(AuthContext);

  async function gerPostComments() {
    const response = await getPostCommentsApi(post.id);
    setComments(response.comments);
  }

  return (
    <>
      {editPost && (
        <CreatePost
          callback={callback}
          post={post}
          editPost={editPost}
          setEditPost={setEditPost}
        />
      )}
      <div className='bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5 overflow-hidden'>
        <div className='w-full h-16 items-center flex justify-between '>
          <PostHeader
            photo={post.user.photo}
            name={post.user.name}
            date={post.createdAt}
          />
          {userData._id == post.user._id && (
            <DropDownActions
              isDeletePost={isDeletePost}
              setIsDeletePost={setIsDeletePost}
              post={post}
              callback={callback}
              setEditPost={setEditPost}
            />
          )}
        </div>
        <PostBody body={post.body} image={post.image} />
        <CommentForm
          comments={comments}
          setComments={setComments}
          postId={post.id}
        />

        <PostFooter postId={post.id} commentsNumber={comments.length} />
        {comments.length > 0 &&
          (commentLimit ? (
            comments.map((comment) => (
              <Comment
                callback={gerPostComments}
                postUserId={post.user._id}
                comment={comment}
                key={comment._id}
              />
            ))
          ) : (
            <>
              {isUpdateComment && (
                <CommentForm
                  comments={comments}
                  setComments={setComments}
                  postId={post.id}
                />
              )}
              <Comment
                isUpdateComment={isUpdateComment}
                setIsUpdateComment={setIsUpdateComment}
                callback={gerPostComments}
                postUserId={post.user._id}
                comment={comments[0]}
              />
            </>
          ))}
      </div>
    </>
  );
}

export default PostCard;
