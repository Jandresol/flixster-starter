// The movie's title
// The movie's poster image
// The movie's vote average
import './MovieCard.css'

function MovieCard({ index, title, poster, rating }) {
    return (
        <div className = "MovieCard">
            <img className="movie-image" src="" alt = "movie image"></img>
            <div class = "movie-text">
                <h3 class = "title">Movie Title</h3>
                <h4 class = "rating">Rating</h4>
            </div>
        </div>
    )
}

export default MovieCard;


