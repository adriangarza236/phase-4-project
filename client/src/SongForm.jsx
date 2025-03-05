import * as yup from 'yup'
import { useFormik } from 'formik'
import React from 'react'


const SongForm = ({ addSong }) => {
  const initialValues = {
    album_cover: "",
    title: "", 
    artist: "",
    album: ""
  }

  const validationSchema = yup.object({
    album_cover: yup.string().url("Must be A valid URL").required("Album Cover Required"),
    title: yup.string().required("A Title is required"),
    artist: yup.string().required("An Artist is required"),
    album: yup.string().required("An Album is required")
  })

  const handleSubmit = async values => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    }
    const resp = await fetch("/api/songs", options)
    const data = await resp.json()
    addSong(data)
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
    <h1>Add a song! (～￣▽￣)～</h1>
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>
          Album Cover:
          <input 
            type="text" 
            name="album_cover"
            value={formik.values.album_cover}
            onChange={formik.handleChange} 
          />
        </label>
        <p style={{color: "red"}}>{formik.errors.album_cover}</p>
      </div>
      <div>
        <label>
          Title:
          <input 
            type="text" 
            name="title"
            value={formik.values.title} 
            onChange={formik.handleChange}/>
        </label>
        <p style={{color: "red"}}>{formik.errors.title}</p>
      </div>
      <div>
        <label>
          Artist:
          <input 
            type="text" 
            name="artist"
            value={formik.values.artist} 
            onChange={formik.handleChange}/>
        </label>
        <p style={{color: "red"}}>{formik.errors.artist}</p>
      </div>
      <div>
        <label>
          Album:
          <input 
            type="text" 
            name="album"
            value={formik.values.album} 
            onChange={formik.handleChange}/>
        </label>
        <p style={{color: "red"}}>{formik.errors.album}</p>
      </div>
      <input type="submit" value="Create Song" />
    </form>
    </div>
  );
};

export default SongForm;