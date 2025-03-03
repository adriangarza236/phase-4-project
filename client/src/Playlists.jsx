import React, { useState, useEffect } from 'react'

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]); 

  useEffect(() => {
    fetch("http://127.0.0.1:5555/api/playlists") 
      .then((response) => response.json()) 
      .then((data) => setPlaylists(data)) 
  }, []);

  return (
    <div>
      <h2>🎵 Playlists</h2>
      <ul>
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <li key={playlist.id}>
              {playlist.name}
              <ul>
                {playlist.songs.map((song) => (
                  <li key={song.id}>
                    {song.title} - {song.artist} - <img src={song.album_cover} alt="Album Cover" />
                  </li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <p>Loading playlists...</p>
        )}
      </ul>
    </div>
  );
};

export default Playlists;