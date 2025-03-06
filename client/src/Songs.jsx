import React from 'react'
import { Button, Card, CardContent, CardMedia, Typography, Grid, CircularProgress, Paper } from '@mui/material'
import { styled } from '@mui/system'

const PageContainer = styled('div')({
  backgroundColor: '#2e2e2e', // Darker grey background color
  minHeight: '100vh',
  padding: '20px',
});

const FormContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: '#8c8b8b', // Lighter grey background color
  padding: '20px',
  borderRadius: '10px',
  color: '#ffffff', // White text color
}));

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

const Image = styled(CardMedia)({
  height: '150px', // Set the desired height
  objectFit: 'contain', // Ensure the whole image fits within the area
  backgroundColor: 'red', // Set the background color to bright red
})

const SongCard = ({ song, deleteSong }) => {
  const handleDelete = async (e) => {
    e.preventDefault()
    if (song) {
      await fetch('/api/song/' + song.id, { method: "DELETE" })
      deleteSong(song)
    }
  }

  return (
    <Card>
      <Image image={song.album_cover} title="Album Cover" />
      <CardContent>
        <Typography variant="h6">{song.title}</Typography>
        <Typography variant="subtitle1">{song.artist}</Typography>
        <Typography variant="subtitle2">{song.album}</Typography>
        <CustomButton onClick={handleDelete}>Delete</CustomButton>
      </CardContent>
    </Card>
  )
}

const Songs = ({ songs, deleteSong }) => {
  return (
    <PageContainer>
      <FormContainer elevation={3}>
        <Typography variant="h4" component="h2" gutterBottom>
          🎵 Song List
        </Typography>
        {songs.length > 0 ? (
          <Grid container spacing={3}>
            {songs.map((song) => (
              <Grid item xs={12} sm={6} md={4} key={song.id}>
                <SongCard song={song} deleteSong={deleteSong} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" color="textSecondary">
            <CircularProgress size={24} /> Loading songs...
          </Typography>
        )}
      </FormContainer>
    </PageContainer>
  );
};

export default Songs;