import { useState, useEffect } from 'react';
import './App.css'
import Header from './Header/Header.jsx'
import MovieList from './MovieList/MovieList.jsx'
import LoadMore from './LoadMore/LoadMore.jsx'
import '@fortawesome/fontawesome-free/css/all.css';
import Sidebar from './Sidebar/Sidebar.jsx';
import SplashScreen from './SplashScreen/SplashScreen.jsx';
const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('popular');
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState('default');
  const [favorites, setFavorites] = useState(new Set());
  const [watched, setWatched] = useState(new Set());
  const [view, setView] = useState("home");
  const [sidebarShow, setSidebarShow] = useState(false);
  const [splash, setSplash] = useState(true);
  let filteredMovies = movies;

useEffect(() => {
  const timer = setTimeout(() => {
    setSplash(false);
  }, 2000); // 2-second splash screen

  return () => clearTimeout(timer);
}, []);


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


  const toggleFavorite = (id) => {
    setFavorites((prev) => {
        const updated = new Set(prev);
        if (updated.has(id)) {
          updated.delete(id)
        } 
        else {
          updated.add(id);
        }
        return updated;
    });
  }

  const toggleWatched = (id) => {
      setWatched((prev) => {
          const updated = new Set(prev);
          if (updated.has(id)) {
            updated.delete(id)
          } 
          else {
            updated.add(id);
          }
          return updated;
      });
  }

  const toggleSidebar = () => {
    setSidebarShow(prev => !prev);

  }

  return (
    <div className="App">
      <div className="app-container">
        {(splash || loading) && <SplashScreen />}
        <Sidebar
          view={view}
          setView={setView}
          toggleSidebar={toggleSidebar}
          sidebarShow={sidebarShow}
        />
      
        
        <div className="main-content">
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
            toggleSidebar={toggleSidebar}
          />
          
          <main className="content-area">
            <MovieList 
              movies={filteredMovies}
              favorites={favorites}
              watched={watched}
              toggleFavorite={toggleFavorite}
              toggleWatched={toggleWatched} 
            />
            {movies.length > 0 && !loading && view === "home" && (
              <LoadMore onClick={handleLoadMore} />
            )}
            {loading && <div className="loading">Loading...</div>}
            {/* {error && <div className="error">Error: {error}</div>} */}
            {movies.length === 0 && !loading && (
              <div className="no-results">
                No movies found for "{searchQuery}". Try a different search term.
              </div>
            )}

          </main>
          
          <footer className="app-footer">© 2025 Flixster</footer>
        </div>
      </div>
    </div>
  )
}

export default App
