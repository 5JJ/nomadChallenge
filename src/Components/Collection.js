import React from "react";
import {Link, WithRouter} from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    margin: 20px 0;
    padding: 10px 0;
    height: 18vh;
    display: flex;
    align-items: center;
`;
const Name = styled.span`
    margin: 0 10px;
    width: calc(100% - 300px);margin: 0 10px;
`;
const LinkTag = styled(Link)`

    border: 1px solid #999;
    padding: 11px 16px;
    background-color: #231f20;

    &:hover{
        color: #999;
    }
`;
const Cover = styled.div`
    border-radius: 5px;
    width: 20%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

const Collection = ({belongs_to_collection: collection}) => (
    <Container>
        <Cover bgImage={collection.poster_path ? `https://image.tmdb.org/t/p/original${collection.poster_path}` : require("../assets/no_image.jpg").default}/>
        <Name>{collection.name}</Name>
        <LinkTag to={`/collections/${collection.id}`}>More Info ▶︎</LinkTag>
    </Container>
)

export default Collection;