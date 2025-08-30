import axios from "axios";

export async function getAllPostsApi() {
  try {
    const { data } = await axios.get(
      "https://linked-posts.routemisr.com/posts",
      {
        headers: { token: localStorage.getItem("token") },
        params: {
          limit: 15,
          sort: "-createdAt",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getSinglePostApi(postId) {
  try {
    const { data } = await axios.get(
      `https://linked-posts.routemisr.com/posts/${postId}`,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function createPostApi(formData) {
  try {
    const { data } = await axios.post(
      `https://linked-posts.routemisr.com/posts`,
      formData,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function updatePostApi(formData, postId) {
  try {
    const { data } = await axios.put(
      `https://linked-posts.routemisr.com/posts/${postId}`,
      formData,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserPostsApi(postId) {
  try {
    const { data } = await axios.get(
      `https://linked-posts.routemisr.com/users/${postId}/posts`,
      {
        headers: { token: localStorage.getItem("token") },
        params: { limit: 2 },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function deletePostApi(postId) {
  try {
    const { data } = await axios.delete(
      `https://linked-posts.routemisr.com/posts/${postId}`,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
