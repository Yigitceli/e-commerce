import React, { useEffect } from "react";
import styled from "styled-components";
import ProductItem from "./ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, sortProducts } from "../store/productsReducer";
import { Close } from "@material-ui/icons";
import ReactLoading from "react-loading";


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
  const dispatch = useDispatch();
  const { filter, sort } = props;

  useEffect(() => {
    filter ? dispatch(fetchProducts(filter)) : dispatch(fetchProducts());
  }, [filter, dispatch]);

  useEffect(() => {
    dispatch(sortProducts(sort));
  }, [sort, data, dispatch]);

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
          {filter ? (
            <>
              {data.map((item) => (
                <ProductItem key={item.id} data={item} />
              ))}
            </>
          ) : (
            <>
              {data.slice(0, 7)?.map((item) => (
                <ProductItem key={item.id} data={item} />
              ))}
            </>
          )}
        </>
      )}
    </Container>
  );
}
