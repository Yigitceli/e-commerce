import React from "react";
import { Add, Remove } from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { popularProducts } from "../data";

const Product = styled.div`
  display: flex;
  min-height: 200px;

  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const ProductImageContainer = styled.div`
  flex: 1;
  height: 100%;
`;

const ProductImage = styled.img`
  width: 200px;
  object-fit: cover;
`;

const ProductDetail = styled.div`
  flex: 5;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Quantity = styled.span`
  margin: 0 10px;
  font-size: 24px;
`;

const ProductPrice = styled.h2`
  font-size: 32px;
  font-weight: 300;
`;

const PriceDetail = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProductName = styled.p`
  margin: 0;
`;

const ProductId = styled.p`
  margin: 0;
`;

const ProductColor = styled.div`
  background-color: black;
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;

const ProductSize = styled.p`
  margin: 0;
`;

export default function CartItem() {
  return (
    <Product>
      <ProductImageContainer>
        <ProductImage src={popularProducts[0].img} />
      </ProductImageContainer>
      <ProductDetail>
        <ProductName>
          <strong>Product: </strong>
          JESSIE THUNDER SHOES
        </ProductName>
        <ProductId>
          <strong>ID: </strong>
          93813718293
        </ProductId>
        <ProductColor></ProductColor>
        <ProductSize>
          <strong>Size: </strong>S
        </ProductSize>
      </ProductDetail>
      <PriceDetail>
        <QuantityContainer>
          <Remove />
          <Quantity>1</Quantity>
          <Add />
        </QuantityContainer>
        <ProductPrice>$ 30</ProductPrice>
      </PriceDetail>
    </Product>
  );
}
