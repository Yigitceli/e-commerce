import React, { useState } from "react";
import styled from "styled-components";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import { sliderItems } from "../data";

const Container = styled.div`
  background-color: "#f5fafd";
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;  
`;
const ImageContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 80%;
`;

const InfoContainer = styled.div`
  width: 100%;
  padding: 15px;
  flex: 1;
`;

const Slide = styled.div`
  display: flex;
  width: 100vw;
  height: 100%;
  transition: all 0.7s linear;
  transform: translateX(${(props) => props.slideIndex * "-100"}vw);
  background-color: #${(props) => props.bg};
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  display: flex;
  font-size: 70px;
`;

const Description = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  letter-spacing: 3px;
`;

const Button = styled.button`
  background-color: transparent;
  font-weight: 350;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
`;
const Arrow = styled.div`
  z-index: 2;
  padding: 10px;
  position: absolute;
  border-radius: 50%;
  background-color: #fff7f7;
  ${(props) => (props.right ? "right:10px" : "left:10px")};
  opacity: 0.5;
  cursor: pointer;
`;

export default function Slider() {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "right") {
      setSlideIndex(slideIndex >= 2 ? 0 : slideIndex + 1);
    } else {
      setSlideIndex(slideIndex < 1 ? 2 : slideIndex - 1);
    }
  };

  console.log(slideIndex);
  return (
    <Container>
      <Arrow onClick={() => handleClick("left")}>
        <ArrowLeft style={{ fontSize: "25px" }} />
      </Arrow>
      <Wrapper>
        {sliderItems.map((item, index) => (
          <Slide key={index} bg={item.bg} slideIndex={slideIndex}>
            <ImageContainer>
              <Image src={item.img} />
            </ImageContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Description>{item.desc}</Description>
              <Button>SHOW NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow right onClick={() => handleClick("right")}>
        <ArrowRight style={{ fontSize: "25px" }} />
      </Arrow>
    </Container>
  );
}
