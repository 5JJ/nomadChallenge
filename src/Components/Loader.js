import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-items: center;
`;
const LoadingIcon = styled.span`
  width: 100vw;
  display: block;
  text-align: center;
`;

const Loader = () => (
  <Container>
    <LoadingIcon role="img" aria-label="loading">
      ⏰
    </LoadingIcon>
  </Container>
);
export default Loader;
