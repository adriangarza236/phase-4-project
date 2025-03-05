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
    vibe: yup.string().required()
  })

  const handleSubmit = async values => {
    const options = {
      method: playlist_song ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    }
    const url = playlist_song ? `/api/playlist_song/${playlist_song.id}` : "/api/playlist_songs"
    const resp = await fetch(url, options)
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