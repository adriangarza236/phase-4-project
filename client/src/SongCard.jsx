import React from 'react'

const SongCard = ({song, deleteSong}) => {


  const handleDelete = async (e) => {
    e.preventDefault()

    if (song) {
      await fetch('/api/song/' + song.id,  {method:"DELETE"})
      deleteSong(song)
    }
  }
    


  return (
    <div>
      <img src={song.album_cover} alt="Album Cover" />
      <h2>{song.title}</h2>
      <h2>{song.artist}</h2>
      <h3>{song.album}</h3>
      <button onClick={handleDelete}>Heyo</button>
    </div>
  )
}

export default SongCard