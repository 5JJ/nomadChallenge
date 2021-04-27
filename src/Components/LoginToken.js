import { useState } from "react";

export const getToken = () => {
  return window.localStorage.getItem("token");
};
export const getSessionId = () => {
  return window.localStorage.getItem("sessionId");
};
const LoginToken = () => {
  const [token, setToken] = useState(getToken() || "");
  const [sessionId, setSessionId] = useState(getSessionId() || "");

  const saveToken = (value) => {
    window.localStorage.setItem("token", value);
    setToken(value);
  };
  const saveSessionId = (value) => {
    window.localStorage.setItem("sessionId", value);
    setSessionId(value);
  };

  return {
    setToken: saveToken,
    token,
    setSessionId: saveSessionId,
    isLogin: !!sessionId,
  };
};

export default LoginToken;
