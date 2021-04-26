import React from "react";
import { Redirect } from "react-router-dom";

const MypagePresenter = ({ token }) => {
  return token ? (
    "Mypage"
  ) : (
    <Redirect to={{ pathname: "/login", state: { from: "/mypage" } }} />
  );
};

export default MypagePresenter;
