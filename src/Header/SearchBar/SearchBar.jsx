import './SearchBar.css'

function SearchBar() {
    return (
        <form className = "SearchBar">
            <input type="Text" Placeholder="Search Here"></input>
            <button>
                Search
            </button>
        </form>
    );
}

export default SearchBar;
