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
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 40%;
  padding: 20px;
  background-color: white;
`;
const InputGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Title = styled.h1`
  margin: 0;
  color: tomato;
  font-weight: 600;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 20px 0 0;
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

const Policy = styled.p`
  margin: 5px 0;
  font-size: 14px;
`;

export default function Register() {
  return (
    <Container>
      <LoginForm>
        <Title>Create An Account</Title>
        <InputGroup>
          <Input placeholder="Name" type="text" />
          <Input placeholder="Last name" type="text" />
          <Input placeholder="Email" type="text" />
          <Input placeholder="Username" type="text" />
          <Input placeholder="Password" type="password" />
          <Input placeholder="Password Verify" type="password" />
        </InputGroup>

        <Policy>
          By creating an account, I consent to the processing of my personal
          data in accordance with the <strong>PRIVACY POLICY</strong>
        </Policy>
        <Button>Sign Up</Button>
        <Link style={{ fontSize: "12px", marginBottom: "10px" }} to="#">
          DO NOT YOU REMEMBER THE PASSWORD?
        </Link>
        <Link style={{ fontSize: "12px" }} to="#">
          DO YOU HAVE AN ACCOUNT?
        </Link>
      </LoginForm>
    </Container>
  );
}
