//npm i http-status-codes
const express = require("express");

const router = express.Router();

const albumsController = require("../controllers/albums.controller");

//POST usando mongoose
router.post("/", albumsController.addAlbum);

//GET /cats/:id
router.get("/:id", albumsController.getAlbumsByUser);

//PUT
router.put("/:id", albumsController.updateAlbum);

//DELETE
router.delete("/:id", albumsController.deleteAlbum);
module.exports = router;
