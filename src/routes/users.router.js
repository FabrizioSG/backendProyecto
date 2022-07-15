//npm i http-status-codes
const express = require("express");
const auth = require( "../controllers/auth")
const router = express.Router();

const userController = require("../controllers/users.controller");

//SIGNUP
router.post("/signup", userController.signUp);

//LOGIN
router.post("/login", userController.login);

//PUT
router.put("/", auth, userController.updateUser);

//DELETE
router.delete("/", auth, userController.deleteUser);

module.exports = router;
