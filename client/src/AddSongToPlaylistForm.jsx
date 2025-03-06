import React from 'react'
import { useState } from 'react'
import { Button } from '@mui/material'
import { styled } from '@mui/system'

const CustomButton = styled(Button)(({ theme }) => ({
  margin: '10px',
  padding: '10px 20px',
  borderRadius: '20px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
}))

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
      <CustomButton onClick={handleAddSongToPlaylist}>Add to Playlist</CustomButton>
    </div>
  )
}

export default AddSongToPlaylistForm