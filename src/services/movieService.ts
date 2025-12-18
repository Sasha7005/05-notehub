import axios from "axios";
import type { Movie } from "../types/movie";

interface MovieHttpResponse {
  results: Movie[];
  total_pages: number;
}
const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

const SEARCH_URL = "/search/movie";

async function fetchMovies(
  query: string,
  page: number
): Promise<MovieHttpResponse> {
  const params = {
    query,
    page,
    include_adult: false,
    language: "en-US",
  };
  const { data } = await axiosInstance.get<MovieHttpResponse>(SEARCH_URL, {
    params,
  });
  return data;
}

export { fetchMovies };
