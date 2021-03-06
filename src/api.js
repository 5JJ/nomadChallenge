import axios from "axios";

// 장점 axios 의  인스턴스를 설정해줄 수 있다.
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "b27ceb9d3348ca10aba9767c74b089f9",
    langauge: "en-US",
  },
});

// const dbPage = axios.create({
//   baseURL: "https://www.themoviedb.org/",
// });

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

export const authApi = {
  getRequestToken: () => api.get(`authentication/token/new`),
  // confirmToken: (request_token) =>
  //   dbPage.get(
  //     `authenticate/${request_token}?redirect_to=https://determined-nobel-abedf9.netlify.app/login`
  //   ),
  createSession: (request_token) =>
    api.post(`authentication/session/new`, {
      request_token,
    }),
  createSessionWithLogin: (username, password, request_token) =>
    api.post(`authentication/token/validate_with_login`, {
      username,
      password,
      request_token,
    }),
  deleteSession: (session_id) =>
    api.delete(`authentication/session`, { params: { session_id } }),
};

export const accountApi = {
  details: (session_id) =>
    api.get(`account`, {
      params: {
        session_id,
      },
    }),
  markAsFavorites: (
    session_id,
    account_id,
    { media_type, media_id, favorite }
  ) =>
    api.post(`account/${account_id}/favorite?session_id=${session_id}`, {
      media_type,
      media_id,
      favorite,
    }),
  myFavoriteShows: (session_id, account_id, params) =>
    api.get(`account/${account_id}/favorite/tv?session_id=${session_id}`, {
      params,
    }),
  myFavoriteMovies: (session_id, account_id, params) =>
    api.get(`account/${account_id}/favorite/movies?session_id=${session_id}`, {
      params,
    }),
};

export default api;
