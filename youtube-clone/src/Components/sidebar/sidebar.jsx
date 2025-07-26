import React from 'react'
import '../sidebar/siderbar.css'
import Home from '../../assets/home.png'
import Game from '../../assets/game_icon.png'
import automobiless from '../../assets/automobiles.png'
import Sport from '../../assets/sports.png'
import Entertaintment from '../../assets/entertainment.png'
import Tech from '../../assets/tech.png'
import Music from '../../assets/music.png'
import News from '../../assets/news.png'
import jack from '../../assets/jack.png'
import simon from '../../assets/simon.png'
import tom from '../../assets/tom.png'
import megan from '../../assets/megan.png'
import cameron from '../../assets/cameron.png'
import blog from '../../assets/blogs.png'

const Sidebar = ({sidebarOpen,category,setCategory}) => {
  return (
    <div className={`sidebar ${sidebarOpen? "" : "small-sidebar"}`}>
      <div className="shortcut-link">
        <div className={`side-link ${category===0? "active":""}`} onClick={()=>setCategory(0)}>
          <img src={Home} alt="" /><p>Home</p>
        </div>
        <div className={`side-link ${category===20? "active":""}`} onClick={()=>setCategory(20)}>
          <img src={Game} alt="" /><p>Gaming</p>
        </div>
        <div className={`side-link ${category===2? "active":""}`} onClick={()=>setCategory(2)}>
          <img src={automobiless} alt="" /><p>Travels</p>
        </div>
        <div className={`side-link ${category===17? "active":""}`} onClick={()=>setCategory(17)}>
          <img src={Sport} alt="" /><p>Sports</p>
        </div>
        <div className={`side-link ${category===23? "active":""}`} onClick={()=>setCategory(23)}>
          <img src={Entertaintment} alt="" /><p>Comedy</p>
        </div>
        <div className={`side-link ${category===28? "active":""}`} onClick={()=>setCategory(28)}>
          <img src={Tech} alt="" /><p>Tech</p>
        </div>
        <div className={`side-link ${category===10? "active":""}`} onClick={()=>setCategory(10)}>
          <img src={Music} alt="" /><p>Music</p>
        </div>
        <div className={`side-link ${category===22? "active":""}`} onClick={()=>setCategory(22)}>
          <img src={blog} alt="" /><p>Blogs</p>
        </div>
        <div className={`side-link ${category===25? "active":""}`} onClick={()=>setCategory(25)}>
          <img src={News} alt="" /><p>News</p>
        </div>
        <hr />
      </div>
      <div className="subscribed-members">
        <h3>Subsrcibed</h3>
        <div className="side-link">
          <img src={jack} alt="" /><p>Vishwraj</p>
        </div>
        <div className="side-link">
          <img src={simon} alt="" /><p>Sujan</p>
        </div>
        <div className="side-link">
          <img src={tom} alt="" /><p>Prem</p>
        </div>
        <div className="side-link">
          <img src={megan} alt="" /><p>Manasvi</p>
        </div>
        <div className="side-link">
          <img src={cameron} alt="" /><p>Anjal</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar