import * as yup from 'yup'
import { useFormik } from 'formik'
import React from 'react'

const PlaylistForm = ({ addPlaylist }) => {
  const initialValues = {
    name: ""
  }

  const validationSchema = yup.object({
    name: yup.string().required("Playlist must have a name")
  })

  const handleSubmit = async values => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    }
    const resp = await fetch("/api/playlists", options)
    const data = await resp.json()
    addPlaylist(data)
    formik.resetForm()
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit
  })

  return (
    <div>
      <h1>Create Playlist</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>
            Name:
            <input 
              type="text" 
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange} 
            />
          </label>
          <p style={{color: "red"}}>{formik.errors.name}</p>
        </div>
        <input type="submit" value="Create Playlist" />
      </form>
    </div>
  );
};

export default PlaylistForm;