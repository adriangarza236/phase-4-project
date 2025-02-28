from config import app, db
from models import *

with app.app_context():
  print("Seeding Data...")

  print("Deleting...")
  Playlist.query.delete()
  Song.query.delete()
  PlaylistSong.query.delete()

  print("Creating Songs...")
  final = Song(title="The Final Countdown", artist="Europe", album_cover="https://i.redd.it/ayauqhqfr3u21.jpg")
  shake = Song(title="Shake it Off", artist="Mariah Carrey", album_cover="https://i.redd.it/ayauqhqfr3u21.jpg")
  trooper = Song(title="The Trooper", artist="Iron Maiden", album_cover="https://i.redd.it/ayauqhqfr3u21.jpg")

  db.session.add_all([final, shake, trooper])
  db.session.commit()

  print("Creating Playlists")
  workout = Playlist(name="Workout Mix")
  motivate = Playlist(name="Motivation Mix")


  db.session.add_all([workout, motivate])
  db.session.commit()

  print("Creating PlaylistSong...")
  workout_song_1 = PlaylistSong(vibe="epic", song_id=trooper.id, playlist_id=workout.id)
  workout_song_2 =  PlaylistSong(vibe="hype", song_id=final.id, playlist_id=workout.id)
  motivate_song_1 =  PlaylistSong(vibe="sad", song_id=shake.id, playlist_id=motivate.id)
  motivate_song_2 =  PlaylistSong(vibe="happy", song_id=final.id, playlist_id=motivate.id)

  db.session.add_all([workout_song_1, workout_song_2, motivate_song_1, motivate_song_2])
  db.session.commit()

  print("Finished Seeding Data...")


  
