import { useEffect, useState } from "react";
import PostCard from "../Components/PostCard";
import { getAllPostsApi } from "../Services/postServices";
import LoadingScreen from "../Components/LoadingScreen";
import { CounterContext } from "../Context/CounterContext";
import CreatePost from "../Components/CreatePost";

function FeedPage() {
  const [posts, setPosts] = useState([]);

  async function getAllPosts() {
    const response = await getAllPostsApi();
    setPosts(response.posts);
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <div className='w-2xl mx-auto'>
        <CreatePost callback={getAllPosts} />
        {posts.length == 0 ? (
          <LoadingScreen />
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              commentLimit={false}
              callback={getAllPosts}
            />
          ))
        )}
      </div>
    </>
  );
}

export default FeedPage;
