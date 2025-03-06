import React from 'react';
import PlaylistCard from './PlaylistCard';
import { Card, CardContent, Typography, Paper } from '@mui/material'; // Import Card components
import { styled } from '@mui/system'; // Import styled

const StyledCard = styled(Card)({
  margin: '20px',
  padding: '20px',
  borderRadius: '15px',
  backgroundColor: '#8c8b8b', // Darker background color
});

const StyledImage = styled('img')({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '10px',
});

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

const StyledTypography = styled(Typography)({
  color: '#ffffff', // White text color
});

const Playlists = ({ playlists, playlistSongs, deletePlaylistSong, deletePlaylist, editPlaylist, addPlaylistSong , songs, updatePlaylistSong}) => {

  const playlistsCards = playlists.map(playlist => (
    <StyledCard key={playlist.id}>
      <CardContent>
        <StyledTypography variant="h5" component="div">
          {playlist.name}
        </StyledTypography>
        {playlist.image && <StyledImage src={playlist.image} alt={playlist.name} />}
        <PlaylistCard 
          updatePlaylistSong={updatePlaylistSong} 
          playlistSongs={playlistSongs} 
          playlist={playlist} 
          songs={songs} 
          addPlaylistSong={addPlaylistSong} 
          editPlaylist={editPlaylist} 
          deletePlaylist={deletePlaylist} 
          deletePlaylistSong={deletePlaylistSong} 
        />
      </CardContent>
    </StyledCard>
  ));

  return (
    <PageContainer>
      <FormContainer elevation={3}>
        <Typography variant="h4" gutterBottom>🔥 Playlists</Typography> {/* Change text color to white */}
        {playlistsCards}
      </FormContainer>
    </PageContainer>
  );
};

export default Playlists;