import React from 'react'
import { Typography, Paper } from '@mui/material'
import { styled } from '@mui/system'
import MusicNoteIcon from '@mui/icons-material/MusicNote'

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
  textAlign: 'center',
  fontFamily: '"Press Start 2P", cursive', // Apply the new font
}));

const IconContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '20px',
});

const ImageContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '20px',
});

const LandingPage = () => {
  return (
    <PageContainer>
      <FormContainer elevation={1}>
        <Typography variant="h3" component="h1" gutterBottom>
          🎶🔒🔥 WELCOME TO VIBE VAULT 🔥🔒🎶
        </Typography>
        <ImageContainer>
          <img src="/logo/music-note-icon-34250.png" alt="Vibe Vault Logo" style={{ maxWidth: '100%', height: 'auto' }} />
        </ImageContainer>
        <Typography variant="body1">
          Welcome to Vibe Vault! Here you can make playlists, add songs, and keep your vibes locked down. Here all your vibes are your own! I want to try to say vibes one more time just because, VIBES!🔥
        </Typography>
      </FormContainer>
    </PageContainer>
  )
}

export default LandingPage