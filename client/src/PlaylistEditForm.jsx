import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Button } from '@mui/material'
import { styled } from '@mui/system'

const CustomButton = styled(Button)(({ theme }) => ({
  margin: '10px',
  padding: '10px 20px',
  borderRadius: '20px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
}))

function PlaylistEditForm({ playlist, handleEdit, editPlaylist }) {
  const initialValues = {
    name: ""
  }

  const validationSchema = yup.object({
    name: yup.string().required("Playlist must have a name").min(1)
  })

  const handleSubmit = (values) => {
    const newPlaylist = {
      name: values.name
    }
    fetch("/api/playlist/" + playlist.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlaylist)
    })
    .then((response) => response.json())
    .then((data) => {
      editPlaylist(data)
      handleEdit()
      formik.resetForm()
    })
  }

  const formik = useFormik({
    initialValues,
    validationSchema, 
    validateOnChange: false,
    onSubmit: handleSubmit
  })

  return (
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
        <CustomButton type="submit">Update Playlist</CustomButton>
        <p style={{color: "red"}}>{formik.errors.name}</p>
      </div>
    </form>
  )
}

export default PlaylistEditForm






