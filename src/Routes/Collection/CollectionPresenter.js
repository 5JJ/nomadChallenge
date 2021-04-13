import React from "react";
import PropTypes from "prop-types";
import Loader from "Components/Loader";
import styled from "styled-components";
import {Link} from "react-router-dom";
import Helmet from "react-helmet";

const Container = styled.div`
    position: relative;
    padding: 20px;
`;
const Title = styled.h2`
    font-size: 32px;
    font-weight: bold;
`;
const PartList = styled.ul`
    margin-top: 30px;
`;
const PartListItem = styled.li`
    margin: 10px 20px;
    border-radius: 5px;
    padding: 20px;
    min-height: 280px;
    clear: both;
    background-color: rgba(0,0,0,0.6);
`;
const PartTitle = styled.h3`
    margin-bottom: 20px;
    border-bottom: 1px solid rgb(89 79 79 / 60%);
    padding-bottom: 10px;
    font-size: 20px;
`;
const Overview = styled.p`
    margin-top: 18px;
    color: #999;
    line-height: 1.6;
`;
const LinkContainer = styled.div`
    text-align: right;
`;
const LinkTag = styled(Link)`
    border: 1px solid #999;
    padding: 11px 16px;
    background-color: #231f20;
    display: inline-block;
    
    &:hover{
        color: #999;
    }
`;
const Image = styled.div`
    border-radius: 4px;
    width: 180px;
    height: 180px;
    background-image: url(${props => props.bgUrl});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
`;
const ImageContainer = styled.div`
    float: left;
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-position: center;
    background-size: cover;
    filter: blur(3px);
    opacity: .5;
    z-index: -1;
`;

const ItemContainer = styled.div`
    margin: 20px 0;
`;
const Item = styled.span``;
const Divider = styled.span`
    margin: 0 10px;
    background-color: #999;
    width: 2px;
    display: inline-block;
    height: 10px;
`;


const CollectionPresenter =({loading, error, result}) => 
    loading ?
    <>
    <Helmet><title>Loading | Namflix</title></Helmet>
    <Loader/>
    </>
    :
    <Container>
        <Helmet><title>{result.name} | Namflix</title></Helmet>
        <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}/>
        <Title>{result.name}</Title>
        <Overview>{result.overview}</Overview>
        <PartList>
        {result.parts && result.parts.sort((a, b) => a.id - b.id).map(part => (
            <PartListItem key={part.id}>
                <PartTitle>{part.original_title}</PartTitle>
                <ImageContainer>
                    <Image bgUrl={part.poster_path ? `https://image.tmdb.org/t/p/w300${part.poster_path}` : require("../../assets/no_image.jpg").default} />
                </ImageContainer>
                <ItemContainer>
                    <Item>{part.release_date}</Item>
                    <Divider/>
                    <Item>{`⭐️ ${part.vote_average}/10`}</Item>
                </ItemContainer>
            
                <Overview>{part.overview}</Overview>
                <LinkContainer><LinkTag to={`/movie/${part.id}`}>More Info ▶︎</LinkTag></LinkContainer>
            </PartListItem>
        ))}
        </PartList>
    </Container>

CollectionPresenter.propTypes = {
    result: PropTypes.shape({
        name: PropTypes.string.isRequired,
        overview: PropTypes.string,
        parts: PropTypes.arrayOf(
            PropTypes.shape({
                original_title: PropTypes.string,
                overview: PropTypes.string,
                id: PropTypes.number.isRequired,
                poster_path: PropTypes.string,
                release_date: PropTypes.string,
                vote_average: PropTypes.number,
            })
        ).isRequired,
    })
}
export default CollectionPresenter;