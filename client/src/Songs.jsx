import React from 'react'
import { useState, useEffect } from "react";

const Songs = ({ songs }) => {



// console.log(songs.playlist_songs.vibe)

  return (
    <div>
      <h2>🎵 Song List</h2>
      <ul>
        {songs.length > 0 ? (
          songs.map((song) => (
            <li key={song.id}>
              {song.title} - {song.artist} - <img src={song.album_cover} alt="Album Cover" />
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