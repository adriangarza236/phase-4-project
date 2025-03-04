import { useState, useEffect } from 'react'
import LandingPage from './LandingPage'
import Navbar from './Navbar'
import { Routes, Route, useNavigate} from 'react-router-dom'
import PlaylistForm from './PlaylistForm'
import SongForm from './SongForm'
import Playlists from './Playlists'
import Songs from './Songs'


function App() {
  const [songs, setSongs] = useState([]); 
  const [playlists, setPlaylists] = useState([]); 



  useEffect(() => {
    fetch("/api/playlists") 
      .then((response) => response.json()) 
      .then((data) => setPlaylists(data)) 
  }, []);

    useEffect(() => {
      fetch("/api/songs") 
        .then((response) => response.json()) 
        .then((data) => setSongs(data)) 
    }, [songs]);
  
  const deletePlaylistSong = playlistSong => {
    deletePlaylistSongForSong(playlistSong)
  }

  const deletePlaylistSongForSong = playlistSong => {
    const song = songs.find(song => song.id === playlistSong.song_id)
    let updatedPlaylistSong = song.playlist_songs.filter(ps => ps.id !== playlistSong.id)
    const updatedSong = {
      ...song, 
      playlist_song: updatedPlaylistSong
    }
    const updatedSongs = songs.map(song => {
      if(song.id === updatedSong.id) {
        return updatedSong
      } else {
        return song
      }
    })
    setSongs(updatedSongs)
    updatedPlaylists(song)
    }
  
  const updatedPlaylists = song => {
    const updatedPlaylists = playlists.map(pl => {
        if (pl.songs.some(s => s.id === song.id)) {
            return {
                ...pl,
                songs: pl.songs.filter(s => s.id !== song.id)
            }
        }
        return pl
    })
    setPlaylists(updatedPlaylists)
}

  const deletePlaylist = playlist => {
    const pl = playlists.find(pl => pl.id === playlist.id)
    let updatedPlaylists = playlists.filter(p => p.id != pl.id)
    setPlaylists(updatedPlaylists)
  }



  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/playlist-form" element={<PlaylistForm />} />
          <Route path="/playlists" element={<Playlists playlists={playlists} deletePlaylist={deletePlaylist} deletePlaylistSong={deletePlaylistSong}/>} />
          <Route path="/song-form" element={<SongForm />} />
          <Route path="/songs" element={<Songs songs={songs} />} />
        </Routes>
    </>
  )
}
export default App
