import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Section from "Components/Section";
import Message from 'Components/Message';
import Poster from "Components/Poster";

const Container = styled.div`
    padding: 0 20px;
`;
const Form = styled.form`
    margin-bottom: 50px;
`;
const Input = styled.input`
    all: unset;
    font-size: 28px;
    width: 100%;
`;

const SearchPresent = (
    {
        movieResults,
        tvResults,
        searchTerm,
        handleSubmit,
        updateTerm,
        error,
        loading,
        
}) => (
    <Container>
    <Helmet><title>Search | Namflix</title></Helmet>
    <Form onSubmit={handleSubmit}>
        <Input placeholder="Input the keyword for Search Movie or TV Shows" value={searchTerm} onChange={updateTerm}/>
    </Form>
    {loading ? <Loader/> : <>
        {movieResults && movieResults.length > 0 && <Section title="Movie Results">{movieResults.map(movie => <Poster key={movie.id} id={movie.id} title={movie.original_title} imgUrl={movie.poster_path} isMovie={true} rating={movie.vote_average} year={movie.release_date && movie.release_date.substring(0, 4)} />)}</Section>}
        {tvResults && tvResults.length > 0 && <Section title="TV Show Results">{tvResults.map(show => <Poster key={show.id} id={show.id} title={show.original_name} imgUrl={show.poster_path} isMovie={false} rating={show.vote_average} year={show.first_air_date && show.first_air_date.substring(0, 4)} />)}</Section>}
    </>}
    {error && <Message color={"white"} text={error}/>}
    {movieResults && tvResults && movieResults.length === 0 && tvResults.length === 0 && <Message color={"white"} text={"Nothing Found"}/>}
</Container>);

SearchPresent.propTypes = {
    movieResults: PropTypes.array,
    tvResults: PropTypes.array,
    searchTerm: PropTypes.string,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    updateTerm: PropTypes.func.isRequired,
}

export default SearchPresent;