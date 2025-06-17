import './Sidebar.css';

function Sidebar({ view, setView, toggleSidebar, sidebarShow }) {


    return (
        <div className={`Sidebar ${sidebarShow ? "show" : ""}`}>
            <div className="sidebar-top">
                <h1>Navigation</h1>
                <button className="sidebar-close" onClick={toggleSidebar}>×</button>

            </div>
            <ul>
                <li
                    className={view === 'home' ? 'active' : ''}
                    onClick={() => setView('home')}
                >
                    <i className="fas fa-film"></i> Home
                </li>
                <li
                    className={view === 'favorites' ? 'active' : ''}
                    onClick={() => setView('favorites')}
                >
                    <i className="far fa-heart"></i> Favorites
                </li>
                <li
                    className={view === 'watched' ? 'active' : ''}
                    onClick={() => setView('watched')}
                >
                    <i className="far fa-eye"></i> Watched
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
