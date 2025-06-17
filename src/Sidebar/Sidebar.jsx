import './Sidebar.css';

function Sidebar({ setView, toggleSidebar, sidebarShow }) {


    return (
        <div className={`Sidebar ${sidebarShow ? "show" : ""}`}>
            <div className="sidebar-top">
                <h1>Navigation</h1>
                <button className="sidebar-close" onClick={toggleSidebar}>×</button>

            </div>
                <ul>
                    <li onClick={() => setView('home')}>
                        <i className="fas fa-film"></i> Home
                    </li>
                    <li onClick={() => setView('favorites')}>
                        <i className="far fa-heart"></i> Favorites
                    </li>
                    <li onClick={() => setView('watched')}>
                        <i className="far fa-eye"></i> Watched
                    </li>
                </ul>
        </div>
    );
}

export default Sidebar;
