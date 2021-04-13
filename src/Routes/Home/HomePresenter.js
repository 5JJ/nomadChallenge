import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";
import Helmet from "react-helmet";

const Container = styled.div`
    padding: 20px;
    margin-top: 20px;
`;


const HomePresenter = (
    {
        nowPlaying,
        popular,
        upcoming,
        error,
        loading
    }
) => ( loading ? <Loader /> :
    <Container>
        <Helmet><title>Movies | Namflix</title></Helmet>
        {/* children 은 html tag 사이에 입력된 값을 의미한다. */}
        {nowPlaying && nowPlaying.length > 0 && 
            <Section title="Now Playing">{nowPlaying.map(movie => <Poster key={movie.id} id={movie.id} title={movie.original_title} imgUrl={movie.poster_path} isMovie={true} rating={movie.vote_average} year={movie.release_date.substring(0, 4)} />)}</Section>
        }
        {popular && popular.length > 0 && 
            <Section title="Popular">{popular.map(movie => <Poster key={movie.id} id={movie.id}  title={movie.original_title} imgUrl={movie.poster_path} isMovie={true} rating={movie.vote_average} year={movie.release_date.substring(0, 4)} />)}</Section>
        }
        {upcoming && upcoming.length > 0 && 
            <Section title="Upcoming">{upcoming.map(movie => <Poster key={movie.id} id={movie.id} title={movie.original_title} imgUrl={movie.poster_path} isMovie={true} rating={movie.vote_average} year={movie.release_date.substring(0, 4)} />)}</Section>
        }
        {error ? <Message text={error} color={'red'}/> : null}
    </Container>
);

HomePresenter.propTypes = {
    nowPlaying: PropTypes.array,
    popular: PropTypes.array,
    upcoming: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
}

export default HomePresenter;