import { Add, Remove } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CartItem from "../Components/CartItem";
import { popularProducts } from "../data";
import { middle, mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  ${middle({ padding: "0" })}
`;

const Title = styled.h1`
  font-weight: 300;
  margin: 0;
`;

const TopWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 20px;
  ${middle({ padding: "5px;" })}
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
  ${middle({ display: "none" })}
`;

const MiddleWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  ${middle({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 6;
`;

const Right = styled.div`
  flex: 2;
  height: 100%;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  min-height: 55vh;
`;

const Menu = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const MenuItem = styled.div`
  display: flex;
  padding: 0 0 30px 0;
  width: 100%;
  justify-content: space-between;
  font-size: ${(props) => props.total && "24px"};
  font-weight: ${(props) => props.total && 500};
`;

const Description = styled.span``;

const Price = styled.span``;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

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
            Your Wishlist(0)
          </Link>
        </LinkGroup>
        <Button right>CHECKOUT NOW</Button>
      </TopWrapper>
      <MiddleWrapper>
        <Left>
          <CartItem />
          <Hr />
        </Left>
        <Right>
          <Title style={{ paddingBottom: "30px" }}>ORDER SUMMARY</Title>
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
            <MenuItem total>
              <Description>Total</Description>
              <Price>$ 0</Price>
            </MenuItem>
          </Menu>
          <Button right style={{ width: "100%" }}>
            CHECKOUT NOW
          </Button>
        </Right>
      </MiddleWrapper>
    </Container>
  );
}
