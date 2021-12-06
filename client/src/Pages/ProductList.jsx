import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import axios from "../axios";
import Products from "../Components/Products";

const firstLetterUpperCase = (str) => {
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);
  return str2;
};

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
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [filter, setFilter] = useState(null);
  const [colors, setColors] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    setFilter((prev) => ({ ...prev, category }));
  }, [category]);

  useEffect(() => {
    const fetchColorsAndSizes = async (category) => {
      if (category) {
        const response = await axios.get(`/color?category=${category}`);
        setColors(response.data.payload);
        const response2 = await axios.get(`/size`);
        setSizes(response2.data.payload);
      } else {
        const response = await axios.get(`/color`);
        setColors(response.data.payload);
        const response2 = await axios.get(`/size`);
        setSizes(response2.data.payload);
      }
    };
    fetchColorsAndSizes(category);
  }, [category]);

  return (
    <Container>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <Filters>
        <Left>
          <Description>Filter Products:</Description>
          <Select
            name="color"
            defaultValue="Color"
            onChange={(e) => {
              setFilter((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
          >
            <Value value={null} disabled>Color</Value>
            {colors &&
              colors?.map((item, index) => (
                <Value key={index} value={item.name}>
                  {firstLetterUpperCase(item.name)}
                </Value>
              ))}
          </Select>
          <Select
            name="size"
            defaultValue="Size"
            onChange={(e) => {
              setFilter((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
          >
            <Value value={null} disabled>Size</Value>
            {sizes &&
              sizes?.map((item, index) => (
                <Value key={index} value={item.size}>
                  {firstLetterUpperCase(item.size)}
                </Value>
              ))}
          </Select>
        </Left>
        <Right>
          <Description>Sort Products:</Description>
          <Select
            name="sort"
            defaultValue="Newest"
            onChange={(e) => setSort(e.target.value)}
          >
            <Value value="newest">Newest</Value>
            <Value value="asc">Price ASC</Value>
            <Value value="desc">Price DESC</Value>
          </Select>
        </Right>
      </Filters>
      <Wrapper>
        <Products filter={filter} sort={sort} />
      </Wrapper>
    </Container>
  );
}
