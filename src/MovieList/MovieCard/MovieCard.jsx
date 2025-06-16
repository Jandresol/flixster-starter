// The movie's title
// The movie's poster image
// The movie's vote average
import './MovieCard.css'
import Modal from '../../Modal/Modal.jsx'
import { useState } from 'react';

function MovieCard({id, title, poster, rating, releaseDate, overview, genre, runtime }) {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModal, setShowModal] = useState(false);
    
    const handleCardClick = (title) => {
        // Open modal with movie details
        setShowModal(true);
        setSelectedMovie(title);
        try {
            const data = fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`);
        }
        catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    function handleClose() {
        // Close modal
        setShowModal(false);
        setSelectedMovie(null);
    }
    return (
    <>
        <div className = "MovieCard" onClick={() => handleCardClick(title)}>
            <img className="movie-image" src={poster} alt = "movie image"></img>
            <div className = "movie-text">
                <h3 className = "title">{title}</h3>
                <h4 className = "rating">Rating: {Math.round(rating * 10) / 10}</h4>
            </div>
        </div>
        <Modal 
            title={title} 
            show = {showModal} 
            onClose={handleClose}
            rating={rating}
            poster={poster}
            releaseDate={releaseDate}
            overview={overview}
            genre={genre}
            runtime={runtime}
        />
    </>
    )
}

export default MovieCard;


