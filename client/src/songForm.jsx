import * as yup from 'yup'
import { useFormik } from 'formik'
import { headers } from '../../Globals'
import { useEffect } from 'react'
import React from 'react'



const songForm = () => {
    const initialValues = {
        title: "",
        artists: artists[0]?.id
      }
    
      useEffect(() => {
        if (artists.length > 0) {
          formik.setValues({...formik.values, artist_id: artists[0].id})
        }
      }, [artists])
    
      const validationSchema = yup.object({
        title: yup.string().required(),
        artist_id: yup.number().min(1).required()
      })
      
      const handleSubmit = async values => {
        // fetch to the backend
        // update state
        const options = {
          method: "POST",
          headers: headers,
          body: JSON.stringify(values)
        }
        const resp = await fetch("/api/games", options)
        const data = await resp.json()
        addGame(data)
      }
    
      const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnChange: false,
        onSubmit: handleSubmit
      })
    
      const artistOptions = artists.map(artist => <option key={ artist.id } value={artist.id}>{artist.name}</option>)
    
      return (
        <div>
          <h1>Create artist</h1>
          <hr />
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="title">Title: </label>
              <input type="text" name="title" id="title" value={formik.values.title} onChange={formik.handleChange} />
              <p style={{color: "red"}}>{formik.errors.title}</p>
            </div>
            <div>
              <label htmlFor="artist_id">Select artist: </label>
              <select name="artist_id" id="artist_id" value={formik.values.artist_id} onChange={formik.handleChange}>
                {artistOptions}
              </select>
              <p style={{color: "red"}}>{formik.errors.artist_id}</p>
            </div>
            <br />
            <input type="submit" value="Create Game" />
          </form>
        </div>
      )
    }

export default songForm