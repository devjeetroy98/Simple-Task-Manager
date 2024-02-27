const express = require("express")
const router = express.Router()
const { registerUserController, loginUserController } = require("../controllers/authController")


// TODO : Login Function
router.post("/login", loginUserController)


// TODO : Register Function
router.post("/register", registerUserController)


module.exports = router;