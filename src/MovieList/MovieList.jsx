import './MovieList.css'
import MovieCard from './MovieCard/MovieCard.jsx'
import genres from '../data/genres.js'

function MovieList({ movies }) {
    function getGenreNames(genreIds) {
        return genreIds
        .map((id) => genres.find((g) => g.id === id)?.name)
        .filter(Boolean)
        .join(', ');
    }

    return (
        <div className="MovieList">
            {movies.map((movie, index) => {
                const genreNames = movie.genre_ids.map(id => genres[id]);
                // Uncomment for debugging
                console.log(genres);

                return (
                    <MovieCard
                        key={index}
                        id={movie.id}
                        title={movie.title}
                        poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        rating={movie.vote_average}
                        releaseDate={movie.release_date}
                        overview={movie.overview}
                        genre={getGenreNames(movie.genre_ids)}
                        runtime={movie.runtime}
                    />
                );
            })}
        </div>
    );
}

export default MovieList;
