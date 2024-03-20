// Dependencies
const express = require("express");

const playlists = express.Router();

const songsController = require("./songController.js")

playlists.use("/:playlist_id/songs", songsController)

// Queries
const {
  getAllPlaylists,
  getPlaylist,
  createPlaylist,
  deletePlaylist,
  updatePlaylist
} = require("../queries/playlists");

// INDEX
playlists.get("/", async (req, res) => {
    const allPlaylists = await getAllPlaylists()
    if(allPlaylists[0]){
        res.status(200).json(allPlaylists)
    }else{
        res.status(500).json({error:"server error"})
    }
});

// SHOW
playlists.get("/:id", async (req, res) => {
    const { id } = req.params
    const onePlaylist = await getPlaylist(id)
    if(onePlaylist){
        res.json(onePlaylist)
    }else{
        res.status(404).json({error:"not found"})
    }
});

// CREATE

playlists.post("/", async (req, res) => {
    console.log(req.body)
  try{
    const newPlaylist = await createPlaylist(req.body)
    res.json(newPlaylist)
  }catch (error){
    res.status(400).json({error})
  }
});

playlists.put("/:id", async (req, res) => {
    const { id } = req.params;
    if(id){
      const updatedPlaylist = await updatePlaylist(id, req.body);
      res.status(200).json(updatedPlaylist);
    }else{
      res.status(400).json({ error });
    }
  });

playlists.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedPlaylist = await deletePlaylist(id);
    console.log(deletedPlaylist)
    if (deletedPlaylist.id) {
      res.status(200).json(deletedPlaylist);
    } else {
      res.status(404).json("playlist not found");
    }
  });

module.exports = playlists;
