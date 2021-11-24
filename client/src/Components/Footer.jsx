import React from "react";
import styled from "styled-components";
import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import { middle, mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  width: 100vw;
  padding: 10px;
  ${middle({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  ${middle({ padding: "0px" })}
  ${middle({ marginBottom: "20px" })}
`;
const Middle = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  padding: 20px;
  ${middle({ padding: "0px" })}
  ${middle({ marginBottom: "20px" })}
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${middle({ padding: "0px" })}
  ${middle({ marginBottom: "20px" })}
`;

const Logo = styled.h2`
  font-weight: bolder;
  font-size: 30px;
  margin: 0;
`;
const Description = styled.p``;
const IconsMenu = styled.div`
  width: 35%;
  display: flex;
  justify-content: space-between;
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${(props) => props.bg};
  padding: 8px;
  color: white;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Title = styled.h3`
  margin: 0;
`;

const MenuContainer = styled.ul`
  list-style-type: none;
  width: 100%;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
`;

const MenuItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

export default function Footer() {
  const menuItems = [
    "Home",
    "Cart",
    "Man Fashion",
    "Woman Fashion",
    "Acessories",
    "My Account",
    "Order Tracking",
    "Wishlist",
    "Terms",
  ];
  return (
    <Container>
      <Left>
        <Logo>SHOPLIFY.</Logo>
        <Description>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </Description>
        <Wrapper>
          <IconsMenu>
            <IconWrapper bg="#3b5999">
              <Facebook />
            </IconWrapper>
            <IconWrapper bg="#e4405f">
              <Instagram />
            </IconWrapper>
            <IconWrapper bg="#55acee">
              <Twitter />
            </IconWrapper>
            <IconWrapper bg="#e60023">
              <Pinterest />
            </IconWrapper>
          </IconsMenu>
        </Wrapper>
      </Left>
      <Middle>
        <Title>Useful Links</Title>
        <MenuContainer>
          {menuItems.map((item, key) => (
            <MenuItem key={key}>{item}</MenuItem>
          ))}
        </MenuContainer>
      </Middle>
      <Right>
        <Title>Contact</Title>
        <ContactWrapper>
          <Place>
            <Room />
            <RoomDescription>
              622 Dixie Path , South Tobinchester 98336
            </RoomDescription>
          </Place>
          <PhoneSection>
            <Phone />
            <PhoneDescription>+1 234 56 78</PhoneDescription>
          </PhoneSection>
          <MailSection>
            <MailOutline />
            <MailDescription>yigit.balceli@ug.bilkent.edu.tr</MailDescription>
          </MailSection>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </ContactWrapper>
      </Right>
    </Container>
  );
}

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 0;
  height: 100%;
`;
const Place = styled.div`
  display: flex;
  align-items: center;
`;
const RoomDescription = styled.p`
  margin: 0;
  margin-left: 10px;
`;
const PhoneSection = styled.div`
  display: flex;
  align-items: center;
`;
const PhoneDescription = styled.p`
  margin: 0;
  margin-left: 10px;
`;
const MailSection = styled.div`
  display: flex;
  align-items: center;
`;
const MailDescription = styled.p`
  margin: 0;
  margin-left: 10px;
`;
const Payment = styled.img`
  width: 50%;
`;
