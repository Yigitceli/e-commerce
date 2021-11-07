import React from "react";
import styled from "styled-components";
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: rgba(48, 49, 52, 0.6);
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  cursor: pointer;
`;

const Wrapper = styled.div`
  background-color: rgba(255, 99, 71, 0.5);
  margin: 5px;
  min-width: 400px;
  height: 350px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex: 1;

  &:hover ${Info} {
    opacity: 1;
    transition: All 0.2s linear;
  }
`;
const CircleContainer = styled.div`
  position: absolute;
  top: 0;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
`;

const Circle = styled.div`
  background-color: white;
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

const ProductImg = styled.img`
  height: 80%;
  z-index: 2;
`;

const Icon = styled.div`
  margin: 0 5px;
  padding: 10px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s linear;

  &:hover {
    transform: scale(1.2);
    background-color: #e9f5f5;
  }
`;

export default function PopularProductItem({ data }) {
  return (
    <Wrapper>
      <ProductImg src={data.img} />
      <CircleContainer>
        <Circle></Circle>
      </CircleContainer>
      <Info>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
        <Icon>
          <SearchOutlined />
        </Icon>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
      </Info>
    </Wrapper>
  );
}
