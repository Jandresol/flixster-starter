import { useState, useEffect } from 'react';
import './App.css'
import Header from './Header/Header.jsx'
import MovieList from './MovieList/MovieList.jsx'
import LoadMore from './LoadMore/LoadMore.jsx'

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('popular');
  const [searchInput, setSearchInput] = useState('');

  // Fetch movies whenever page, searchQuery, or category changes
  useEffect(() => {
        console.log('useEffect triggered with:', { page, searchQuery, category });
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        let url;
        
        if (searchQuery.trim()) {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}&page=${page}`;
        } else {
          url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&page=${page}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch movie data');
        }
        const data = await response.json();
        
        if (page === 1) {
          setMovies(data.results);
        } else {
          setMovies(prev => [...prev, ...data.results]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, searchQuery, category]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    if (searchInput.trim() === '') {
      setSearchQuery('');
    }
    else{
      event.preventDefault();
      setSearchQuery(searchInput);
      setMovies([]);
      setPage(1);
    }
  };


  const clearSearch = () => {
    setSearchQuery('');
    setSearchInput('');
    setMovies([]);
    setPage(1);
    setCategory('popular');
  };

  const handleCategoryChange = (newCategory) => {
      setCategory(newCategory);
      setSearchQuery(''); 
      setMovies([]);
      setPage(1);
  };

  return (
    <div className="App">
      <Header
        searchQuery={searchQuery}
        searchInput={searchInput}
        handleSearchChange={handleSearchChange}
        clearSearch={clearSearch}
        category={category}
        handleSearchSubmit={handleSearchSubmit}
        handleCategoryChange={handleCategoryChange}
      />
      <main>
        {error && <div className="error">Error: {error}</div>}
        {movies.length === 0 && !loading && (
          <div className="no-results">
            No movies found for "{searchQuery}". Try a different search term.
          </div>
        )}
        <MovieList movies={movies} />
        {movies.length > 0 && !loading && (
          <LoadMore onClick={handleLoadMore} />
        )}
        {loading && <div className="loading">Loading...</div>}
      </main>
      <footer>© 2025 Flixster</footer>
    </div>
  )
}

export default App
