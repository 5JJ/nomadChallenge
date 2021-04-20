import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Message from "Components/Message";

const Container = styled.div`
  margin-bottom: 20px;
  :last-child {
    margin-bottom: 0;
  }
`;
const Title = styled.h2`
  margin: 10px 0;
  font-weight: bold;
  font-size: 20px;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 125px);
  grid-gap: 20px;
`;
const Section = ({ title, children }) => (
  <Container>
    <Title>{title}</Title>
    {children.length === 0 ? (
      <Message text="No Results..." />
    ) : (
      <Grid>{children}</Grid>
    )}
  </Container>
);

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Section;
