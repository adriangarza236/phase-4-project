import * as yup from 'yup'
import { useFormik } from 'formik'
import React from 'react'
import { TextField, Button, Typography, Paper } from '@mui/material'
import { styled } from '@mui/system'

const PageContainer = styled('div')({
  backgroundColor: '#2e2e2e', // Darker grey background color
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
});

const FormContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: '#8c8b8b', // Lighter grey background color
  padding: '20px',
  borderRadius: '10px',
  color: '#ffffff', // White text color
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  marginBottom: '20px',
  '& .MuiInputBase-input': {
    color: '#000000', // Paper text color
  },
  '& .MuiInputLabel-root': {
    color: '#000000', // Paper text color
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#ffffff', // Paper background color
    '& fieldset': {
      borderColor: '#ffffff', // Paper border color
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main, // Primary color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main, // Primary color when focused
    },
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  marginTop: '20px',
  padding: '10px 20px',
  borderRadius: '20px',
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

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
    <PageContainer>
      <FormContainer elevation={3}>
        <Typography variant="h4" component="h2" gutterBottom>
          Create Playlist
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <CustomTextField
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
          />
          <CustomButton type="submit" variant="contained">
            Create Playlist
          </CustomButton>
        </form>
      </FormContainer>
    </PageContainer>
  )
}

export default PlaylistForm;