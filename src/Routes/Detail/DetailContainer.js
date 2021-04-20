import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "api";

export default class DetailContainer extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      secondIsFetch: false,
      secondResult: null,
      isMovie: pathname.includes("/movie/"),
    };
    this.timerId = null;
  }
  // props로 state를 변경시키고 싶을때
  // return 이 null 이 아니면 setState가 발생함
  // getDerivedStateFromProps(){

  // }

  delay = async (fn) => {
    this.timerId = setTimeout(() => {
      fn();
    }, 3000);
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history,
    } = this.props;
    // update 해주지 않을 거면 이처럼 선언해 줄 수 있다.
    //this.isMovie = this.props.pahtname.includes("/movie/")
    const { isMovie } = this.state;
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      return history.push("/");
    }
    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
      this.delay(async () => {
        let results = null;
        try {
          ({
            data: { results },
          } = await (this.state.isMovie
            ? moviesApi.getReviews(parsedId)
            : tvApi.getReviews(parsedId)));
        } catch (err) {
        } finally {
          this.setState({ secondIsFetch: true, secondResult: results });
        }
      });
    } catch (error) {
      this.setState({ error: "Can't find the page" });
    } finally {
      this.setState({ loading: false, result });
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timerId);
  }

  render() {
    const { result, error, loading, secondIsFetch, secondResult } = this.state;
    return (
      <DetailPresenter
        result={result}
        error={error}
        loading={loading}
        secondIsFetch={secondIsFetch}
        secondResult={secondResult}
      />
    );
  }
}
