import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userNum, setUserNum] = useState(null);

  useEffect(() => {
    //로그인 상태 체크

    const checkedLoginStatus = async () => {
      // 서버에 현재 로그인 상태를 체크하는 API를 요청
      const response = await axios.get("/check-login");
      setLoggedIn(response.data);
      //사용자 Num 가져오기
      if (response.data) {
        const userNumResponse = await axios.get("/get-usernum");
        if (userNumResponse.status === 200) {
          setUserNum(userNumResponse.data);
        }
      } else {
        setUserNum(null);
      }
    };
    checkedLoginStatus();
  }, [loggedIn]);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, userNum }}>
      {children}
    </AuthContext.Provider>
  );
};
