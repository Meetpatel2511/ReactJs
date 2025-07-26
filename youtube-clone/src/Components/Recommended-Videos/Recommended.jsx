import React, { useState, useEffect } from 'react';
import '../Recommended-Videos/Recommended.css';
import { Link } from 'react-router-dom';
import { API_KEY, Convertor } from '../../Data';

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const relatedVideos_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=40&videoCategoryId=${categoryId}&key=${API_KEY}`;
    const res = await fetch(relatedVideos_url);
    const data = await res.json();
    setApiData(data.items || []);
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <div className='recommended-videos'>
      {apiData.map((item, index) => (
        <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-videos">
          <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
          <div className="video-info">
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p>{Convertor(item.statistics.viewCount)} Views</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recommended;
