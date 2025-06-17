import SearchBar from './SearchBar/SearchBar.jsx'
import Select from './Select/Select.jsx'
import Sort from './Sort/Sort.jsx'

import './Header.css'

function Header({
    searchQuery,
    searchInput,
    handleSearchChange,
    handleSearchSubmit,
    clearSearch,
    category,
    handleCategoryChange,
    sort,
    handleSortChange,
    toggleSidebar
}){

    return (
        <header>
            <div className="header-top">
                <button
                    className="hamburger"
                    onClick={toggleSidebar}
                    aria-label="Toggle menu"
                >
                    ☰
                </button>
                <h1>Flixster</h1>
            </div>
            <div className="controls">
                <SearchBar
                    searchQuery={searchQuery}
                    searchInput={searchInput}
                    handleSearchChange={handleSearchChange}
                    clearSearch={clearSearch}
                    handleSearchSubmit={handleSearchSubmit}
                />
                <div className="dropdown-container">
                    <Sort
                        options={[
                            { value: 'default', label: 'Default' },
                            { value: 'title', label: 'Title (A-Z)' },
                            { value: 'date', label: 'Newest' },
                            { value: 'rating', label: 'Rating' },
                        ]}
                        onChange={(e) => handleSortChange(e.target.value)}
                        value={sort}
                    />

                    <Select
                        options={[
                            { value: 'popular', label: 'Popular' },
                            { value: 'top_rated', label: 'Top Rated' },
                            { value: 'now_playing', label: 'Now Playing' },
                            { value: 'upcoming', label: 'Upcoming' }
                        ]}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        value={category}
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;