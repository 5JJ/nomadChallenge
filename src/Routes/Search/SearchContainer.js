import React from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi, genreApi } from "api";

export default class SearchContainer extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    error: null,
    loading: false,
    genres: null,
    genreId: 0,
  };
  allGenres = {};
  async componentDidMount() {
    try {
      const {
        data: { genres: allTvGenres },
      } = await genreApi.getTvList();
      const {
        data: { genres: allMovieGenres },
      } = await genreApi.getMovieList();
      allTvGenres.forEach((genre) => {
        this.allGenres[genre.id.toString()] = genre.name;
      });
      allMovieGenres.forEach((genre) => {
        this.allGenres[genre.id.toString()] = genre.name;
      });
    } catch (error) {
    } finally {
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByTerm();
    }
  };

  updateTerm = (e) => {
    const {
      target: { value },
    } = e;
    this.setState({ searchTerm: value });
  };

  searchByTerm = async () => {
    const { searchTerm } = this.state;
    try {
      this.setState({ loading: true });
      const {
        data: { results: movieResults },
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);

      const genres = Array.from(
        new Set(
          [...movieResults, ...tvResults].reduce((acc, result) => {
            acc.push(...result.genre_ids);
            return acc;
          }, [])
        )
      ).map((id) => ({ id: id, name: this.allGenres[id.toString()] }));
      console.log(genres);

      this.setState({
        movieResults,
        tvResults,
        genres,
        genreId: 0,
      });
    } catch (error) {
      this.setState({ error: "Can't search" });
    } finally {
      this.setState({ loading: false });
    }
  };
  shouldComponentUpdate(nextPros, nextState) {
    if (this.state.loading) {
      return this.state.loading !== nextState.loading;
    }
    return true;
  }

  filterByGenre = (genreId) => {
    if (genreId === this.state.genreId) {
      this.setState({ genreId: 0 });
    } else {
      this.setState({ genreId });
    }
  };

  // ?????? ???????????? ????????????, ?????? state?????? searchTerm??? ????????? ???????????? ?????? loading??? true??? ????????? ?????????.

  render() {
    const {
      movieResults,
      tvResults,
      searchTerm,
      error,
      loading,
      genres,
      genreId,
    } = this.state;
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
    );
  }
}
