import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    {/* this is a comment that shouldnt be here */}
    <li><Link to="/">Home page</Link></li>
    <li><Link to="/playlist-form">Create A Playlist!</Link></li>
    <li><Link to="/playlists">Playlists!</Link></li>
    <li><Link to="/song-form">Add a song!</Link></li>
    <li><Link to="/songs">Songs!</Link></li>
    </>
  )
}

export default Navbar