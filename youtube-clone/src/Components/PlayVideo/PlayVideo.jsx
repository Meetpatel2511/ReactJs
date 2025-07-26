import React, { useState, useEffect } from 'react'
import '../PlayVideo/PlayVideo.css'
import Like from '../../assets/like.png'
import Dislike from '../../assets/dislike.png'
import Share from '../../assets/share.png'
import { LiaDownloadSolid } from "react-icons/lia";
import { API_KEY, Convertor } from '../../Data'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const PlayVideo = () => {

    const { videoId } = useParams();

    const [apiData, setApiData] = useState(null);
    const [channelData, setchannelData] = useState(null)
    const [commentsData, setCommentsData] = useState([])

    const fetchVideoData = async () => {
        //Fetch video data
        const videoDetails_url = ` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
        await fetch(videoDetails_url).then(res => res.json()).then(data => setApiData(data.items[0]))
    }

    const fetchotherdata = async () => {
        //fetch channel data
        const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        await fetch(channelData_url).then(res => res.json()).then(data => setchannelData(data.items[0]))

        //fetch comments data

        const comments_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=34&videoId=${videoId}&key=${API_KEY}`;
        await fetch(comments_url).then(res => res.json()).then(data => setCommentsData(data.items))
    }



    useEffect(() => {
        fetchVideoData();
    }, [videoId])

    useEffect(() => {
        if (apiData) {
            fetchotherdata();
        }
    }, [apiData])

    return (
        <div className='play-video'>
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}frameBorder="0"allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>


            <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>

            <div className="play-video-info">
                <p>2{apiData ? Convertor(apiData.statistics.viewcount) : "16k"} views &bull; {apiData ? moment(apiData.snippet.publishAt).fromNow() : ""} </p>
                <div>
                    <span><img src={Like} alt="" />{apiData ? Convertor(apiData.statistics.likeCount) : 200}</span>
                    <span><img src={Dislike} alt="" /> </span>
                    <span><img src={Share} alt="" />Share</span>
                    <span><LiaDownloadSolid />Download</span>
                </div>
            </div>
            <hr />
            <div className="publish">
                <img src={channelData ? channelData.snippet.thumbnails.default.url : "No Image"} alt="" />
                <div>
                    <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
                    <span>{channelData ? Convertor(channelData.statistics.subscriberCount) : "2M"} Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="video-decription">
                <p>{apiData ? apiData.snippet.description.slice(0, 250) : "Description Here"}</p>
                <hr />
                <h4>{apiData ? Convertor(apiData.statistics.commentCount) : 212} Comments</h4>

                 {commentsData.map((item,index)=>{
                    return(
                     <div key={index} className="comment">
                    <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                    <div>
                        <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>3 days ago</span></h3>
                        <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                        <div className="comment-reaction">
                            <img src={Like} alt="" />
                            <span>{Convertor(item.snippet.topLevelComment.snippet.likeCount)}</span>
                            <img src={Dislike} alt="" />
                            <span>6</span>
                        </div>
                    </div>
                </div>
                    )
                    })} 
            </div>
        </div>
    )
}

export default PlayVideo