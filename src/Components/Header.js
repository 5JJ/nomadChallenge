import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

// styled components

const Header = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background-color: rgba(20, 20, 20, 1);
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const Item = styled.li`
  border-bottom: 3px solid
    ${(props) => (props.current ? "#2498db" : "transparent")};
  width: 80px;
  height: 50px;
  text-align: center;
  transition: border-bottom 0.5s ease-in-out;
`;

const List = styled.ul`
  display: flex;
  // &:hover{
  //     background-color: blue;
  // }
`;
const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default withRouter(({ location: { pathname } }) => (
  <Header>
    <List>
      <Item current={pathname === "/" || pathname.startsWith("/movie")}>
        <SLink to="/">Movies</SLink>
      </Item>
      <Item current={pathname === "/tv" || pathname.startsWith("/show")}>
        <SLink to="/tv">Tv</SLink>
      </Item>
      <Item current={pathname === "/search"}>
        <SLink to="/search">Search</SLink>
      </Item>
    </List>
  </Header>
));
