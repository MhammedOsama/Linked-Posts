import { createContext, useEffect, useState } from "react";
import { getUserdataApi } from "../Services/authServices";
import { getAllPostsApi, getUserPostsApi } from "../Services/postServices";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") != null
  );
  const [userData, setUserData] = useState(null);

  async function getUserData() {
    const response = await getUserdataApi();
    if (response.message) {
      setUserData(response.user);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
