import { useState } from "react";
import { createCommentApi } from "../Services/commentServices";
import { Button, Input } from "@heroui/react";

function CommentForm({ comments, setComments, postId }) {
  const [commentContent, setCommentContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function createComment(e) {
    e.preventDefault();
    setIsLoading(true);
    const response = await createCommentApi(commentContent, postId);
    if (response.message) {
      setComments(response.comments);
      // await callback();
      setCommentContent("");
    }
    setIsLoading(false);
  }

  return (
    <>
      <form onSubmit={createComment} className='flex gap-2 my-2'>
        <Input
          onChange={(e) => {
            setCommentContent(e.target.value);
          }}
          value={commentContent}
          variant='bordered'
          placeholder='Comment...'
        />
        <Button
          type='submit'
          isLoading={isLoading}
          disabled={commentContent.length < 2}
          color='primary'>
          Add comment
        </Button>
      </form>
    </>
  );
}

export default CommentForm;
