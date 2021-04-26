import React from "react";
import LoginToken from "Components/LoginToken";
import MypagePresenter from "./MypagePresenter";
const MypageContainer = () => {
  const { token, setToken } = LoginToken();
  console.log(token);
  return <MypagePresenter token={token} />;
};

export default MypageContainer;
