import '../Modal/Modal.css';

function Modal({ show, onClose, title, rating, poster, releaseDate, overview, genre, runtime }) {
    if (!show) {
        return null;
    }

    return (
        <div className="Modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>

                <img className="modal-image" src={poster} alt="movie poster" />

                <div className="modal-text">
                    <h2 className="modal-title">{title}</h2>
                    <p className="modal-rating"><strong>Rating:</strong> {Math.round(rating * 10) / 10}</p>
                    {releaseDate && <p className="modal-release"><strong>Release Date:</strong> {releaseDate}</p>}
                    {genre && <p className="modal-genre"><strong>Genre:</strong> {genre}</p>}
                    {runtime && <p className="modal-runtime"><strong>Runtime:</strong> {runtime} min</p>}
                    {overview && <p className="modal-overview">{overview}</p>}
                </div>
            </div>
        </div>
    );
}

export default Modal;
