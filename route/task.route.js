const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth.middleware")
const {createTask,getTask,getTaskById,updateTaskStatus,deleteTask} = require("../controller/task.controller")

//create task
router.post("/",auth,createTask)

//get task
router.get("/",auth,getTask)

//get task by id
router.get("/:id",auth,getTaskById)

//update status by id
router.put("/:id/status",auth,updateTaskStatus)

//delete task
router.delete("/:id",auth,deleteTask)
module.exports = router;