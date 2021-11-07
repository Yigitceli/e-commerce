import React from "react";
import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  padding: 15px;
  height: 75vh;
  width: 100%;
  display: flex;
`;

export default function Categories() {
  return (
    <Container>
      {categories.map((data) => (
        <CategoryItem data={data} />
      ))}
    </Container>
  );
}
