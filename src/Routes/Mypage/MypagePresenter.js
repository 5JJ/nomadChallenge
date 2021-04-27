import React from "react";
import { Redirect } from "react-router-dom";

const MypagePresenter = ({ isLogin }) => {
  return isLogin ? (
    "Mypage"
  ) : (
    <Redirect to={{ pathname: "/login", state: { from: "/mypage" } }} />
  );
};

export default MypagePresenter;
