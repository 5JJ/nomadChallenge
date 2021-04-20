import axios from "axios";

// 장점 axios 의  인스턴스를 설정해줄 수 있다.
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "b27ceb9d3348ca10aba9767c74b089f9",
    langauge: "en-US",
  },
});

// using relative url
export const moviesApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  search: (term) =>
    api.get("search/movie", {
      params: {
        query: encodeURIComponent(term),
      },
    }),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  getReviews: (id) => api.get(`movie/${id}/reviews`),
};

export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airlingToday: () => api.get("tv/airing_today"),
  search: (term) =>
    api.get("search/tv", {
      params: {
        query: encodeURIComponent(term),
      },
    }),
  showDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  getReviews: (id) => api.get(`tv/${id}/reviews`),
};

export const collectionApi = {
  getDetail: (id) => api.get(`collection/${id}`),
};

export const companyApi = {
  getDetail: (id) => api.get(`company/${id}`),
};

export const genreApi = {
  getMovieList: () => api.get(`genre/movie/list`),
  getTvList: () => api.get(`genre/tv/list`),
};

export default api;
