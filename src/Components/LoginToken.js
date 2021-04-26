import { useState } from "react";

const LoginToken = () => {
  const getToken = () => {
    return window.localStorage.getItem("token");
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (value) => {
    window.localStorage.setItem("token", value);
    setToken(value);
  };

  return { setToken: saveToken, token };
};

export default LoginToken;
