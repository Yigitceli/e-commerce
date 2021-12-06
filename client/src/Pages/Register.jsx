import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../store/userReducer";
import { Snackbar } from "@material-ui/core";

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
  const [first_name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_verify, setPasswordVerify] = useState("");

  const dispatch = useDispatch();
  const { error, notifications } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      userRegister({ first_name, last_name, email, password, password_verify })
    );
    if (!error) {
      setName("");
      setLastName("");
      setEmail("");
      setPasswordVerify("");
      setPassword("");
      navigate("/");
    }
  };

  return (
    <Container>
      <LoginForm onSubmit={submitHandler}>
        <Title>Create An Account</Title>
        <InputGroup>
          <Input
            placeholder="Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={first_name}
          />
          <Input
            placeholder="Last name"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            value={last_name?.trim()}
          />
          <Input
            placeholder="Email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email?.trim()}
            style={{ minWidth: "80%" }}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password?.trim()}
          />
          <Input
            placeholder="Password Verify"
            type="password"
            onChange={(e) => setPasswordVerify(e.target.value)}
            value={password_verify?.trim()}
          />
        </InputGroup>

        <Policy>
          By creating an account, I consent to the processing of my personal
          data in accordance with the <strong>PRIVACY POLICY</strong>
        </Policy>
        <Button type="submit">Sign Up</Button>
        {error && error.map((item) => <p>{item}</p>)}
        
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
