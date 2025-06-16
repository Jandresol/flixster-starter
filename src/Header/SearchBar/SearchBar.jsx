import { useState } from 'react';
import './SearchBar.css';

function SearchBar({ searchQuery, searchInput, handleSearchChange, handleSearchSubmit, clearSearch }) {
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();   
        handleSearchSubmit(e); 
    };

    const handleClear = () => {
        clearSearch();
    };

    return (
        <form className={`search-bar ${isFocused ? 'focused' : ''}`} onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={searchInput} 
                onChange={handleSearchChange}
                onFocus={() => setIsFocused(true)}
                placeholder="Search movies..." 
                className="search-input"
            />
            <div className="SearchButtons">
                <button type="submit" className={`search-button ${searchQuery ? 'searched' : ''}`}>Search</button>
                {searchQuery && (
                <button 
                    type="button" 
                    className="clear-button"
                    onClick={handleClear}
                    aria-label="Clear search"
                >
                    Clear
                </button>
                )}
            </div>

        </form>
    );
}

export default SearchBar;