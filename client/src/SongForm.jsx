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
    <PageContainer>
      <FormContainer elevation={3}>
        <Typography variant="h4" gutterBottom>Add a song! 😎🎵</Typography>
        <form onSubmit={formik.handleSubmit}>
          <CustomTextField
            label="Album Cover"
            variant="outlined"
            fullWidth
            name="album_cover"
            value={formik.values.album_cover}
            onChange={formik.handleChange}
            error={formik.touched.album_cover && Boolean(formik.errors.album_cover)}
            helperText={formik.touched.album_cover && formik.errors.album_cover}
          />
          <CustomTextField
            label="Title"
            variant="outlined"
            fullWidth
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <CustomTextField
            label="Artist"
            variant="outlined"
            fullWidth
            name="artist"
            value={formik.values.artist}
            onChange={formik.handleChange}
            error={formik.touched.artist && Boolean(formik.errors.artist)}
            helperText={formik.touched.artist && formik.errors.artist}
          />
          <CustomTextField
            label="Album"
            variant="outlined"
            fullWidth
            name="album"
            value={formik.values.album}
            onChange={formik.handleChange}
            error={formik.touched.album && Boolean(formik.errors.album)}
            helperText={formik.touched.album && formik.errors.album}
          />
          <CustomButton type="submit" variant="contained" fullWidth>Create Song</CustomButton>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default SongForm;