import React, { useState } from 'react'
import PlaylistEditForm from './PlaylistEditForm'
import PlaylistSongCreateForm from './PlaylistSongCreateForm'

const PlaylistCard = ({ playlist, deletePlaylistSong, deletePlaylist, editPlaylist, addPlaylistSong }) => {
    const [isEditing, setIsEditing] = useState(false)

    const handleRemoveSong = async (e, playlist_song) => {
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
        if (e) e.preventDefault()
        setIsEditing(!isEditing)
    }

    return (
        <div>
            <h3>{playlist.name}</h3>
            <button onClick={handleDeletePlaylist} >Delete</button>
            <button onClick={handleEdit} >Edit</button>
            {isEditing && <PlaylistEditForm playlist={playlist} editPlaylist={editPlaylist} handleEdit={handleEdit} />}
            <ul>
                {playlist.songs.map((song) => {
                    const playlist_song = playlist.playlist_songs.find(ps => ps.song_id === song.id)
                    const vibe = playlist_song.vibe ? playlist_song.vibe : <PlaylistSongCreateForm playlist={playlist} addPlaylistSong={addPlaylistSong} playlist_song={playlist_song}/>
                    return (
                        <li key={song.id}>
                            {song.title} - {song.artist} - {vibe} - <img src={song.album_cover} alt="Album Cover" />
                            <button onClick={(e) => handleRemoveSong(e, playlist_song)} >Remove</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default PlaylistCard