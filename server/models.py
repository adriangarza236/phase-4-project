from config import db, bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

class Playlist(db.Model, SerializerMixin):
    __tablename__ = "playlists"

    serialize_rules=(
        "-playlist_songs.playlist",
        "-playlist_songs.song",
        "-songs.playlist_songs",
        "-songs.playlists"
    )

    id = db.Column(db.Integer, primary_key=True) 
    name = db.Column(db.String, unique=True, nullable=False)

    playlist_songs = db.relationship("PlaylistSong", back_populates="playlist", cascade="all, delete-orphan")
    songs = db.relationship("Song", secondary="playlist_songs", back_populates="playlists")

    def __repr__(self):
        return f'<Playlist id={self.id} name="{self.name}"'

class Song(db.Model, SerializerMixin):
    __tablename__ = "songs"

    serialize_rules=(
        "-playlist_songs.playlist",
        "-playlist_songs.song",
        "-playlists.playlist_songs",
        "-playlists.songs"
    )

    id = db.Column(db.Integer, primary_key=True) 
    title = db.Column(db.String, unique=True) 
    artist = db.Column(db.String)
    album_cover = db.Column(db.String)

    playlist_songs = db.relationship("PlaylistSong", back_populates="song", cascade="all, delete-orphan")
    playlists = db.relationship("Playlist", secondary="playlist_songs", back_populates="songs")

    def __repr__(self):
        return f'<Song id={self.id} title={self.title} artist={self.artist} album_cover={self.album_cover}'
    


class PlaylistSong(db.Model, SerializerMixin):
    __tablename__ = "playlist_songs"

    serialize_rules=(
        "-playlist.playlist_songs",
        "-playlist.songs",
        "-song.playlist_songs",
        "-song.playlists"
    )

    id = db.Column(db.Integer, primary_key=True)
    vibe = db.Column(db.String)
    playlist_id = db.Column(db.Integer, db.ForeignKey("playlists.id"))
    song_id = db.Column(db.Integer, db.ForeignKey("songs.id"))

    playlist = db.relationship("Playlist", back_populates="playlist_songs")
    song = db.relationship("Song", back_populates="playlist_songs")

    def __repr__(self):
        return f'<PlaylistSong id={self.id} vibe="{self.vibe}">'

     
    