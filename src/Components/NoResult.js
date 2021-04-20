import React from "react";
import styled from "styled-components";

const Notice = styled.p`
  text-align: center;
  line-height: calc(30vh - 40px);
  color: #999;
`;

const NoResult = () => <Notice>No Result</Notice>;

export default NoResult;
