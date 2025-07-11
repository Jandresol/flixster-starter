import './MovieCard.css'
import Modal from '../../Modal/Modal.jsx'
import { useState } from 'react';

function MovieCard({ id, title, poster, rating, favorites, watched, toggleFavorite, toggleWatched }) {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [trailerId, setTrailerId] = useState(null);

    const handleCardClick = async () => {
        setShowModal(true);
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`);
            const data = await response.json();
            setSelectedMovie(data);
            loadTrailer();
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    function handleClose() {
        setShowModal(false);
        setSelectedMovie(null);
    }
    
    function handleFavorite(e) {
        e.stopPropagation();
        toggleFavorite(id);
    }

    function handleWatched(e) {
        e.stopPropagation();
        toggleWatched(id);
        console.log("watched");
    }

    const loadTrailer = async () => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}`);
            const data = await res.json();

            const trailer = data.results.find(
            (video) => video.site === 'YouTube' && video.type === 'Trailer'
            );

            setTrailerId(trailer ? trailer.key : null);
        } catch (error) {
            console.error("Error fetching trailer", error);
            setTrailerId(null);
        }
    };

    return (
        <>
            <div className="MovieCard" onClick={handleCardClick}>
                <i 
                    className={`favorite-icon ${favorites ? 'fas' : 'far'} fa-heart`}
                    onClick={handleFavorite}
                    style={{ color: favorites ? '#e74c3c' : '#bdc3c7' }}
                ></i>
                <i 
                    className={`watched-icon ${watched ? 'fas' : 'far'} fa-eye `}
                    onClick={handleWatched}
                    style={{ color: watched ? '#16a34a' : '#bdc3c7' }}
                ></i>
                <img
                className="movie-image"
                src={poster}
                alt={title}
                onError={(e) => {
                    e.target.onerror = null; // prevents infinite loop
                    e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoWcWg0E8pSjBNi0TtiZsqu8uD2PAr_K11DA&s';
                }}
                />
                <div className="movie-text">
                    <h3 className="title">{title}</h3>
                    <h4 className="rating">
                        <i className="fas fa-star icon"></i>
                        {Math.round(rating * 10) / 10}
                    </h4>
                </div>
            </div>
            {selectedMovie && (
                <Modal
                    id={id}
                    title={title}
                    show={showModal}
                    onClose={handleClose}
                    rating={rating}
                    poster={poster}
                    releaseDate={selectedMovie.release_date}
                    overview={selectedMovie.overview}
                    genres={selectedMovie.genres}
                    runtime={selectedMovie.runtime}
                    trailerId={trailerId} 
                    favorites={favorites}
                    watched={watched} 
                    handleFavorite={handleFavorite} 
                    handleWatched={handleWatched}
                />
            )}
        </>
    );
}

export default MovieCard;
