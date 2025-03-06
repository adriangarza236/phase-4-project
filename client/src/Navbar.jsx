import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { styled } from '@mui/system'
import { useTheme } from '@mui/material/styles' // Import useTheme

const Navbar = () => {
  const theme = useTheme(); // Use the theme

  const CustomButton = styled(Button)({
    margin: '0 10px',
    padding: '10px 20px',
    borderRadius: '20px',
    backgroundColor: theme.palette.primary.main, // Use primary color from theme
    color: '#ffffff', // White text color
    '&:hover': {
      backgroundColor: theme.palette.primary.dark, // Use dark primary color from theme
    },
  })

  return (
    <AppBar position="static" style={{ backgroundColor: theme.palette.primary.main }}>
      <Toolbar>
        <CustomButton component={Link} to="/">
          <Typography variant="h6">Home🏠</Typography>
        </CustomButton>
        <CustomButton component={Link} to="/playlist-form">
          <Typography variant="h6">Create A Playlist🔥</Typography>
        </CustomButton>
        <CustomButton component={Link} to="/playlists">
          <Typography variant="h6">Playlists🔒</Typography>
        </CustomButton>
        <CustomButton component={Link} to="/song-form">
          <Typography variant="h6">Add a song🎵</Typography>
        </CustomButton>
        <CustomButton component={Link} to="/songs">
          <Typography variant="h6">Songs🎶</Typography>
        </CustomButton>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar