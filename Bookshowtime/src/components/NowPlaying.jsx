import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NowPlaying.css';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const API_KEY = '183d2275196b2af4ad934c17aaf69def';

const formatRuntime = (minutes) => {
  if (!minutes) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const NowPlaying = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const hollywoodRes = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
        );

        const bollywoodRes = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=hi&sort_by=popularity.desc&page=1`
        );

        const combinedMovies = [
          ...hollywoodRes.data.results.map((movie) => ({ ...movie, language: 'en' })),
          ...bollywoodRes.data.results.map((movie) => ({ ...movie, language: 'hi' }))
        ];

        const moviesWithRuntime = await Promise.all(
          combinedMovies.map(async (movie) => {
            try {
              const details = await axios.get(
                `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=en-US`
              );
              return {
                ...movie,
                runtime: details.data.runtime,
              };
            } catch {
              return movie;
            }
          })
        );

        setAllMovies(moviesWithRuntime);
        setFilteredMovies(moviesWithRuntime);
      } catch (err) {
        console.error('Error fetching movie data:', err);
      }
    };

    fetchMovies();
  }, []);

  const handleFilter = (type) => {
    setActiveFilter(type);
    if (type === 'all') {
      setFilteredMovies(allMovies);
    } else {
      setFilteredMovies(allMovies.filter((movie) => movie.language === type));
    }
  };

  return (
    <section className="now-playing-section">
      <h2 className="section-title">Now Playing →</h2>

      <div className="filter-buttons">
        <button onClick={() => handleFilter('all')} className={activeFilter === 'all' ? 'active' : ''}>All</button>
        <button onClick={() => handleFilter('en')} className={activeFilter === 'en' ? 'active' : ''}>Hollywood</button>
        <button onClick={() => handleFilter('hi')} className={activeFilter === 'hi' ? 'active' : ''}>Bollywood</button>
      </div>

      <div className="slider-wrapper">
        <div className="blur-left" />
        <div className="blur-right" />

        <div className="movie-scroll">
          {filteredMovies.map((movie, index) => (
            <div
              className="movie-card"
              key={`${movie.id}-${index}`}
              onClick={() => navigate(`/movie/${movie.id}`)} // ✅ Correct ID-based navigation
            >
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p className="genres">Rating: ⭐ {movie.vote_average}</p>
                <div className="meta">
                  <span>📅 {movie.release_date}</span>
                  <span>⏱ {formatRuntime(movie.runtime)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NowPlaying;
