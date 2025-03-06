from config import app, db
from models import *

with app.app_context():
  print("Seeding Data...")

  print("Deleting...")
  Playlist.query.delete()
  Song.query.delete()
  PlaylistSong.query.delete()

  print("Creating Songs...")
  final = Song(title="The Final Countdown", artist="Europe", album_cover="https://upload.wikimedia.org/wikipedia/en/2/22/The_Final_Countdown_single.png")
  shake = Song(title="Shake it Off", artist="Mariah Carrey", album_cover="https://upload.wikimedia.org/wikipedia/en/5/5a/Mariah_Carey_The_Emancipation_of_Mimi.png")
  trooper = Song(title="The Trooper", artist="Iron Maiden", album_cover="https://i.scdn.co/image/ab67616d0000b2733f84d86dfac355e54c10627c")
  posty = Song(title="I Had Some Help", artist="Post Malone", album_cover="https://upload.wikimedia.org/wikipedia/en/8/83/Post_Malone_and_Morgan_Wallen_-_I_Had_Some_Help.png")
  kdot = Song(title="They Not Like Us", artist="Kendrick Lamar", album_cover="https://i.discogs.com/xlnTsZlo-z_2bQz1y3hjdnh6JJjAYA9FbkhkmplJ4zo/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTMxNDEw/ODg0LTE3MjI4OTEz/NDYtMjI2NC5qcGVn.jpeg")
  perez = Song(title="Sailor Song", artist="Gigi Perez", album_cover="https://upload.wikimedia.org/wikipedia/en/d/dd/Gigi_Perez_-_Sailor_Song.jpg")
  tate = Song(title="Revolving Door", artist="Tate McRae", album_cover="https://static.wixstatic.com/media/d2d710_edbc1179728747e89a70c20e68a4c4b5~mv2.png/v1/fill/w_568,h_574,al_c,lg_1,q_85,enc_avif,quality_auto/d2d710_edbc1179728747e89a70c20e68a4c4b5~mv2.png")

  db.session.add_all([final, shake, trooper, posty, kdot, perez, tate])
  db.session.commit()

  print("Creating Playlists")
  workout = Playlist(name="Workout Mix")
  motivate = Playlist(name="Motivation Mix")
  party = Playlist(name="Party Mix")
  sad = Playlist(name="Sad Mix")

  db.session.add_all([workout, motivate, party, sad])
  db.session.commit()

  print("Creating PlaylistSong...")
  workout_song_1 = PlaylistSong(vibe="Happy", song_id=trooper.id, playlist_id=workout.id)
  workout_song_2 =  PlaylistSong(vibe="Happy", song_id=final.id, playlist_id=workout.id)
  motivate_song_1 =  PlaylistSong(vibe="Sad", song_id=shake.id, playlist_id=motivate.id)
  motivate_song_2 =  PlaylistSong(vibe="Upset", song_id=final.id, playlist_id=motivate.id)
  party_song_1 = PlaylistSong(vibe="Energetic", song_id=kdot.id, playlist_id=party.id)
  party_song_2 = PlaylistSong(vibe="Energetic", song_id=final.id, playlist_id=party.id)
  sad_song_1 = PlaylistSong(vibe="Sad", song_id=shake.id, playlist_id=sad.id)
  sad_song_2 = PlaylistSong(vibe="Upset", song_id=posty.id, playlist_id=sad.id)
  sad_song_3 = PlaylistSong(vibe="Sad", song_id=tate.id, playlist_id=sad.id)

  db.session.add_all([workout_song_1, workout_song_2, motivate_song_1, motivate_song_2, party_song_1, party_song_2, sad_song_1, sad_song_2, sad_song_3])
  db.session.commit()

  print("Finished Seeding Data...")


  
