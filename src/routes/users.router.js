//npm i http-status-codes
const express = require("express");

const router = express.Router();

const userController = require("../controllers/users.controller");

//SIGNUP
router.post("/signup", userController.signUp);

//LOGIN
router.post("/login", userController.login);

//PUT
//router.put("/:id", catController.updateCat);

//DELETE
//router.delete("/:id", catController.updateCat);

module.exports = router;
