import React from 'react'

const PlaylistCard = ({ playlist }) => {
    let playlist_song, vibe;


    playlist_song = playlist.playlist_songs.find(ps => ps.playlist_id == playlist.id)
    console.log(playlist_song)
    return (
        <div>
            <h3>{playlist.name}</h3>
            <ul>
                {playlist.songs.map((song) => (
                    <li key={song.id}>
                        {song.title} - {song.artist} - {playlist_song.vibe}- <img src={song.album_cover} alt="Album Cover" />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PlaylistCard