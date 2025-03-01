import React from 'react'
import { useState, useEffect } from "react";

const Songs = () => {
  const [songs, setSongs] = useState([]); 

  useEffect(() => {
    fetch("http://127.0.0.1:5555/api/songs") 
      .then((response) => response.json()) 
      .then((data) => setSongs(data)) 
  }, []);

  return (
    <div>
      <h2>🎵 Song List</h2>
      <ul>
        {songs.length > 0 ? (
          songs.map((song) => (
            <li key={song.id}>
              {song.title} - {song.artist} - {song.playlist_songs.vibe} - <img src={song.album_cover} alt="Album Cover" />
            </li>
          ))
        ) : (
          <p>Loading songs...</p>
        )}
      </ul>
    </div>
  );
};

export default Songs;