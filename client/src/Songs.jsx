import React from 'react'
import SongCard from './SongCard';

const Songs = ({ songs, deleteSong }) => {




  return (
    <div>
      <h2>🎵 Song List</h2>
      <ul>
        {songs.length > 0 ? (
          songs.map((song) => (
            <li key={song.id}>
            <SongCard song={song} />
            <button onClick={() => deleteSong(song.id)}>Delete song :(</button>
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