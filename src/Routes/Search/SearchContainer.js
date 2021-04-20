import React from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi, genreApi } from "api";

export default class extends React.Component{
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm: "",
        error: null,
        loading: false,
        genres: null,
        genreId: null,
    }
    allGenres = {};
    async componentDidMount(){
        try{
            const {data: {genres: allTvGenres}} = await genreApi.getTvList();
            const {data: {genres: allMovieGenres}} = await genreApi.getMovieList();
            allTvGenres.forEach(genre => {
                this.allGenres[(genre.id).toString()] = genre.name;
            });
            allMovieGenres.forEach(genre => {
                this.allGenres[(genre.id).toString()] = genre.name;
            });

            // this.allGenres.push(...allTvGenres);
            // this.allGenres.push(...allMovieGenres.filter(movieGenre => !allTvGenres.some(tvGenre => tvGenre.id !== movieGenre.id)))
        }catch(error){

        }finally{
            
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { searchTerm } = this.state;
        if(searchTerm !== ""){
            this.searchByTerm();
        }
    }

    updateTerm = (e) => {
        const {target : {value}} = e;
        this.setState({searchTerm: value})
    }

    searchByTerm = async () => {
        const { searchTerm } = this.state;
        try{
            this.setState({loading: true});
            const {data: {results: movieResults}} = await moviesApi.search(searchTerm);
            const {data: {results: tvResults}} = await tvApi.search(searchTerm);
            
            const genres = Array.from(new Set([...movieResults, ...tvResults].reduce((acc, result) => {
                acc.push(...result.genre_ids);
                return acc;
            }, []))).map(id => ({id: id, name: this.allGenres[id.toString()]}));
            
            this.setState({
                movieResults, 
                tvResults, 
                genres,
            })
            console.log("renderdd");
        }catch(error){
            this.setState({error: "Can't search"})
        }finally{
            console.log("render");
            this.setState({loading: false})
        }
    }
    shouldComponentUpdate(nextPros, nextState){
        if(this.state.loading){
            return this.state.loading !== nextState.loading;
        }
        return true;
    }

    filterByGenre = (genreId) => {
        this.setState({genreId})
        //this.setState({genreId, tvResults: this.state.tvResults.filter(show => show.genre_ids && show.genre_ids.find(genre_id => genre_id === genreId))})
    }

    // 검색 엔터키가 눌려지면, 위의 state에서 searchTerm에 입력한 검색어를 넣고 loading을 true로 바꿔줄 것이다.
    
    render(){
        const {movieResults, tvResults, searchTerm, error, loading, genres, genreId} = this.state
        console.log("search Presenter Render");
        return (
            <SearchPresenter 
                movieResults={movieResults} 
                tvResults={tvResults}
                searchTerm={searchTerm}
                error={error}
                loading={loading}
                genres={genres}
                handleSubmit={this.handleSubmit}
                updateTerm={this.updateTerm}
                setGenre={this.filterByGenre}
                genreId={genreId}
            />
        )
    }
}