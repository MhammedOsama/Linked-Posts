import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import {
  changePasswordUserApi,
  getUserdataApi,
  UpdateProfilePhotoApi,
} from "../Services/authServices";
import { Button, Spinner } from "@heroui/react";
import PostCard from "../Components/PostCard";
import { getUserPostsApi } from "../Services/postServices";
import LoadingScreen from "../Components/LoadingScreen";

function ProfilePage() {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [posts, setPosts] = useState([]);

  const { userData, setUserData } = useContext(AuthContext);

  async function handleUpdateImage(file) {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("photo", file);
      const response = await UpdateProfilePhotoApi(formData);
      if (response.message) {
        const newData = await getUserdataApi();
        setUserData(newData.user);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  function handleImageUrl(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setImageURL(URL.createObjectURL(file));
    e.target.value = "";

    handleUpdateImage(file);
  }

  async function handleChangePassword(e) {
    setLoading(true);
    e.preventDefault();
    const response = await changePasswordUserApi(oldPassword, newPassword);
    if (response.message) {
      localStorage.setItem("token", response.token);
      setIsUpdated(true);
    }
    setLoading(false);
  }

  async function getUserPosts() {
    if (!userData || !userData._id) return;
    try {
      const response = await getUserPostsApi(userData._id);
      if (response?.posts) setPosts(response.posts);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (!userData || !userData._id) return;
    getUserPosts();
  }, [userData]);

  return (
    <>
      <div>
        <link
          rel='stylesheet'
          href='https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css'
        />
        <section className='pt-16 bg-blueGray-50'>
          <div className='w-full lg:w-4/12 px-4 mx-auto'>
            <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16'>
              <div className='px-6'>
                <div className='flex flex-wrap justify-center'>
                  <div className='w-full px-4 flex justify-center'>
                    <div className='relative inline-block'>
                      <label htmlFor='profile-file-input'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                          className='size-6 absolute -bottom-25 -right-15 px z-10 rounded-full bg-blue-500 text-white p-1 shadow cursor-pointer'>
                          <path
                            fillRule='evenodd'
                            d='M12 5.25c1.213 0 2.415.046 3.605.135a3.256 3.256 0 0 1 3.01 3.01c.044.583.077 1.17.1 1.759L17.03 8.47a.75.75 0 1 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 0 0-1.06-1.06l-1.752 1.751c-.023-.65-.06-1.296-.108-1.939a4.756 4.756 0 0 0-4.392-4.392 49.422 49.422 0 0 0-7.436 0A4.756 4.756 0 0 0 3.89 8.282c-.017.224-.033.447-.046.672a.75.75 0 1 0 1.497.092c.013-.217.028-.434.044-.651a3.256 3.256 0 0 1 3.01-3.01c1.19-.09 2.392-.135 3.605-.135Zm-6.97 6.22a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.752-1.751c.023.65.06 1.296.108 1.939a4.756 4.756 0 0 0 4.392 4.392 49.413 49.413 0 0 0 7.436 0 4.756 4.756 0 0 0 4.392-4.392c.017-.223.032-.447.046-.672a.75.75 0 0 0-1.497-.092c-.013.217-.028.434-.044.651a3.256 3.256 0 0 1-3.01 3.01 47.953 47.953 0 0 1-7.21 0 3.256 3.256 0 0 1-3.01-3.01 47.759 47.759 0 0 1-.1-1.759L6.97 15.53a.75.75 0 0 0 1.06-1.06l-3-3Z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </label>

                      <input
                        id='profile-file-input'
                        type='file'
                        accept='image/*'
                        className='hidden'
                        onChange={handleImageUrl}
                      />
                      {loading ? (
                        <Spinner />
                      ) : (
                        <img
                          alt='...'
                          src={userData?.photo}
                          className='shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px'
                        />
                      )}
                    </div>
                  </div>

                  <div className='w-full px-4 text-center mt-20'>
                    <div className='flex justify-center py-4 lg:pt-4 pt-8'>
                      <div className='mr-4 p-3 text-center'>
                        <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
                          22
                        </span>
                        <span className='text-sm text-blueGray-400'>
                          Friends
                        </span>
                      </div>
                      <div className='mr-4 p-3 text-center'>
                        <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
                          10
                        </span>
                        <span className='text-sm text-blueGray-400'>
                          Photos
                        </span>
                      </div>
                      <div className='lg:mr-4 p-3 text-center'>
                        <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
                          89
                        </span>
                        <span className='text-sm text-blueGray-400'>
                          Comments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <form onSubmit={handleChangePassword}>
                  <div className='space-y-6 mb-5'>
                    <div className='relative group'>
                      <input
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        disabled={isUpdated}
                        id='password'
                        name='password'
                        type='password'
                        placeholder=' Old Password'
                        className='
        peer block w-full bg-transparent
        px-0 py-3 text-sm sm:text-base
        border-0 outline-none ring-0
        focus:outline-none focus:ring-0
      '
                        autoComplete='off'
                      />
                      <span className='absolute left-0 bottom-0 h-px w-full bg-gray-300'></span>
                      <span className='absolute left-0 bottom-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 peer-focus:w-full'></span>

                      <label
                        htmlFor='email'
                        className='
        pointer-events-none absolute left-0
        -top-2.5 text-xs text-gray-500
        transition-all duration-200
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
        peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-600
      '></label>
                    </div>

                    <div className='relative group'>
                      <input
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        disabled={isUpdated}
                        id='password2'
                        name='password2'
                        type='password'
                        placeholder='New password '
                        className='
        peer block w-full bg-transparent
        px-0 py-3 text-sm sm:text-base
        border-0 outline-none ring-0
        focus:outline-none focus:ring-0
      '
                        autoComplete='off'
                      />
                      <span className='absolute left-0 bottom-0 h-px w-full bg-gray-300'></span>
                      <span className='absolute left-0 bottom-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 peer-focus:w-full'></span>

                      <label
                        htmlFor='email2'
                        className='
        pointer-events-none absolute left-0
        -top-2.5 text-xs text-gray-500
        transition-all duration-200
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
        peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-600
      '></label>
                    </div>
                  </div>
                  <Button
                    disabled={isUpdated}
                    isLoading={loading}
                    type='submit'
                    color='primary'
                    size='lg'
                    radius='full'
                    fullWidth
                    className='font-semibold '>
                    Change
                  </Button>
                </form>

                <div className='flex flex-col justify-center items-center mt-5'>
                  <div className='relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3'>
                    <div className='grid grid-cols-2 gap-4 px-2 w-full'>
                      <div className='flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl dark:!bg-navy-700 dark:shadow-none'>
                        <p className='text-sm text-gray-600'>Name</p>
                        <p className='text-base font-medium text-navy-700 dark:text-white'>
                          {userData?.name}
                        </p>
                      </div>
                      <div className='flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl dark:!bg-navy-700 dark:shadow-none'>
                        <p className='text-sm text-gray-600'>Email</p>
                        <p className='text-base font-medium text-navy-700 dark:text-white'>
                          {userData?.email}
                        </p>
                      </div>
                      <div className='flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl dark:!bg-navy-700 dark:shadow-none'>
                        <p className='text-sm text-gray-600'>Gender</p>
                        <p className='text-base font-medium text-navy-700 dark:text-white'>
                          {userData?.gender}
                        </p>
                      </div>
                      <div className='flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl dark:!bg-navy-700 dark:shadow-none'>
                        <p className='text-sm text-gray-600'>Date Of Birth</p>
                        <p className='text-base font-medium text-navy-700 dark:text-white'>
                          {userData?.dateOfBirth
                            ?.split(".", 1)
                            .join()
                            .replace("T", " ")
                            .split(" ", 1)}
                        </p>
                      </div>
                      <div className='flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl dark:!bg-navy-700 dark:shadow-none'>
                        <p className='text-sm text-gray-600'>Created At</p>
                        <p className='text-base font-medium text-navy-700 dark:text-white'>
                          {userData?.createdAt
                            ?.split(".", 1)
                            .join()
                            .replace("T", " ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className='w-2xl mx-auto'>
        {posts.length == 0 ? (
          <LoadingScreen />
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              commentLimit={false}
              callback={getUserPostsApi}
            />
          ))
        )}
      </div>
    </>
  );
}

export default ProfilePage;
