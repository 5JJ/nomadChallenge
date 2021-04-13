import React from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi } from "api";

export default class extends React.Component{
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm: "",
        error: null,
        loading: false,
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
            this.setState({movieResults, tvResults})
        }catch(error){
            this.setState({error: "Can't search"})
        }finally{
            this.setState({loading: false})
        }
    }

    // 검색 엔터키가 눌려지면, 위의 state에서 searchTerm에 입력한 검색어를 넣고 loading을 true로 바꿔줄 것이다.
    
    render(){
        const {movieResults, tvResults, searchTerm, error, loading} = this.state;
        return (
            <SearchPresenter 
                movieResults={movieResults} 
                tvResults={tvResults}
                searchTerm={searchTerm}
                error={error}
                loading={loading}
                handleSubmit={this.handleSubmit}
                updateTerm={this.updateTerm}
            />
        )
    }
}