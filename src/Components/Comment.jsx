import { useContext } from "react";
import userImage from "../assets/30-307416_profile-icon-png-image-free-download-searchpng-employee.webp";
import { AuthContext } from "../Context/AuthContext";
import DropDownActions from "./DropDownActions";

function Comment({
  comment,
  postUserId,
  callback,
  setIsUpdateComment,
  isUpdateComment,
}) {
  const { userData } = useContext(AuthContext);

  return (
    <>
      <div className='p-4 bg-gray-100 -mx-3 -mb-3'>
        <div className='w-full   bg-gray-100   items-center flex justify-between '>
          <div className='flex'>
            <img
              onError={(e) => (e.target.src = userImage)}
              className=' rounded-full w-10 h-10 mr-3'
              src={comment.commentCreator.photo}
              alt={comment.commentCreator.name}
            />
            <div>
              <h3 className='text-md font-semibold '>
                {comment.commentCreator.name}
              </h3>
              <p className='text-xs text-gray-500'>
                {comment.createdAt.split(".", 1).join().replace("T", " ")}
              </p>
            </div>
          </div>
          {userData._id == postUserId &&
            userData._id == comment.commentCreator._id && (
              <DropDownActions
                callback={callback}
                commentId={comment._id}
                setIsUpdateComment={setIsUpdateComment}
                isUpdateComment={isUpdateComment}
              />
            )}
        </div>
        <p className='p-4 pb-0'>{comment.content}</p>
      </div>
    </>
  );
}

export default Comment;
