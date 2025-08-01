import React, { useEffect, useState } from 'react'
import '../Feed/Feed.css'
import { Link } from 'react-router-dom';
import { API_KEY, Convertor } from '../../../src/Data'
import moment from 'moment';

const Feed = ({ category }) => {

    const [ data , setData] = useState([]);

    const fetchData = async () => {

        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=60&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`
        await fetch(videoList_url).then(response => response.json()).then(data => setData(data.items))
    }

    useEffect(() => {
        fetchData();
    }, [category])

    return (
        <div className="feed">
            {data.map((item, index) => {
                return (
                    <Link to={`video/${item.snippet.categoryId}/${item.id}`} key={index} className="card">
                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                        <h2> {item.snippet.title}</h2>
                        <h3>{item.snippet.channelTitle}</h3>
                        <p>{Convertor(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()} </p>
                    </Link>
                )
            })}

        </div>
    )
}

export default Feed