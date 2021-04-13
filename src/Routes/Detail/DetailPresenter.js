import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import {withRouter } from "react-router-dom";
import Tab from "Components/Tab";
import Collection from "Components/Collection";
import Helmet from "react-helmet";
import Message from "Components/Message";

const Container = styled.div`
    position: relative;
    width: 100%;
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - 50px);
    background-image: url(${props => props.bgImage});
    background-position: center;
    background-size: cover;
    filter: blur(3px);
    opacity: .5;
    z-index: 0;
`;

const Content = styled.div`
    padding: 20px;
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
`;

const Cover = styled.div`
    border-radius: 5px;
    width: 30%;
    height: 100vh;
    max-height: calc(30vw + 100px);
    background-image: url(${props => props.bgImage});
    background-size: cover;
    background-position: center;
`;

const Data = styled.div`
    width: 70%;
    margin-left: 10px;
    margin-bottom: 100px;
`;

const Title = styled.h2`
    margin-bottom: 10px;
    font-size: 32px;
`;

const ItemContainer = styled.div`
    margin: 20px 0;
`;
const Item = styled.span``;
const Divider = styled.span`
    margin: 0 10px
`;

const Overview = styled.p`
    line-height: 1.8;    
    font-size: 12px;
    color: 0.7;
    width: 50%;
`;

const VideoList = styled.ul``;
const Video = styled.video``;
const LinkTag = styled.a`
    margin-left: 20px;
    border-radius: 3px;
    padding: 2px 10px;
    display: inline-block;
    line-height: 14px;
    color: #231f20;
    font-weight: bold;
    font-size: 12px;
    background-color: #f0c23a;
`;
const Section = styled.section`
    background-color: rgba(0,0,0,0.6);
`;

const DetailPresenter = withRouter(({location : {pathname}, match : {path}, result, loading, error}) => (
    loading ?
    <>
        <Helmet><title>Loading | Namflix</title></Helmet>
        <Loader/>
    </>
    :
    (
        error ?
        <Message text={error}/>
        :
        <Container>
            {result.isMovie = !!result.original_title}
            <Helmet><title>{result.isMovie ? result.original_title : result.original_name} | Namflix</title></Helmet>
            <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}/>
            <Content>
                <Cover bgImage={result.poster_path ? `https://image.tmdb.org/t/p/original${result.poster_path}` : require("../../assets/no_image.jpg").default}/>
                <Data>
                    <Title>{result.isMovie ? result.original_title : result.original_name}</Title>
                    <ItemContainer>
                        <Item>{(result.isMovie ? (result.release_date && result.release_date.substring(0, 4)) : (result.first_air_date && result.first_air_date.substring(0, 4)))}</Item>
                        <Divider>·</Divider>
                        <Item>{(result.isMovie ? result.runtime : result.episode_run_time[0])} min</Item>
                        <Divider>·</Divider>
                        <Item>{result.genres && result.genres.map((genre, index) => index === result.genres.length - 1 ? genre.name : `${genre.name} / ` )}</Item>
                        <LinkTag href={`https://www.imdb.com/title/${result.imdb_id}`} target="_blank" >IMDB ➡</LinkTag>
                    </ItemContainer>
                    
                    <Overview>{result.overview}</Overview>
                    <Section>
                        {result.belongs_to_collection && <Collection belongs_to_collection = {result.belongs_to_collection} />   }                 
                    </Section>
                    <Section>
                        <Tab {...result} />
                    </Section>
                </Data>
            </Content>
        </Container>
    )
))


DetailPresenter.propTypes = {
    result: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
}

export default DetailPresenter;