from flask import request, make_response
from config import app, db
from models import *

#PLAYLIST ROUTES
@app.route("/api/playlists", methods=["GET", "POST"])
def playlists():
  if request.method == "GET":
    playlists = [playlist.to_dict() for playlist in Playlist.query.all()]
    return make_response(
      playlists,
      200
      )
  elif request.method == "POST":
    data = request.get_json()
    name = data.get('name')
    playlist = Playlist(name=name)
    db.session.add(playlist)
    db.session.commit()
    return make_response(playlist.to_dict(), 201)

@app.route("/api/playlist/<int:id>", methods=["GET", "PATCH", "DELETE"])
def playlist(id):
  playlist = Playlist.query.filter(Playlist.id == id).first()
  if request.method == "GET":
    return make_response(
      playlist.to_dict(),
      200
    )
  elif request.method == "PATCH":
    data = request.get_json()
    for key in data.keys():
      if hasattr(playlist, key):
        setattr(playlist, key, data[key])
      db.session.add(playlist)
      db.session.commit()
      return make_response(
        playlist.to_dict(), 
        200
        )
  elif request.method == "DELETE":
    db.session.delete(playlist)
    db.session.commit()
    return make_response(
      {},
      204
    )
  

  #SONG ROUTES
@app.route("/api/songs", methods=["GET", "POST"])
def songs():
  if request.method == "GET":
    songs = [song.to_dict() for song in Song.query.all()]
    return make_response(
      songs,
      200
      )
  elif request.method == "POST":
    data = request.get_json()
    title = data.get('title')
    artist = data.get('artist')
    album_cover = data.get('album_cover')
    song = Song(title=title, artist=artist, album_cover=album_cover)
    db.session.add(song)
    db.session.commit()
    return make_response(song.to_dict(), 201)
  

@app.route("/api/song/<int:id>", methods=["GET", "PATCH", "DELETE"])
def song(id):
  song = Song.query.filter(Song.id == id).first()
  if request.method == "GET":
    return make_response(
      song.to_dict(),
      200
    )
  elif request.method == "PATCH":
    data = request.get_json()
    for key in data.keys():
      if hasattr(song, key):
        setattr(song, key, data[key])
    db.session.add(song)
    db.session.commit()
    return make_response(
      song.to_dict(), 
      200
      )
  elif request.method == "DELETE":
    db.session.delete(playlist)
    db.session.commit()
    return make_response(
      {},
      204
    )
  


if __name__ == "__main__":
  app.run(port=5555, debug=True)
