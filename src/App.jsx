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
  const [sort, setSort] = useState('default');

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
          url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&include_adult=false&query=${encodeURIComponent(searchQuery)}&page=${page}`;
        } else {
          url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&include_adult=false&page=${page}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch movie data');
        }
        const data = await response.json();
        const sortedResults = sortMovies(data.results, sort);
        
        // Avoid bugs
        if (page === 1) {
          setMovies(sortedResults);
        } else {
          setMovies(prev => {
            const updatedMovies = [...prev];
            for (const movie of sortedResults) {
              if (!prev.find(m => m.id === movie.id)) {
                updatedMovies.push(movie);
              }
            }
            return updatedMovies;
          });
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

  const sortMovies = (movies, sort) => {
    switch (sort) {
      case 'default':
        return [...movies];
      case 'title':
        return [...movies].sort((a, b) => a.title.localeCompare(b.title));
      case 'date':
        return [...movies].sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
      case 'rating':
        return [...movies].sort((a, b) => b.vote_average - a.vote_average);
      default:
        return movies;
    }
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setMovies(prev => sortMovies([...prev], newSort));
  }

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
        sort={sort}
        handleSortChange={handleSortChange}
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
