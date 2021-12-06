import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/userReducer";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  margin: 0;
  color: tomato;
  font-weight: 600;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  background-color: tomato;
  border: none;
  width: 180px;
  padding: 15px 20px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
    if (!error) {
      setEmail("");
      setPassword("");
      navigate("/");
    }
  };
  return (
    <Container>
      <LoginForm onSubmit={submitHandler}>
        <Title>SIGN IN</Title>
        <Input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>{error}</p>}
        <Button type="submit">Sign In</Button>
        <Link style={{ fontSize: "12px", marginBottom: "10px" }} to="#">
          DO NOT YOU REMEMBER THE PASSWORD?
        </Link>
        <Link style={{ fontSize: "12px" }} to="#">
          CREATE A NEW ACCOUNT
        </Link>
      </LoginForm>
    </Container>
  );
}
