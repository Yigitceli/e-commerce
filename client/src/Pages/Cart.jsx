import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
`;

const TopWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px;
  background-color: ${(props) => (props.right ? "black" : "transparent")};
  color: ${(props) => (props.right ? "white" : "black")};
  cursor: pointer;
`;

const LinkGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MiddleWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
`;

const Left = styled.div`
  border-top: 1px solid #eeeeee;
  flex: 5;
`;

const Right = styled.div`
  flex: 2;
  height: 100%;
  border: 1px solid lightgray;
  border-radius: 10px;
`;

const Menu = styled.div`
  display: flex;
`;

const MenuItem = styled.div``;

const Description = styled.span``;

const Price = styled.span``;

const ButtonCheckout = styled.button``;

export default function Cart() {
  return (
    <Container>
      <Title>YOUR BAG</Title>
      <TopWrapper>
        <Button>CONTINUE SHOPPING</Button>
        <LinkGroup>
          <Link style={{ margin: "0px 10px" }} to="#">
            Shopping Bag(2)
          </Link>
          <Link style={{ margin: "0px 10px" }} to="#">
            Your Wishlist
          </Link>
        </LinkGroup>
        <Button right>CHECKOUT NOW</Button>
      </TopWrapper>
      <MiddleWrapper>
        <Left></Left>
        <Right>
          <Title>ORDER SUMMARY</Title>
          <Menu>
            <MenuItem>
              <Description>Subtotal</Description>
              <Price>$ 0</Price>
            </MenuItem>
            <MenuItem>
              <Description>Estimated Shipping</Description>
              <Price>$ 5.90</Price>
            </MenuItem>
            <MenuItem>
              <Description>Shipping Discount</Description>
              <Price>$ -5.90</Price>
            </MenuItem>
            <MenuItem>
              <Description>Total</Description>
              <Price>$ 0</Price>
            </MenuItem>
          </Menu>
          <Button right style={{ width: "100%" }}>
            CHECK OUT
          </Button>
        </Right>
      </MiddleWrapper>
    </Container>
  );
}
