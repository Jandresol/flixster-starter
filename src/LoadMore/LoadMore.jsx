import './LoadMore.css'

function LoadMore({ onClick }) {
    return (
        <div className="LoadMore">
            <button className = "load-button" onClick={onClick}>Load More</button>
        </div>
    );
}

export default LoadMore;