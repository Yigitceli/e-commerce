import React from "react";
import styled from "styled-components";
import Products from "../Components/Products";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const CategoryTitle = styled.h2`
  font-size: 32px;
`;

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
`;

const Right = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const Description = styled.h4`
  font-weight: 600;
  font-size: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-left: 25px;
`;

const Value = styled.option``;

const Wrapper = styled.div``;

export default function ProductList() {
  return (
    <Container>
      <CategoryTitle>Coat</CategoryTitle>
      <Filters>
        <Left>
          <Description>Filter Products:</Description>
          <Select name="color" defaultValue="Color">
            <Value disabled>Color</Value>
          </Select>
          <Select name="size" defaultValue="Size">
            <Value disabled>Size</Value>
          </Select>
        </Left>
        <Right>
          <Description>Sort Products:</Description>
          <Select name="sort" defaultValue="Newest">
            <Value>Newest</Value>
          </Select>
        </Right>
      </Filters>
      <Wrapper>
        <Products />
      </Wrapper>
    </Container>
  );
}
