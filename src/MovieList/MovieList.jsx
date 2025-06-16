import './MovieList.css'
import MovieCard from './MovieCard/MovieCard.jsx'

function MovieList({ movies }) {
    return (
        <div className="MovieList">
            {movies.map((movie, index) => {
                return (
                    <MovieCard
                        key={index}
                        id={movie.id}
                        title={movie.title}
                        poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        rating={movie.vote_average}
                    />
                );
            })}
        </div>
    );
}

export default MovieList;
