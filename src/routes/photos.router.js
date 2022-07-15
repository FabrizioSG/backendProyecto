//npm i http-status-codes
const express = require("express");
const auth = require( "../controllers/auth")

const router = express.Router();

const photosController = require("../controllers/photos.controller");

//POST usando mongoose
router.post("/", auth, photosController.addPhoto);

//GET
router.get("/:albumId", auth, photosController.getPhotosByAlbum);

//PUT
router.put("/:id", auth, photosController.updatePhoto);

//DELETE
router.delete("/:id", auth, photosController.deletePhoto);

module.exports = router;
