/**
 * Represents a movie object returned from the OMDB API.
 * 
 * @interface Movie
 * @property {string} Title - The title of the movie.
 * @property {string} Year - The release year of the movie.
 * @property {string} imdbID - The unique identifier for the movie on IMDb.
 * @property {string} Type - The type of the movie (e.g., movie, series).
 * @property {string} Poster - The URL of the movie's poster image.
 */
export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

/**
 * Represents the response structure for a movie search request to the OMDB API.
 * 
 * @interface MovieSearchResponse
 * @property {Movie[]} [Search] - An optional array of movies returned from the search.
 * @property {string} [totalResults] - The total number of results found for the search.
 * @property {string} Response - Indicates whether the request was successful or not.
 * @property {string} [Error] - An optional error message if the request failed.
 */
export interface MovieSearchResponse {
  Search?: Movie[];
  totalResults?: string;
  Response: "True" | "False";
  Error?: string;
}

/**
 * Represents the search parameters that can be used in a movie search request.
 * 
 * @interface SearchParams
 * @property {string | string[] | undefined} [q] - The search query for the movie title.
 * @property {string | string[] | undefined} [page] - The page number for pagination.
 * @property {string} [key] - A dynamic key that can hold additional search parameters.
 */
export interface SearchParams {
  [key: string]: string | string[] | undefined;
  q?: string;
  page?: string;
}

export interface Rating {
  Source: string
  Value: string
}

export interface MovieDetails {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: "True" | "False"
  Error?: string
}
