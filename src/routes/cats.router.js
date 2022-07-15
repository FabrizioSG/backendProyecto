//npm i http-status-codes
const express = require("express");

const router = express.Router();

//se impiorta mongoose
const catController = require("../controllers/cats.controller");

//GET usando mongoose
router.get("/", catController.getCats);

//POST usando mongoose
router.post("/", catController.addCat);

//GET /cats/:id
router.get("/:id", catController.getCatById);

//PUT
router.put("/:id", catController.updateCat);

//DELETE
router.delete("/:id", catController.deleteCat);

module.exports = router;
