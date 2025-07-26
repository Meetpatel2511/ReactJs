import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_KEY } from '../../../src/Data';
import moment from 'moment';
import { Link } from 'react-router-dom';
import '../Search/search.css'; 

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);

  const fetchSearchResults = async () => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${query}&type=video&key=${API_KEY}`
      );
      const data = await res.json();
      setResults(data.items || []);
    } catch (err) {
      console.error("Search fetch error", err);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [query]);

  return (
    <div className='search-results'>
      <h2>Search results for "{query}"</h2>
      <div className="results-grid">
        {results.map((item, i) => (
          <Link to={`/video/${item.snippet.categoryId || 0}/${item.id.videoId}`} key={i} className="search-card">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <h3>{item.snippet.title}</h3>
            <p>{item.snippet.channelTitle}</p>
            <small>{moment(item.snippet.publishedAt).fromNow()}</small>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
