import * as yup from 'yup'
import { useFormik } from 'formik'
import React from 'react'

const PlaylistSongCreateForm = ({ playlist, playlist_song, addPlaylistSong }) => {
  const initialValues = {
    vibe: 3,
    playlist_id: playlist.id,
    song_id: playlist_song.song_id
  }

  const validationSchema = yup.object({
    vibe: yup.number().required().integer().min(1).max(6)
  })

  const handleSubmit = async values => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    }
    const resp = await fetch("/api/playlists", options)
    const data = await resp.json()
    addPlaylistSong(data)
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
            <option value={"Happy"}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
        </select>
        <input type="submit" value="Submit" />
    </form>
  )
}

export default PlaylistSongCreateForm;