import React from "react";
import styled from "styled-components";
import {
  Search,
  ShoppingCartOutlined as ShoppingCart,
} from "@material-ui/icons";
import { Badge } from "@material-ui/core";

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
`;

const Logo = styled.span`
  font-weight: bolder;
  flex: 1;
  text-align: center;
  font-size: 30px;
`;

const Left = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const AnnouncmentContainer = styled.div`
  background-color: tomato;
  padding: 10px;
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

const SearchGroup = styled.div`
  border: 1px solid #d3d3d3;
  padding: 5px;
  margin-left: 20px;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  border: none;
  &:focus {
    outline: none;
  }
`;

const AuthItem = styled.span`
  font-size: 14px;
  margin-left: ${(props) => (props.first ? "0px" : "30px")};
  cursor: pointer;
`;
const Lang = styled.span``;
export default function Navbar(props) {
  return (
    <Container>
      <AnnouncmentContainer>
        <Announcment>Super Deal! Free Shipping on Orders Over $50</Announcment>
      </AnnouncmentContainer>
      <NavbarContainer sx={{ display: "flex" }}>
        <Left>
          <Lang>EN</Lang>
          <SearchGroup>
            <SearchInput placeholder="Search" />
            <Search style={{ fontSize: "20px", fontWeight: "100" }} />
          </SearchGroup>
        </Left>
        <Logo>Shoplify.</Logo>
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
    </Container>
  );
}
