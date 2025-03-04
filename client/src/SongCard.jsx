import React from 'react'





const SongCard = ({song}) => {
  return (
    <div>
      <img src={song.album_cover} alt="Album Cover" />
      <h2>{song.title}</h2>
      <h2>{song.artist}</h2>
      <h3>{song.album}</h3>
    </div>
  )
}

export default SongCard