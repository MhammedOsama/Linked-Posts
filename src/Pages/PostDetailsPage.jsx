import { useParams } from "react-router-dom";
import { getSinglePostApi } from "../Services/postServices";
import { useCallback, useEffect, useState } from "react";
import PostCard from "../Components/PostCard";
import LoadingScreen from "../Components/LoadingScreen";

function PostDetailsPage() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  const getPost = useCallback(async () => {
    const response = await getSinglePostApi(id);
    if (response.message) {
      setPost(response.post);
    }
  }, [id]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <>
      <div className='w-4/6 mx-auto'>
        {post ? (
          <PostCard post={post} commentLimit={true} callback={getPost} />
        ) : (
          <LoadingScreen />
        )}
      </div>
    </>
  );
}

export default PostDetailsPage;
