import * as yup from 'yup'
import { useFormik } from 'formik'
import React from 'react'
import { MenuItem, Select, Typography } from '@mui/material'
import { styled } from '@mui/system'

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

const PlaylistSongCreateForm = ({ playlistSong, updatePlaylistSong }) => {

  const initialValues = {
    vibe: playlistSong.vibe || "Happy",
    playlist_id: playlistSong.playlist_id,
    song_id: playlistSong.song_id
  }

  const validationSchema = yup.object({
    vibe: yup.string().required()
  })

  const handleSubmit = async values => {
    const options = {
      method: playlistSong ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    }
    const url = playlistSong ? `/api/playlist_song/${playlistSong.id}` : "/api/playlist_songs"
    const resp = await fetch(url, options)
    const data = await resp.json()
    updatePlaylistSong(data)
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextContainer>
        <Typography variant="body2">Vibe:</Typography>
        <CustomSelect name="vibe" id="vibe" value={formik.values.vibe} onChange={formik.handleChange}>
          <MenuItem value="Happy">Happy</MenuItem>
          <MenuItem value="Sad">Sad</MenuItem>
          <MenuItem value="Upset">Upset</MenuItem>
          <MenuItem value="Angsty">Angsty</MenuItem>
          <MenuItem value="Angry">Angry</MenuItem>
          <MenuItem value="Energetic">Energetic</MenuItem>
        </CustomSelect>
        <input type="submit" value="Submit" />
      </TextContainer>
    </form>
  )
}

export default PlaylistSongCreateForm;