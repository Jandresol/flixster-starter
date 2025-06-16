import '../Modal/Modal.css';

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

function Modal({ show, onClose, title, rating, poster, releaseDate, overview, genres, runtime, trailerId }) {
    if (!show) {
        return null;
    }

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
                        {Array.isArray(genres) && genres.map((genre, index) => (
                        <span key={index} className="genre-pill">{genre}</span>
                        ))}
                        {overview && <p className="modal-overview">{overview}</p>}
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
