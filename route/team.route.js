const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth.middleware")
const {createTeam,getTeam} = require("../controller/team.controller")

//create route for team
router.post("/",auth,createTeam)
//get teams
router.get("/",auth,getTeam)
module.exports = router;