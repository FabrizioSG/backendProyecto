//npm i http-status-codes
const express = require("express");
const auth = require( "../controllers/auth")

const router = express.Router();

const albumsController = require("../controllers/albums.controller");

//POST usando mongoose
router.post("/", auth, albumsController.addAlbum);

//GET 
router.get("/", auth, albumsController.getAlbumsByUser);

//PUT
router.put("/:id", auth, albumsController.updateAlbum);

//DELETE
router.delete("/:id", auth, albumsController.deleteAlbum);
module.exports = router;
