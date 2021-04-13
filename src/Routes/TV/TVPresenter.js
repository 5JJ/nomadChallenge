import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";
import Helmet from "react-helmet";

const Container = styled.div `
    padding: 0 10px;
`;

const TVPresenter = (
    {
        airingToday,
        popular,
        topRated,
        error,
        loading
}) => 
    <>
        <Helmet><title>TV | Namflix</title></Helmet>
        {loading ? <Loader/> : (
        <Container>
            {topRated && topRated.length > 0 && <Section title="Top Rated Shows">{topRated.map(show => <Poster key={show.id} id={show.id} title={show.original_name} imgUrl={show.poster_path} isMovie={false} rating={show.vote_average} year={show.first_air_date.substring(0, 4)} />)}</Section>}
            {popular && popular.length > 0 && <Section title="Popular Shows">{popular.map(show => <Poster key={show.id} id={show.id} title={show.original_name} imgUrl={show.poster_path} isMovie={false} rating={show.vote_average} year={show.first_air_date.substring(0, 4)} />)}</Section>}
            {airingToday && airingToday.length > 0 && <Section title="Airing Today">{airingToday.map(show => <Poster key={show.id} id={show.id} title={show.original_name} imgUrl={show.poster_path} isMovie={false} rating={show.vote_average} year={show.first_air_date.substring(0, 4)} />)}</Section>}
            {error && <Message color={"white"} text={error}/>}
        </Container>
        )};
    </>

TVPresenter.propTypes = {
    airingToday: PropTypes.array,
    popular: PropTypes.array,
    topRated: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
}

export default TVPresenter;