import React from "react";
import LoginToken from "Components/LoginToken";
import MypagePresenter from "./MypagePresenter";
const MypageContainer = () => {
  const { isLogin } = LoginToken();
  return <MypagePresenter isLogin={isLogin} />;
};

export default MypageContainer;
