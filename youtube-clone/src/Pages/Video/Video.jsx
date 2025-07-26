import './Video.css'
import PlayVideo from '../../Components/PlayVideo/PlayVideo'
import Recommended from '../../Components/Recommended-Videos/Recommended'
import { useParams } from 'react-router-dom'

const Video = () => {

  const{videoId,categoryId} = useParams();

  return (
    <div className='plays-video'>  
    <PlayVideo videoId={videoId}/>
    <Recommended categoryId={categoryId}/>
        
    </div>
  )
}

export default Video