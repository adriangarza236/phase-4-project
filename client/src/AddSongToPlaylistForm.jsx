import React from 'react'
import { useState } from 'react'


const AddSongToPlaylistForm = ({ playlist, songs, onSongAdded }) => {
    const [selectedSongId, setSelectedSongId] = useState(songs.length > 0 ? songs[0].id : '')

  const handleAddSongToPlaylist = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playlist_id : playlist.id,
        song_id: selectedSongId
      })
    }
    const resp = await fetch("/api/playlist_songs", options)
    const data = await resp.json()
    onSongAdded(data)
  }

  const handleSongSelect = (event) => {
    setSelectedSongId(event.target.value)
  }

  return (
    <div className="AddSongToPlaylist">
    <h3>Select a Song to Add</h3>

    <select id="songSelect" onChange={handleSongSelect} value={selectedSongId}>
      {songs.map(song => (
        <option key={song.id} value={song.id}>{song.title} - {song.artist}</option>
      ))}
    </select>

    <button onClick={handleAddSongToPlaylist} >Add to Playlist</button>
  </div>
)}

export default AddSongToPlaylistForm;