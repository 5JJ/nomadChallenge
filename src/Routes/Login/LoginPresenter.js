import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

const Container = styled.div`
  margin: 10vh auto;
  padding: 20px 0 20px;
  box-shadow: 1px 2px 19px #920029;
  width: 80%;
  max-width: 600px;
`;
const Form = styled.form`
  min-height: 300px;
  border-radius: 10px;
`;
const Input = styled.input`
  width: 70%;
  display: block;
  margin: 18px auto;
  padding: 10px 29px;
`;
const SubmitBtn = styled.button`
  margin: 50px auto;
  border: none;
  padding: 16px 12px;
  display: block;
  cursor: pointer;
  width: 70%;
  box-sizing: border-box;
  color: white;
  font-weight: 600;
  background-color: #4b0b1e;
`;
const LoginTitle = styled.h2`
  margin: 30px 0;
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  color: #f6f6f6;
`;
const GestLoginBtn = styled(SubmitBtn)`
  background-color: #291117;
`;

const LoginPresenter = ({
  username,
  password,
  handleSubmit,
  changeUserName,
  changePassword,
  isLogin,
}) =>
  isLogin ? (
    <Redirect to={{ pathname: "/mypage", state: { from: "/login" } }} />
  ) : (
    <Container>
      <LoginTitle>LOGIN</LoginTitle>
      <Form onSubmit={handleSubmit}>
        <Input
          name="username"
          onChange={changeUserName}
          placeholder="username"
          value={username}
          autoComplete="off"
        />
        <Input
          name="password"
          onChange={changePassword}
          placeholder="password"
          value={password}
          type="password"
          autoComplete="off"
        />
        <SubmitBtn>LogIn</SubmitBtn>
        <GestLoginBtn type="button">Guest Login</GestLoginBtn>
      </Form>
    </Container>
  );
export default LoginPresenter;

LoginPresenter.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  changeUserName: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
};
