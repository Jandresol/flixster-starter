import SearchBar from './SearchBar/SearchBar.jsx'
import Select from './Select/Select.jsx'

import './Header.css'

function Header(){
    return (
        <header>
            <h1>Flixster</h1>
            <div class="controls">
                <SearchBar/>
                <Select
                    options={[
                        { value: 'popular', label: 'Popular' },
                        { value: 'top_rated', label: 'Top Rated' },
                        { value: 'now_playing', label: 'Now Playing' },
                        { value: 'upcoming', label: 'Upcoming' }
                    ]}
                    onChange={(e) => console.log(e.target.value)}
                    value="popular"
                />
            </div>
        </header>
    );
}

export default Header;
