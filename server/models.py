from config import db, bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

class Playlist(db.Model, SerializerMixin):
    __tablename__ = "playlists"

    id = db.Column(db.Integer, primary_key=True) 
    name = db.Column(db.String, unique=True, nullable=False)

    def __repr__(self):
        return f'<Playlist id={self.id} name="{self.name}"'

class Song(db.Model, SerializerMixin):
    __tablename__ = "songs"

    id = db.Column(db.Integer, primary_key=True) 
    title = db.Column(db.String, unique=True) 
    artist = db.Column(db.String)
    album_cover = db.Column(db.String)

    def __repr__(self):
        return f'<Song id={self.id} title={self.title} artist={self.artist} album_cover={self.album_cover}'
    


class PlaylistSong(db.Model, SerializerMixin):
    __tablename__ = "playlist_songs"

    id = db.Column(db.Integer, primary_key=True)
    vibe = db.Column(db.String)
    playlist_id = db.Column(db.Integer, db.ForeignKey("playlists.id"))
    song_id = db.Column(db.Integer, db.ForeignKey("songs.id"))

    def __repr__(self):
        return f'<PlaylistSong id={self.id} vibe="{self.vibe}">'

     
    