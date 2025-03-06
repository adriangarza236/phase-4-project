import React from 'react';
import PlaylistCard from './PlaylistCard';

const Playlists = ({ playlists, playlistSongs, deletePlaylistSong, deletePlaylist, editPlaylist, addPlaylistSong , songs, updatePlaylistSong}) => {


  const playlistsCards = playlists.map(playlist => <PlaylistCard key={playlist.id} updatePlaylistSong={updatePlaylistSong} playlistSongs={playlistSongs} playlist={playlist} songs={songs} addPlaylistSong={addPlaylistSong} editPlaylist={editPlaylist} deletePlaylist={deletePlaylist} deletePlaylistSong={deletePlaylistSong} />);

  return (
    <div>
      <h2>🎵 Playlists</h2>
        {playlistsCards}
    </div>
  );
};

export default Playlists;