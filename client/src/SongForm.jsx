import * as yup from 'yup'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import React from 'react'

const SongForm = () => {
  const [formData, setFormData] = useState({
    albumCover: "",
    title: "",
    artist: "",
    album: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newSong = {
      title: formData.title,
      artist: formData.artist,
      album_cover: formData.albumCover,
      album: formData.album
    };

    fetch("http://127.0.0.1:5555/api/songs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSong)
    })
    .then((response) => response.json())
    .then((addedSong) => {
      console.log("Song added:", addedSong);
      setFormData({ albumCover: "", title: "", artist: "", album: ""});
    })
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Album Cover:
        <input 
          type="text" 
          name="albumCover"
          value={formData.albumCover}
          onChange={handleChange} 
        />
      </label>
      <label>
        Title:
        <input 
          type="text" 
          name="title"
          value={formData.title} 
          onChange={handleChange}
        />
      </label>
      <label>
        Artist:
        <input 
          type="text" 
          name="artist"
          value={formData.artist} 
          onChange={handleChange}
        />
      </label>
      <label>
        Album:
        <input 
          type="text" 
          name="album"
          value={formData.album} 
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add song!</button>
    </form>
  );
};

export default SongForm;