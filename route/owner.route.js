const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth.middleware")
const {createUser,getUser} = require("../controller/owner.controller")

router.post("/",auth,createUser)

//get owners
router.get("/",auth,getUser)

module.exports = router;