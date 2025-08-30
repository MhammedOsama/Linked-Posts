import axios from "axios";

export async function getUserdataApi() {
  try {
    const { data } = await axios.get(
      `https://linked-posts.routemisr.com/users/profile-data`,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function sendRegisterData(userDate) {
  try {
    const response = await axios.post(
      "https://linked-posts.routemisr.com/users/signup",
      userDate
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function sendLoginData(userDate) {
  try {
    const response = await axios.post(
      "https://linked-posts.routemisr.com/users/signin",
      userDate
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
export async function UpdateProfilePhotoApi(formData) {
  try {
    const { data } = await axios.put(
      `https://linked-posts.routemisr.com/users/upload-photo`,
      formData,
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

export async function changePasswordUserApi(oldPassword, newPassword) {
  try {
    const { data } = await axios.patch(
      `https://linked-posts.routemisr.com/users/change-password`,
      {
        password: oldPassword,
        newPassword: newPassword,
      },
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
