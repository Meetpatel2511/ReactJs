import React from 'react'
import Navbar from './Components/Navbar/Navbar'
// import './index.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'
import { useState } from 'react'
import SearchResults from './Pages/Search/search'

const App = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Navbar setSidebarOpen={setSidebarOpen} />
      <Routes>
        <Route path='/' element={< Home sidebarOpen={sidebarOpen} />} />
        <Route path='/video/:categoryId/:videoId' element={<Video />} />
        <Route path='/search/:query' element={<SearchResults />} /> {/* 👈 Add this */}
      </Routes>
    </>
  )
}

export default App