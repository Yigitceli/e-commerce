import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  flex: 1;
  position: relative;
  margin: 0px 3px;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h4`
  font-size: 36px;
  color: white;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background-color: white;
  color: gray;
`;

export default function CategoryItem({ data }) {
  return (
    <Wrapper>
      <ImageContainer>
        <Image src={data.img} />
      </ImageContainer>
      <ContentWrapper>
        <Title>{data.title}</Title>
        <Button>SHOP NOW</Button>
      </ContentWrapper>
    </Wrapper>
  );
}
