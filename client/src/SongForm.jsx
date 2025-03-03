import * as yup from 'yup'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import React from 'react'

const SongForm = () => {
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

  const handleSubmit = (values) => {
    const newSong = {
      album_cover: values.album_cover,
      title: values.title,
      artist: values.artist,
      album: values.album
    }

    fetch("/api/songs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSong)
    })
    .then((response) => response.json())
    .then((addedSong) => {
      console.log("Song added:", addedSong);
      formik.resetForm();
    })
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit
  })

  return (
    <div>
    <h1>This DO be the song form.....stoooopid ahhhhhhhh song form</h1>
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
      <button type="submit">Add song!</button>
    </form>
    </div>
  );
};

export default SongForm;