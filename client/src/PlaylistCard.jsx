import React, { useState } from 'react'
import PlaylistEditForm from './PlaylistEditForm'
import PlaylistSongCreateForm from './PlaylistSongCreateForm'
import AddSongToPlaylistForm from './AddSongToPlaylistForm'
import { Button, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, MenuItem, Select } from '@mui/material'
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

const StyledImage = styled(Avatar)({
  width: '120px', // Increase width
  height: '120px', // Increase height
  objectFit: 'cover',
  borderRadius: '10px',
});

const HeaderContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start', // Align items to the left
});

const ButtonContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '20px', // Add some space between the title and buttons
});

const TextContainer = styled('div')({
  backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
  padding: '10px',
  borderRadius: '10px',
  color: '#ffffff', // White text color
});

const CustomSelect = styled(Select)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
  color: '#ffffff', // White text color
  '& .MuiSelect-icon': {
    color: '#ffffff', // White icon color
  },
  '& .MuiMenuItem-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background for menu items
    color: '#ffffff', // White text color for menu items
  },
}));

const PlaylistCard = ({ playlist, deletePlaylistSong, deletePlaylist, editPlaylist, addPlaylistSong, songs, playlistSongs, updatePlaylistSong }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isSong, setISong] = useState(false)
  
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
      <HeaderContainer>
        <ButtonContainer>
          <CustomButton onClick={handleAddSong}>Add Song</CustomButton>
          <CustomButton onClick={handleDeletePlaylist}>Delete</CustomButton>
          <CustomButton onClick={handleEdit}>Edit</CustomButton>
        </ButtonContainer>
      </HeaderContainer>
      {isSong && <AddSongToPlaylistForm playlist={playlist} songs={songs} onSongAdded={handleSongAdded} />}
      {isEditing && <PlaylistEditForm playlist={playlist} editPlaylist={editPlaylist} handleEdit={handleEdit} />}
      <List>
        {playlistSongs
          .filter((playlistSong) => playlistSong.playlist_id === playlist.id)
          .map((playlistSong) => {
            const vibe = playlistSong.vibe ? (
              <TextContainer>
                <Typography variant="body2">{playlistSong.vibe}</Typography>
              </TextContainer>
            ) : (
              <PlaylistSongCreateForm playlistSong={playlistSong} updatePlaylistSong={updatePlaylistSong} />
            );
            return (
              <ListItem key={playlistSong.id} alignItems="flex-start">
                <ListItemAvatar>
                  <StyledImage src={playlistSong.song.album_cover} alt="Album Cover" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <TextContainer>
                      <Typography variant="h6">{playlistSong.song.title}</Typography>
                      <Typography variant="body2">{playlistSong.song.artist}</Typography>
                    </TextContainer>
                  }
                  secondary={vibe}
                />
                <CustomButton onClick={(e) => handleRemoveSong(e, playlistSong)}>Remove</CustomButton>
              </ListItem>
            )
          })}
      </List>
    </div>
  )
}

export default PlaylistCard