const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth.middleware")
const {createProject,getProject,getProjectById,deleteProject} = require("../controller/project.controller")

//create a new project
router.post("/",auth,createProject);

//get project
router.get("/",auth,getProject);

//get by id
router.get("/:id",auth,getProjectById)

//delete by id
router.delete("/:id",auth,deleteProject)

module.exports = router;