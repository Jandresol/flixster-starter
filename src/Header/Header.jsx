import SearchBar from './SearchBar/SearchBar.jsx'
import Select from './Select/Select.jsx'

import './Header.css'

function Header({
    searchQuery,
    searchInput,
    handleSearchChange,
    handleSearchSubmit,
    clearSearch,
    category,
    handleCategoryChange,
    isSearching
}){
    return (
        <header>
            <h1>Flixster</h1>
            <div className="controls">
                <SearchBar
                    searchQuery={searchQuery}
                    searchInput={searchInput}
                    handleSearchChange={handleSearchChange}
                    clearSearch={clearSearch}
                    handleSearchSubmit={handleSearchSubmit}
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
                    disabled={isSearching}
                />
            </div>
        </header>
    );
}

export default Header;