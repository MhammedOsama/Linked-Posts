import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@heroui/react";
import { deleteCommentApi } from "../Services/commentServices";
import { useState } from "react";
import { deletePostApi } from "../Services/postServices";

function DropDownActions({
  post,
  commentId,
  callback,
  setEditPost,
  setIsDeletePost,
  isDeletePost,
  isUpdateComment,
  setIsUpdateComment,
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function deleteComment(id) {
    setIsLoading(true);
    const response = await deleteCommentApi(id);
    if (response.message) {
      await callback();
      setIsDeletePost(true);
    }
    setIsLoading(false);
  }

  async function deletePost(id) {
    setIsLoading(true);
    const response = await deletePostApi(id);
    if (response.message) {
      await callback();
      setIsDeletePost(false);
    }
    setIsLoading(false);
  }
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Dropdown>
          <DropdownTrigger>
            <svg
              className='w-16 outline-0 cursor-pointer'
              xmlns='http://www.w3.org/2000/svg'
              width={27}
              height={27}
              viewBox='0 0 24 24'
              fill='none'
              stroke='#b0b0b0'
              strokeWidth={2}
              strokeLinecap='square'
              strokeLinejoin='round'>
              <circle cx={12} cy={12} r={1} />
              <circle cx={19} cy={12} r={1} />
              <circle cx={5} cy={12} r={1} />
            </svg>
          </DropdownTrigger>
          <DropdownMenu aria-label='Static Actions'>
            <DropdownItem
              key='edit'
              onClick={() =>
                !isUpdateComment ? setEditPost(true) : setIsUpdateComment(true)
              }>
              Edit
            </DropdownItem>
            <DropdownItem
              onClick={() =>
                isDeletePost ? deletePost(post.id) : deleteComment(commentId)
              }
              key='delete'
              className='text-danger'
              color='danger'>
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
}

export default DropDownActions;
