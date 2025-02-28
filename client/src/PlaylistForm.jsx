import React, { useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
//#TODO formik and yup for form validation

function PlaylistForm() {
const [formData, setFormData] = useState({
  albumCover: "",
  title: "",
  album: "",
  vibe: "",
})
console.log(formData)



const handleChange = (event) => {
  const {name, value} = event.target
  setFormData({...formData, [name]: value})
}


const handleSubmit = (event) => {
  event.preventDefault();
    const newMovie = {
      title: formData.title,
      image: formData.image,
      director: formData.director,
      rating: formData.rating
    };
    handlePlaylistForm(newMovie);
    setFormData({ title: "", image: "", director: "", rating: "" });
  }


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Playlist Cover:
        <input 
        type="text" 
        name="image"
        value={formData.image}
        onChange={handleChange} />
      </label>
      <label>
        Title:
        <input 
        type="text" 
        name="title"
        value={formData.title} 
        onChange={handleChange}/>
      </label>
      
     
      <button type="submit">Create Playlist!</button>
    </form>
  )
}

export default PlaylistForm