import React, { useEffect } from 'react';
import { useState } from 'react';
import PlaylistCard from './PlaylistCard';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]); 

  useEffect(() => {
    fetch("http://127.0.0.1:5555/api/playlists") 
      .then((response) => response.json()) 
      .then((data) => setPlaylists(data)) 
  }, []);

  const playlistsCards = playlists.map(playlist => <PlaylistCard key={playlist.id} playlist={playlist} />);

  return (
    <div>
      <h2>🎵 Playlists</h2>
        {playlistsCards}
    </div>
  );
};

export default Playlists;