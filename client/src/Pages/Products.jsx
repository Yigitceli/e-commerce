import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

export default function Products() {
  return (
    <Container>
      <CategoryTitle>Coat</CategoryTitle>
      <Filters>
        <Left>
          <Description></Description>
          <ColorFilter>
            <ColorValue></ColorValue>
          </ColorFilter>
        </Left>
        <Right></Right>
      </Filters>
    </Container>
  );
}
