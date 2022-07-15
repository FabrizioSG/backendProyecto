//npm i http-status-codes
const express = require("express");

const router = express.Router();

const photosController = require("../controllers/photos.controller");

//POST usando mongoose
router.post("/", photosController.addPhoto);

//GET /cats/:userId
router.get("/:userId", photosController.getPhotosByAlbum);

//PUT
router.put("/:id", photosController.updatePhoto);

//DELETE
router.delete("/:id", photosController.deletePhoto);

module.exports = router;
