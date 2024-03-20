// queries/songs.js
const db = require("../db/dbConfig")
const getAllSongs = async (playlist_id) => {
  if(!playlist_id){
    const allSongs = await db.any('SELECT * FROM songs')
    return allSongs
  }else{
    try {
      const allSongs = await db.any('SELECT * FROM songs WHERE playlist_id=$1', playlist_id)
      return allSongs
    } catch (error) {
      return error
    }
  }
}

const getSong = async (id) => {
  try {
    const oneSong = await db.one('SELECT * FROM songs WHERE id=$1', id)
    return oneSong
  } catch (error) {
    return error
  }
}

const createSong = async (song) => {
    try {
      const newSong = await db.one(
        'INSERT INTO songs (name, artist, album, time, is_favorite) VALUES($1, $2, $3, $4, $5) RETURNING *',
        [song.name, song.artist, song.album, song.time, song.is_favorite]
      )
      return newSong
    } catch (error) {
      return error
    }
}
const updateSong = async (id, song) => {
    try {
      const updatedSong = await db.one(
        "UPDATE songs SET name=$1, artist=$2, album=$3, time=$4, is_favorite=$5, playlist_id=$6 where id=$7 RETURNING *",
        [song.name, song.artist, song.album, song.time, song.is_favorite, song.playlist_id, id]
      );
      return updatedSong;
    } catch (error) {
      return error;
    }
};

const deleteSong = async (id) => {
    try {
      const deletedSong = await db.one(
        "DELETE FROM songs WHERE id = $1 RETURNING *",
        id
      );
      return deletedSong;
    } catch (error) {
      return error;
    }
  };
module.exports = { getAllSongs, getSong, createSong, updateSong, deleteSong}