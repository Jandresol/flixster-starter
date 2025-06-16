import './Sidebar.css';

function Sidebar({ setView }) {
    return (
        <div className="Sidebar">
            <ul>
                <li onClick={() => setView('home')}>
                    <i className="fas fa-film"></i> Home
                </li>
                <li onClick={() => setView('watched')}>
                    <i className="far fa-heart"></i> Favorites
                </li>
                <li onClick={() => setView('favorited')}>
                    <i className="far fa-eye"></i> Watched
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
