import React, { useState } from "react";
import LoginPresenter from "./LoginPresenter";
import LoginToken, { getToken } from "Components/LoginToken";
import CustomError from "Components/CustomError";
import { authApi } from "api";

const authErrors = {
  RequestTokenError: (msg) => new CustomError("RequestTokenError", msg),
  AccountInvalidError: (msg) => new CustomError("AccountInvalidError", msg),
  CreateSessionError: (msg) => new CustomError("CreateSessionError", msg),
};

const connect = async (inputValues) => {
  const result = { success: true, session_id: "", request_token: "" };
  const { username, password } = inputValues;
  try {
    // get new Request token
    let { value: request_token, expiredDate } = getToken();
    if (!request_token) {
      const {
        data: { success, request_token: token, status_message, expires_at },
      } = await authApi.getRequestToken();

      if (!success) throw authErrors.RequestTokenError(status_message);
      request_token = token;
      expiredDate = expires_at;
    }
    result.request_token = { value: request_token, expiredDate };

    // confirm token with username and password
    const {
      data: { success, status_message },
    } = await authApi.createSessionWithLogin(username, password, request_token);
    if (!success) throw authErrors.AccountInvalidError(status_message);

    // create session id with request token
    const {
      data: { status_message: msg, session_id },
    } = await authApi.createSession(request_token);
    if (!session_id) throw authErrors.CreateSessionError(msg);
    result.session_id = session_id;
  } catch (error) {
    if (error instanceof CustomError) {
      //   switch (error.name) {
      //     case "RequestTokenError":
      //       break;
      //     case "CreateSessionError":
      //       break;
      //   }
    }
    result.success = false;
    //alert(error.message);
  }
  return result;
};
const useForm = (initialValues, validation, onSubmit, handleResult) => {
  const [inputValues, setInputValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const changeInput = (e) => {
    const {
      target: { name, value },
    } = e;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleSubmit = async (e) => {
    if (!submitting) {
      setSubmitting(true);
      e.preventDefault();
      if (typeof validation !== "function" || validation(inputValues)) {
        const result = await onSubmit(inputValues);
        handleResult(result);
        setSubmitting(false);
      }
    }
  };

  return {
    inputValues,
    changeInput,
    handleSubmit,
  };
};

const validation = () => true;

const LoginContainer = ({ location: { state } }) => {
  console.log(state);
  const { isLogin, setSessionId, setToken } = LoginToken();
  const {
    inputValues: { username, password },
    changeInput,
    handleSubmit,
  } = useForm(
    { username: "", password: "" },
    validation,
    connect,
    ({ success, session_id, request_token }) => {
      if (success) {
        setSessionId(session_id);
        setToken(request_token);
        alert("????????? ???????????????.");
        return;
      }
      if (request_token) {
        setToken(request_token);
      }
      alert("?????? ??????????????????.");
    }
  );
  return (
    <LoginPresenter
      username={username}
      password={password}
      handleSubmit={handleSubmit}
      changeUserName={changeInput}
      changePassword={changeInput}
      isLogin={isLogin}
    />
  );
};

export default LoginContainer;
