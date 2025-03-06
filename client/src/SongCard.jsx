import React from 'react'
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
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

const Image = styled(CardMedia)({
  height: '150px', // Set the desired height
  objectFit: 'contain', // Ensure the whole image fits within the area
  backgroundColor: '#8c8b8b', // Set the background color to light grey
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

export default SongCard