import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Add, Remove, Close } from "@material-ui/icons";
import ReactLoading from "react-loading";
import { popularProducts } from "../data";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/productReducer";

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 30px;
  height: 100vh;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: rgba(48, 49, 52, 0.3);
  margin-right: 20px;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 20px;
`;

const ImageContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  height: 100%;
  max-width: 80%;
`;

const Title = styled.h2`
  font-weight: 300;
  font-size: 48px;
  margin: 0;
`;

const Description = styled.p`
  font-weight: 400;
  font-size: 18px;
`;

const Price = styled.span`
  font-weight: 200;
  font-size: 48px;
`;

const FilterContainer = styled.div`
  display: flex;
  width: 40%;
  padding: 40px 0;
  align-items: center;
  justify-content: space-between;
`;

const FilterTitle = styled.span`
  margin-right: 10px;
  font-weight: 400;
  font-size: 24px;
`;

const ColorWrapper = styled.div`
  display: flex;
`;

const Colors = styled.div`
  display: flex;
`;

const Color = styled.input`
  display: none;
  &:checked + label {
    border: 2px solid tomato;
  }
`;

const Label = styled.label`
  width: 30px;
  height: 30px;
  margin-left: ${(props) => !props.first && "10px"};
  border: none;
  background-color: ${(props) => props.bg};
  border-radius: 50%;
  cursor: pointer;
`;

const SizeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Select = styled.select`
  padding: 10px;
`;

const Option = styled.option``;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FinalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40%;
`;

const Quantity = styled.span`
  font-size: 24px;
  margin: 0 10px;
  padding: 5px 15px;
  border: 1px solid tomato;
  border-radius: 10px;
`;

const Button = styled.button`
  border: 2px solid tomato;
  background-color: none;
  padding: 15px;
  font-size: 16px;
  cursor: pointer;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Product() {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { isError, isLoading, data } = useSelector((state) => state.product);
  
  const dispatch = useDispatch();

  const handleClick = (action) => {
    action === "up" && setQuantity((prev) => prev + 1);
    action === "down" && quantity !== 1 && setQuantity((prev) => prev - 1);
  };

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [id, dispatch]);

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
            Product does not Exist!
          </Description>
        </LoadingContainer>
      ) : (
        <>
          <Left>
            <ImageContainer>
              <Image src={data?.image} />
            </ImageContainer>
          </Left>
          <Right>
            <Title>{data?.title}</Title>
            <Description>{data?.description}</Description>
            <Price>{data?.price}</Price>
            <FilterContainer>
              <ColorWrapper>
                <FilterTitle>Color</FilterTitle>
                <Colors>
                  {data?.colors?.map((item, index) => (
                    <>
                      <Color name="color" type="radio" id={`color${index}`} />
                      <Label bg={`${item.name}`} for={`color${index}`}></Label>
                    </>
                  ))}
                </Colors>
              </ColorWrapper>
              <SizeWrapper>
                <FilterTitle>Size</FilterTitle>
                <Select Value="XS">
                  {data?.sizes?.map((item) => (
                    <Option>{item.size}</Option>
                  ))}
                </Select>
              </SizeWrapper>
            </FilterContainer>
            <FinalContainer>
              <QuantityContainer>
                <Remove
                  style={{ fontSize: "30px", cursor: "pointer" }}
                  onClick={() => handleClick("down")}
                ></Remove>
                <Quantity>{quantity}</Quantity>
                <Add
                  style={{ fontSize: "30px", cursor: "pointer" }}
                  onClick={() => handleClick("up")}
                ></Add>
              </QuantityContainer>
              <Button>Add To Cart</Button>
            </FinalContainer>
          </Right>
        </>
      )}
    </Container>
  );
}
