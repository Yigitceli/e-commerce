import React from "react";
import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";
import { middle } from "../responsive";

const Container = styled.div`
  padding: 15px;
  min-height: 75vh;
  width: 100%;
  display: flex;
  ${middle({ flexDirection: "column", padding: 0 })}
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
