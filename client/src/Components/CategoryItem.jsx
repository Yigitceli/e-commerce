import React from "react";
import styled from "styled-components";
import { middle } from "../responsive";
import { Link } from "react-router-dom";

const Wrapper = styled(Link)`
  flex: 1;
  text-decoration: none;
  color: white;
  position: relative;
  margin: 0px 3px;
  ${middle({ margin: "3px 0" })}
  overflow:hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 70%;
  object-fit: cover;
  ${middle({ height: "40vh" })}
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h4`
  font-size: 36px;
  color: white;
  margin: 0;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background-color: white;
  color: gray;
`;

export default function CategoryItem({ data }) {
  return (
    <Wrapper to={`/products?category=${data.title.toLowerCase()}`}>
      <Image src={data.img} />
      <ContentWrapper>
        <Title>{data.title}</Title>
        <Button>SHOP NOW</Button>
      </ContentWrapper>
    </Wrapper>
  );
}
