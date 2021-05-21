import { useState } from "react";

const getStorageItem = (key) => window.localStorage.getItem(key);
const removeStorageItem = (key) => window.localStorage.removeItem(key);
const isExpired = (compDate, baseDate = new Date().getTime()) => {
  return new Date(compDate) < baseDate;
};
const isSessionExpired = () => {
  const { expiredDate } = getSessionId();
  return expiredDate && isExpired(expiredDate);
};
const getItemAfterCheck = (key) => {
  const { value, expiredDate } = JSON.parse(getStorageItem(key) || "{}");
  if (isExpired(expiredDate)) {
    removeStorageItem(key);
    return { value: "", expiredDate: "" };
  }
  return { value, expiredDate };
};

export const getToken = () => getItemAfterCheck("token");
export const getSessionId = () => getStorageItem("sessionId");
export const getGuestSessionId = () => getItemAfterCheck("gSessionId");
export const isLogin = () => !isSessionExpired();

const LoginToken = () => {
  const [token, setToken] = useState(getToken() || "");
  const [sessionId, setSessionId] = useState(getSessionId() || "");

  const saveToken = ({ value, expiredDate }) => {
    window.localStorage.setItem(
      "token",
      JSON.stringify({ value, expiredDate })
    );
    setToken(value);
  };
  const saveSessionId = (value) => {
    window.localStorage.setItem("sessionId", value);
    setSessionId(value);
  };

  return {
    setToken: saveToken,
    setSessionId: saveSessionId,
    isLogin: !!sessionId && !isSessionExpired(),
  };
};

export default LoginToken;
