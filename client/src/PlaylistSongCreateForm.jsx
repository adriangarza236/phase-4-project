import * as yup from 'yup'
import { useFormik } from 'formik'
import React, { useState } from 'react'

const PlaylistSongCreateForm = ({ playlist, playlistSong, addPlaylistSong, toggleIsVibe }) => {
  const [selectedVibe, setSelectedVibe] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const initialValues = {
    vibe: playlistSong.vibe,
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
    addPlaylistSong(data)
    toggleIsVibe()
    setIsSubmitted(true) // Update the state to trigger a re-render
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit
  })

  return (
    <form onSubmit={formik.handleSubmit}>
        <label>Vibe: </label>
        <select name="vibe" id="vibe" value={formik.values.vibe} onChange={formik.handleChange}>
            <option value={"Happy"}>Happy</option>
            <option value={"Sad"}>Sad</option>
            <option value={"Upset"}>Upset</option>
            <option value={"Angsty"}>Angsty</option>
            <option value={"Angry"}>Angry</option>
            <option value={"Energetic"}>Energetic</option>
        </select>
        <input type="submit" value="Submit" />
    </form>
  )
}

export default PlaylistSongCreateForm;