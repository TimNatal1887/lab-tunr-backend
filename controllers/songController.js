const express = require("express");
const songs = express.Router({mergeParams:true});
const {getAllSongs, getSong, createSong, updateSong, deleteSong} = require("../queries/songs");
const { checkNameAndArtist, checkBoolean, checkTime } = require("../validations/checkSongs");
const { getPlaylist } = require("../queries/playlists.js")

songs.get('/', async (req, res) => {
  const {playlist_id} = req.params
  if(playlist_id){
    try{
      const allSongs = await getAllSongs(playlist_id)
      const playlist = await getPlaylist(playlist_id)
      const response = {...playlist, allSongs}
      res.json(response)
      

    } catch (error){
      res.status(500).json({error:"server error"})
    }
  }else{
    const allSongs = await getAllSongs()
    res.json(allSongs)
  }
})

songs.get('/:id', async (req, res) => {
  const { id } = req.params
  const song = await getSong(id)
  if (song) {
    res.json(song)
  } else {
    res.status(404).json({ error: 'not found' })
  }
})

songs.post('/', checkNameAndArtist, checkBoolean, checkTime, async (req, res) => {
  try {
    const song = await createSong(req.body)
    res.json(song)
  } catch (error) {
    res.status(400).json({ error: error })
  }
})

songs.put("/:id", checkNameAndArtist, checkBoolean, checkTime, async (req, res) => {
    const { id } = req.params;
    if(id){
      const updatedSong = await updateSong(id, req.body);
      res.status(200).json(updatedSong);
    }else{
      res.status(400).json({ error });
    }
  });

  songs.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedSong = await deleteSong(id);
    if (deletedSong.id) {
      res.status(200).json(deletedSong);
    } else {
      res.status(404).json("song not found");
    }
  });

module.exports = songs;