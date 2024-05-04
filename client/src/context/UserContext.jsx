import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {

  const [userData, setUserData] = useState({
    token: localStorage.getItem("token"),
    userRole: localStorage.getItem("role")
  });

  useEffect(() => {
    const fetchUser = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userData.token,
        },
      };

      const response = await fetch("/user/me", requestOptions)
  
      if (!response.ok) {
        setUserData({ token: null, userRole: null });
      }
      localStorage.setItem("token", userData.token);
      localStorage.setItem("role", userData.userRole)
    };
    fetchUser()
  },  [userData.token])

  return (
    <UserContext.Provider value={[userData, setUserData]} >
      {props.children}
    </UserContext.Provider>
  );
};