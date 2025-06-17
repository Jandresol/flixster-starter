import '../Modal/Modal.css';

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

function Modal({ id, show, onClose, title, rating, poster, releaseDate, overview, genres, runtime, trailerId, favorites, watched, handleFavorite, handleWatched }) {
    if (!show) {
        return null;
    }
    const getGenreColor = (genreName) => {
        const genreColors = {
            'Action': { bg: '#8b2635', border: '#ff6b7a', text: '#ffe6e8' },
            'Adventure': { bg: '#a0522d', border: '#ff8c42', text: '#fff4e6' },
            'Animation': { bg: '#8b7355', border: '#ffd700', text: '#fffacd' },
            'Comedy': { bg: '#556b2f', border: '#9acd32', text: '#f0fff0' },
            'Crime': { bg: '#2d5016', border: '#32cd32', text: '#e6ffe6' },
            'Documentary': { bg: '#2f4f4f', border: '#20b2aa', text: '#e0ffff' },
            'Drama': { bg: '#1e4d5b', border: '#00bfff', text: '#e0f7ff' },
            'Family': { bg: '#1e3a8a', border: '#3b82f6', text: '#dbeafe' },
            'Fantasy': { bg: '#4c1d95', border: '#8b5cf6', text: '#f3e8ff' },
            'History': { bg: '#831843', border: '#ec4899', text: '#fdf2f8' },
            'Horror': { bg: '#4a1810', border: '#dc2626', text: '#fee2e2' },
            'Music': { bg: '#0f766e', border: '#14b8a6', text: '#ccfbf1' },
            'Mystery': { bg: '#1e1b4b', border: '#6366f1', text: '#e0e7ff' },
            'Romance': { bg: '#881337', border: '#f43f5e', text: '#fdf2f8' },
            'Science Fiction': { bg: '#134e4a', border: '#06b6d4', text: '#cffafe' },
            'TV Movie': { bg: '#713f12', border: '#eab308', text: '#fefce8' },
            'Thriller': { bg: '#450a0a', border: '#ef4444', text: '#fee2e2' },
            'War': { bg: '#44403c', border: '#a3a3a3', text: '#f5f5f5' },
            'Western': { bg: '#78350f', border: '#f59e0b', text: '#fef3c7' }
        };
        
        // Return the specific color for the genre, or a default if not found
        return genreColors[genreName] || { bg: '#374151', border: '#9ca3af', text: '#f9fafb' };
    };


    return (
        <div className="Modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <div className="modal-header">
                    <img className="modal-image" src={poster} alt="movie poster" />
                    <div className="modal-header-text">
                        <h2 className="modal-title">{title}</h2>
                        <div className="header-details">
                            <p className="modal-rating">
                                <i className="fas fa-star icon"></i>
                                {Math.round(rating * 10) / 10}
                            </p>
                            {releaseDate && (
                                <p className="modal-release">
                                    <i className="fas fa-calendar-alt icon"></i>
                                    {formatDate(releaseDate)}
                                </p>
                            )}
                            {runtime && (
                            <p className="modal-runtime">
                                <i className="fas fa-clock icon"></i>
                                {runtime} min
                            </p>
                            )}

                        </div>
                    </div>

                </div>
                <div className="modal-body">
                    <div className="modal-text">
                        <div className="action-buttons">
                            <button 
                                className={`action-button favorite-button ${favorites ? 'active' : ''}`}
                                onClick={handleFavorite}
                            >
                                <i className={`${favorites ? 'fas' : 'far'} fa-heart`}></i>
                                {favorites ? 'Added to Favorites' : 'Add to Favorites'}
                            </button>
                            <button 
                                className={`action-button watched-button ${watched ? 'active' : ''}`}
                                onClick={handleWatched}
                            >
                                <i className={`${watched ? 'fas' : 'far'} fa-eye`}></i>
                                {watched ? 'Mark as Unwatched' : 'Mark as Watched'}
                            </button>
                        </div>

                        <div className="genre-container">
                        {genres.map((g, index) => {
                            const { bg, border, text } = getGenreColor(g.name);
                            return (
                                <span
                                    className="genre-pill"
                                    key={index}
                                    style={{
                                        backgroundColor: bg,
                                        borderColor: border,
                                        color: text,
                                    }}
                                >
                                    {g.name}
                                </span>
                            );
                        })}
                        </div>
                        {overview && 
                            <div className="modal-overview">
                                <h2>Overview</h2>
                                <p>{overview}
                                </p>
                            </div>
                        }
                    </div>
                    {trailerId ? (
                    <iframe
                        width="100%"
                        height="400"
                        src={`https://www.youtube.com/embed/${trailerId}`}
                        title="Trailer"
                        allowFullScreen
                    />
                    ) : (
                    <p>No trailer available</p>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Modal;
