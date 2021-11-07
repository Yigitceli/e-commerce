import React from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import PopularProductItem from "./PopularProductItem";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default function PopularProducts() {
  return (
    <Container>
      {popularProducts.map((data) => (
        <PopularProductItem data={data} />
      ))}
    </Container>
  );
}
