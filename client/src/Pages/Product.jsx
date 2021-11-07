import React, { useState } from "react";
import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { popularProducts } from "../data";

const Container = styled.div`
  display: flex;
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
`;

const Image = styled.img`
  height: 100%;
  object-fit: cover;
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

export default function Product() {
  const [quantity, setQuantity] = useState(1);

  const handleClick = (action) => {
    action === "up" && setQuantity((prev) => prev + 1);
    action === "down" && quantity !== 1 && setQuantity((prev) => prev - 1);
  };

  return (
    <Container>
      <Left>
        <ImageContainer>
          <Image src={popularProducts[2].img} />
        </ImageContainer>
      </Left>
      <Right>
        <Title>Denim Jumpsuit</Title>
        <Description>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </Description>
        <Price>$20</Price>
        <FilterContainer>
          <ColorWrapper>
            <FilterTitle>Color</FilterTitle>
            <Colors>
              <Color name="color" type="radio" id="color1" />
              <Label first bg="#010101" for="color1"></Label>
              <Color name="color" bg="#020388" type="radio" id="color2" />
              <Label bg="#020388" for="color2"></Label>
              <Color name="color" bg="#7b7b7b" type="radio" id="color3" />
              <Label bg="#7b7b7b" for="color3"></Label>
            </Colors>
          </ColorWrapper>
          <SizeWrapper>
            <FilterTitle>Size</FilterTitle>
            <Select Value="XS">
              <Option>XS</Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
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
    </Container>
  );
}
