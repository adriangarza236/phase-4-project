import React from 'react'

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]); 

  useEffect(() => {
    fetch("http://127.0.0.1:5555/api/playlists") 
      .then((response) => response.json()) 
      .then((data) => setSongs(data)) 
  }, []);

  return (
    <div>
      <h2>🎵 Playlists</h2>
      <ul>
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <li key={playlist.id}>
              {playlist.title} - {playlist.songs} - {song.vibe}
            </li>
          ))
        ) : (
          <p>Loading songs...</p>
        )}
      </ul>
    </div>
  );
};


export default Playlists