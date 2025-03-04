import React, { useEffect } from 'react';
import { useState } from 'react';
import PlaylistCard from './PlaylistCard';

const Playlists = ({ playlists, deletePlaylistSong, deletePlaylist, editPlaylist }) => {


  const playlistsCards = playlists.map(playlist => <PlaylistCard key={playlist.id} playlist={playlist} editPlaylist={editPlaylist} deletePlaylist={deletePlaylist} deletePlaylistSong={deletePlaylistSong} />);

  return (
    <div>
      <h2>🎵 Playlists</h2>
        {playlistsCards}
    </div>
  );
};

export default Playlists;