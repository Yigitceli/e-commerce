import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
  return (
    <Container>
      <LoginForm>
        <Title>SIGN IN</Title>
        <Input placeholder="Username" type="text" />
        <Input placeholder="Password" type="password" />
        <Button>Sign In</Button>
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
