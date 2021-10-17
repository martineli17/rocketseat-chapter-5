import { MovieCard } from "./MovieCard";
import '../../styles/movieList.scss';

interface MovieCardListProps {
    movies: Array<{
        imdbID: string;
        Title: string;
        Poster: string;
        Ratings: Array<{
            Source: string;
            Value: string;
        }>;
        Rating: string;
        Runtime: string;
    }>;
}

export default function MovieCardList(props: MovieCardListProps) {
    return (
        <div className="movies-list">
           {props.movies.map(movie => (
                <MovieCard
                    key={movie.imdbID}
                    title={movie.Title}
                    poster={movie.Poster}
                    runtime={movie.Runtime}
                    rating={movie.Rating}
                />
            ))}
        </div>
    )
}