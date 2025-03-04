import React, { useState } from 'react'
import PlaylistEditForm from './PlaylistEditForm'

const PlaylistCard = ({ playlist, deletePlaylistSong, deletePlaylist }) => {
    const [isEditing, setIsEditing] = useState(false)

    const playlist_song = playlist.playlist_songs.find(ps => ps.playlist_id == playlist.id)

    const handleRemoveSong = async (e) => {
        e.preventDefault()
        
        if (playlist_song) {
            await fetch('/api/playlist_song/' + playlist_song.id, { method: "DELETE" })
            deletePlaylistSong(playlist_song)
        }
    }
    const handleDeletePlaylist = async (e) => {
        e.preventDefault()

        if (playlist) {
            await fetch('/api/playlist/' + playlist.id, { method: "DELETE" })
            deletePlaylist(playlist)
        }
    }
    const handleEdit = async (e) => {
        e.preventDefault()
        setIsEditing(!false)
    }


    return (
        <div>
            <h3>{playlist.name}</h3>
            <button onClick={handleDeletePlaylist} >Delete</button>
            <button onClick={handleEdit} >Edit</button>
            {isEditing && <PlaylistEditForm />}
            <ul>
                {playlist.songs.map((song) => (
                    <li key={song.id}>
                        {song.title} - {song.artist} - {playlist_song?.vibe} - <img src={song.album_cover} alt="Album Cover" />
                        <button onClick={handleRemoveSong} >Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PlaylistCard