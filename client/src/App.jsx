import { useState, useEffect } from 'react'
import LandingPage from './LandingPage'
import Navbar from './Navbar'
import { Routes, Route, useNavigate} from 'react-router-dom'
import PlaylistForm from './PlaylistForm'
import SongForm from './SongForm'
import Playlists from './Playlists'
import Songs from './Songs'


function App() {
  // const [movies, setMovies] = useState([])
  // const navigate = useNavigate()

  // useEffect(() => {
  //   fetch("http://localhost:3000/movies")
  //     .then(resp => resp.json())
  //     .then(data => setMovies(data))
  // }, [])

  // const handleAddMovie = (newMovie) => {
  //   fetch("http://localhost:3000/movies",{
  //     method: "POST",
  //     headers: { "Content-Type": "Application/json"},
  //     body: JSON.stringify(newMovie)})
    
  // .then((response) => response.json())
  // .then((addedMovie) => {
  //   setMovies((movies) => [...movies, addedMovie])
  //   navigate("movie/movie-list")
  // })};





  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/playlist-form" element={<PlaylistForm />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/song-form" element={<SongForm />} />
          <Route path="/songs" element={<Songs />} />
        </Routes>
    </>
  )
}

export default App
