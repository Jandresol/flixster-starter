import { useState, useEffect } from 'react'
import './App.css'
import Header from './Header/Header.jsx'
import MovieList from './MovieList/MovieList.jsx'

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiKey = import.meta.env.VITE_APP_API_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movie data');
        }
        const data = await response.json();
        setMovies(data.results); // movies are in `results` array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="App">
      <Header/>
      <main>
        <MovieList movies={movies} />
      </main>
      <footer>© 2025 Flixster</footer>
    </div>
  )
}

export default App
