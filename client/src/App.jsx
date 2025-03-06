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
  const [playlistSongs, setPlaylistSongs] = useState([]);



  useEffect(() => {
    fetch("/api/playlists") 
      .then((response) => response.json()) 
      .then((data) => setPlaylists(data)) 
  }, []);

  useEffect(() => {
    fetch("/api/songs") 
      .then((response) => response.json()) 
      .then((data) => setSongs(data)) 
  }, []);

  useEffect(() => {
    fetch("/api/playlist_songs")
      .then((response) => response.json())
      .then((data) => setPlaylistSongs(data))
  }, [])


  
/* Song */
const addSong = song => {
  setSongs([...songs, song])
}

const deleteSong = song => {
  const sg =songs.find(sg => sg.id === song.id)
  let updatedSongs =songs.filter(s => s.id != sg.id)
  setSongs(updatedSongs)
}



/* Playlists */
const addPlaylist = playlist => {
  setPlaylists([...playlists, playlist])
}

const editPlaylist = updtplaylist => {
  const updatedPlaylists = playlists.map(playlist => updtplaylist.id === playlist.id ? updtplaylist : playlist)
  setPlaylists(updatedPlaylists)
}

const deletePlaylist = playlist => {
  const pl = playlists.find(pl => pl.id === playlist.id)
  let updatedPlaylists = playlists.filter(p => p.id != pl.id)
  setPlaylists(updatedPlaylists)
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


/* Playlists Songs */
const addPlaylistSong = playlistSong => {
  addPlaylistSongtoPlaylist(playlistSong)
  addPlaylistSongtoSong(playlistSong)
  addPlaylistSongtoState(playlistSong)
}

const deletePlaylistSong = playlistSong => {
  deletePlaylistSongForSong(playlistSong)
}

const updatePlaylistSong = updatedPlaylistSong => {
  setPlaylistSongs(playlistSongs.map(ps => ps.id === updatedPlaylistSong.id ? updatedPlaylistSong : ps));
}

const addPlaylistSongtoState = playlistSong => {
  setPlaylistSongs([...playlistSongs, playlistSong])
}

const addPlaylistSongtoSong = playlistSong => {
  const song = songs.find(song => song.id === playlistSong.song_id)
  let updatedPlaylistSongs = [...song.playlist_songs, playlistSong]
  
  const updatedSong = {
    ...song,
    playlist_songs: updatedPlaylistSongs
  }
  const updatedSongs = songs.map(song => {
    if(song.id === updatedSong.id) {
      return updatedSong
    } else {
      return song
    }
  })
  setSongs(updatedSongs)
}

const addPlaylistSongtoPlaylist = playlistSong => {
  const playlist = playlists.find(playlist => playlist.id === playlistSong.playlist_id)
  let updatedPlaylistSongs = [...playlist.playlist_songs, playlistSong]
  
  const updatedPlaylist = {
    ...playlist,
    playlist_songs: updatedPlaylistSongs
  }
  const updatedPlaylists = playlists.map(playlist => {
    if(playlist.id === updatedPlaylist.id) {
      return updatedPlaylist
    } else {
      return playlist
    }
  })
  setPlaylists(updatedPlaylists)
}

const deletePlaylistSongForSong = playlistSong => {
  const updatedPlaylistSongs = playlistSongs.filter(ps => ps.id !== playlistSong.id)
  setPlaylistSongs(updatedPlaylistSongs)
  updatedPlaylists(updatedPlaylistSongs)
  }


  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/playlist-form" element={<PlaylistForm addPlaylist={addPlaylist}/>} />
          <Route path="/playlists" element={<Playlists playlistSongs={playlistSongs} playlists={playlists} songs={songs} addSong={addSong} addPlaylistSong={addPlaylistSong} editPlaylist={editPlaylist} deletePlaylist={deletePlaylist} deletePlaylistSong={deletePlaylistSong} updatePlaylistSong={updatePlaylistSong}/>} />
          <Route path="/song-form" element={<SongForm addSong={addSong}/>} />
          <Route path="/songs" element={<Songs songs={songs} deleteSong={deleteSong}/>} />
        </Routes>
    </>
  )
}
export default App
