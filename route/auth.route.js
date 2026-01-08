const express = require("express")
const router = express.Router()
const {register,login} = require("../controller/auth.controller")

//post for register
router.post("/register",register)

//post for login
router.post("/login",login)

module.exports = router;