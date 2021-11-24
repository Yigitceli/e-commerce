import React, { useState } from "react";
import styled from "styled-components";
import {
  Person,
  Search,
  ShoppingCartOutlined as ShoppingCart,
} from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { middle } from "../responsive";
import { Link } from "react-router-dom";

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  ${middle({ padding: "5px 10px" })}
`;

const Logo = styled(Link)`
  font-weight: bolder;
  color: black;
  text-decoration: none;
  flex: 1;
  text-align: left;
  font-size: 30px;
`;

const Left = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  text-align: left;
`;

const Right = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  ${middle({ flex: 1, justifyContent: "space-around" })}
`;

const AnnouncmentContainer = styled.div`
  background-color: tomato;
  padding: 6px;
  font-size: 14px;
  justify-content: center;
  display: flex;
`;

const Announcment = styled.span`
  color: white;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const AuthItem = styled.span`
  display: ${(props) => props.Mobile && "none"};
  font-size: 14px;
  margin-left: ${(props) => (props.first ? "0px" : "30px")};
  ${middle({ marginLeft: "5px" })}
  ${(props) => props.nonMobile && middle({ display: "none" })}
  ${(props) => props.Mobile && middle({ display: "block" })}
  cursor: pointer;
`;

const Lang = styled.span`
  ${middle({ display: "none" })}
`;

const DropDownMenu = styled.div`
  position: absolute;
  display: flex;
  padding: 5px;
  right: 5px;
  list-style-type: none;
  background-color: white;
  transition: All 0.3s linear;
`;

const MenuItem = styled.div`
  text-decoration: none;
  padding: 10px;
  color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Navbar(props) {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <NavbarContainer sx={{ display: "flex" }}>
        <Left>
          <Logo to="/">Shoplify.</Logo>
        </Left>
        <Right>
          <AuthItem first>SIGN IN</AuthItem>
          <AuthItem>REGISTER</AuthItem>
          <AuthItem>
            <Badge badgeContent={4} color="secondary">
              <ShoppingCart style={{ color: "tomato" }} />
            </Badge>
          </AuthItem>
        </Right>
      </NavbarContainer>
      <AnnouncmentContainer>
        <Announcment>Super Deal! Free Shipping on Orders Over $50</Announcment>
      </AnnouncmentContainer>
    </Container>
  );
}
