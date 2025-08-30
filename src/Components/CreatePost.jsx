import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
import { createPostApi, updatePostApi } from "../Services/postServices";

function CreatePost({ callback, post, editPost, setEditPost }) {
  const [postBody, setPostBody] = useState(post?.body ?? "");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(post?.image ?? "");
  const [loading, setLoading] = useState(false);

  async function urlToFile() {
    const response = await fetch(post?.image);
    const data = await response.blob();
    const file = new File([data], "image", { type: "image/jpg" });
    setImage(file);
  }

  useEffect(() => {
    urlToFile();
  }, []);

  async function handleCreatePost(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("body", postBody);
    formData.append("image", image);
    let response;
    if (editPost) {
      response = await updatePostApi(formData, post.id);
      setEditPost(false);
    } else {
      response = await createPostApi(formData);
    }
    if (response.message) {
      await callback();
      setPostBody("");
      setImageURL("");
    }
    setLoading(false);
  }

  function handleImageUrl(e) {
    setImage(e.target.files[0]);
    setImageURL(URL.createObjectURL(e.target.files[0]));
    e.target.value = "";
  }

  return (
    <div className='bg-white  rounded-md shadow-md  py-3 px-3 my-5 overflow-hidden'>
      <form onSubmit={handleCreatePost}>
        <textarea
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          placeholder="Create Post, What's On Your Mind..."
          className='border w-full bg-gray-100 p-4 rounded-md resize-none outline-0'
          rows={4}></textarea>
        {imageURL && (
          <div className='relative'>
            <img src={imageURL} alt='' className='w-full' />
            <svg
              onClick={() => setImageURL("")}
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-6 absolute top-4 end-4  cursor-pointer'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
              />
            </svg>
          </div>
        )}
        <div className='flex justify-between items-center mt-4'>
          <label className='cursor-pointer hover:text-blue-500 flex gap-1'>
            <input onChange={handleImageUrl} type='file' className='hidden' />
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
              />
            </svg>

            <span>Image</span>
          </label>
          <div>
            {editPost && (
              <Button onPress={() => setEditPost(false)}>Cancel</Button>
            )}
            <Button
              isLoading={loading}
              type='submit'
              color='primary'
              className='ml-3'>
              Post
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
