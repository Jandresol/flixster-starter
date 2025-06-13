import './MovieList.css'
import MovieCard from './MovieCard/MovieCard.jsx'

function MovieList(movies) {
    return(
        <div className = "MovieList">
            {
                movies.map((movie, index) => (
                    <MovieCard
                        key={index}
                        title={movie.title}
                        poster={movie.poster_path}
                        rating={movie.vote_average}
                    />
                ))
            }
        </div>
    );
}

export default MovieList;