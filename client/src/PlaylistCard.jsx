import React, { useState } from 'react'
import PlaylistEditForm from './PlaylistEditForm'
import PlaylistSongCreateForm from './PlaylistSongCreateForm'
import AddSongToPlaylistForm from './AddSongToPlaylistForm'

const PlaylistCard = ({ playlist, deletePlaylistSong, deletePlaylist, editPlaylist, addPlaylistSong, songs, playlistSongs, updatePlaylistSong }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isVibe, setIsVibe] = useState(false)
  const [isSong, setISong] = useState(false)
    console.log(playlistSongs)
    
  const toggleIsVibe = e => {
    if (e) {
      e.preventDefault()
    }
    setIsVibe(!isVibe)
  }

  const handleRemoveSong = async (e, playlistSong) => {
    e.preventDefault()
    if (playlistSong) {
      await fetch('/api/playlist_song/' + playlistSong.id, { method: "DELETE" })
      deletePlaylistSong(playlistSong)
    }
  }

  const handleDeletePlaylist = async (e) => {
    e.preventDefault()
    if (playlist) {
      await fetch('/api/playlist/' + playlist.id, { method: "DELETE" })
      deletePlaylist(playlist)
    }
  }

  const handleEdit = async (e) => {
    if (e) e.preventDefault()
    setIsEditing(!isEditing)
  }

  const handleVibeSubmit = (newPlaylistSong) => {
    addPlaylistSong(newPlaylistSong)
    setIsVibe(false)
  }

  const handleAddSong = async (e) => {
    if (e) e.preventDefault()
    setISong(!isSong)
  }

  const handleSongAdded = (newPlaylistSong) => {
    addPlaylistSong(newPlaylistSong)
    setISong(false)
  }

  return (
    <div>
      <h3>{playlist.name}</h3>
      <button onClick={handleAddSong}>Add Song</button>
      {isSong && <AddSongToPlaylistForm playlist={playlist} songs={songs} onSongAdded={handleSongAdded} />}
      <button onClick={handleDeletePlaylist}>Delete</button>
      <button onClick={handleEdit}>Edit</button>
      {isEditing && <PlaylistEditForm playlist={playlist} editPlaylist={editPlaylist} handleEdit={handleEdit} />}
      <ul>
        {playlistSongs
          .filter((playlistSong) => playlistSong.playlist_id === playlist.id)
          .map((playlistSong) => {
            const vibe = playlistSong.vibe ? playlistSong.vibe : <PlaylistSongCreateForm playlistSong={playlistSong} toggleIsVibe={toggleIsVibe} playlist={playlist} addPlaylistSong={handleVibeSubmit} updatePlaylistSong={updatePlaylistSong} />
            return (
              <li key={playlistSong.id}>
                {playlistSong.song.title} - {playlistSong.song.artist} - {vibe} - <img src={playlistSong.song.album_cover} alt="Album Cover" />
                <button onClick={(e) => handleRemoveSong(e, playlistSong)}>Remove</button>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default PlaylistCard