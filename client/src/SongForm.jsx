import * as yup from 'yup'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import React from 'react'


// []TODO Add vibes to song form
// []TODO Take drilled props and convert to context
// []TODO Smile :)


const SongForm = () => {
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
        Album Cover:
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
      <label>
        Vibe:
        <input 
        type="text" 
        name="vibe"
        value={formData.title} 
        onChange={handleChange}/>
      </label>
      
     
      <button type="submit">Add song!</button>
    </form>
  )

}

export default SongForm