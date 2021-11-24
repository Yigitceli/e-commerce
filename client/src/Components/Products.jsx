import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductItem from "./ProductItem";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/productsReducer";
import { Add, Remove, Close } from "@material-ui/icons";
import ReactLoading from "react-loading";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Description = styled.p`
  font-weight: 400;
  font-size: 18px;
`;

export default function Products(props) {
  var { isLoading, isError, data } = useSelector((state) => state.products);
  const [productsData, setProductsData] = useState(null);
  const dispatch = useDispatch();
  const { filter, sort } = props;

  useEffect(() => {
    filter ? dispatch(fetchProducts(filter)) : dispatch(fetchProducts());
  }, [filter, dispatch]);

  useEffect(() => {
    setProductsData(data);
  }, [data]);

  useEffect(() => {
    if (sort === "newest") {
      setProductsData(data);
    } else if (sort === "asc") {
      setProductsData(
        data.slice().sort((a, b) => {
          return a.price - b.price;
        })
      );
    } else if (sort === "desc") {
      setProductsData(
        data?.slice().sort((a, b) => {
          return a.price + b.price;
        })
      );
    }
  }, [sort, data]);

  useEffect(() => {}, [productsData]);

  return (
    <Container>
      {isLoading ? (
        <LoadingContainer>
          <ReactLoading
            type={"cubes"}
            color="tomato"
            height={`300px`}
            width={`200px`}
          />
        </LoadingContainer>
      ) : isError ? (
        <LoadingContainer style={{ flexDirection: "column" }}>
          <Close style={{ width: "150px", height: "200px", margin: 0 }} />
          <Description style={{ fontSize: "24px" }}>
            Products With These Features Does Not Exist!
          </Description>
        </LoadingContainer>
      ) : (
        <>
          {productsData?.map((item) => (
            <ProductItem key={item.id} data={item} />
          ))}
        </>
      )}
    </Container>
  );
}
