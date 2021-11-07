import React from "react";
import styled from "styled-components";
import { Send } from "@material-ui/icons";

const Container = styled.div`
  width: 100%;
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h3`
  font-weight: bolder;
  font-size: 70px;
  margin: 0;
`;
const Desc = styled.p`
  font-size: 24px;
  font-weight: 300;
`;
const EmailGroup = styled.div`
  display: flex;
  justify-content: center;

  width: 50%;
`;
const Input = styled.input`
  flex: 8;
  border: 1px solid lightgray;
  padding: 10px 20px;
  &:focus {
    outline: none;
  }
`;
const Button = styled.button`
  background-color: tomato;
  flex: 1;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default function Newsletter() {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      <EmailGroup>
        <Input placeholder="Your Email"></Input>
        <Button>
          <Send />
        </Button>
      </EmailGroup>
    </Container>
  );
}
