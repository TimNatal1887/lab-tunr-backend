
const db = require("../db/dbConfig")
const getAllPlaylists = async () => {
    try {
      const allPlaylists = await db.any('SELECT * FROM playlists')
      return allPlaylists
    } catch (error) {
      return error
    }
  }

const getPlaylist = async (id) => {
  try {
    const onePlaylist = await db.one('SELECT * FROM playlists WHERE id=$1', [id])
    return onePlaylist
  } catch (error) {
    return error
  }
}

const createPlaylist = async (playlist) => {
    try {
      const newPlaylist = await db.one(
        'INSERT INTO playlists (name, is_favorite) VALUES($1, $2) RETURNING *',
        [playlist.name, playlist.is_favorite]
      )
      return newPlaylist
    } catch (error) {
      return error
    }
}
const updatePlaylist = async (id, playlist) => {
  try {
    const updatedPlaylist = await db.one(
      "UPDATE playlists SET name=$1, is_favorite=$2 where id=$3 RETURNING *",
      [playlist.name, playlist.is_favorite, id]
    );
    return updatedPlaylist;
  } catch (error) {
    return error;
  }
};

const deletePlaylist = async (id) => {
  try {
    const deletedPlaylist = await db.one(
      "DELETE FROM playlists WHERE id = $1 RETURNING *",
      id
    );
    console.log(deletedPlaylist)
    return deletedPlaylist;
  } catch (error) {
    return error;
  }
};
module.exports = {getAllPlaylists, getPlaylist, createPlaylist, deletePlaylist, updatePlaylist}