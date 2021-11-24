import React from "react";
import styled from "styled-components";
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

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

const ProductImg = styled.img`
  height: 80%;
  max-width:80%;
  z-index: 2;
`;

const Icon = styled(Link)`
  margin: 0 5px;
  padding: 10px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s linear;
  color: #0c0c0c;

  &:hover {
    transform: scale(1.2);
    background-color: #e9f5f5;
  }
`;

export default function ProductItem({ data }) {
  return (
    <Wrapper>
      <ProductImg src={data.image} />
      <Info>        
        <Icon to={`/product/${data.id}`}>
          <SearchOutlined />
        </Icon>
        <Icon to={`/product/${data.id}`}>
          <ShoppingCartOutlined />
        </Icon>
      </Info>
    </Wrapper>
  );
}
