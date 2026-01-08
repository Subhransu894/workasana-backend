const Task = require("../models/task.models")
const Project = require("../models/project.models")
const Team = require("../models/team.models")
const Owner = require("../models/owner.models")

exports.createTask = async(req,res)=>{
    try{
        const {name,project,team,owners,tags,timeToComplete,status}=req.body;
        if(!name || !project || !team || !owners || !timeToComplete){
            return res.status(400).json({message:"name,proeject,team,owners,tags,timeToComplete,status required"})
        }
        const projectExists = await Project.findById(project);
        if(!projectExists){
            return res.status(404).json({message:"Project not found"})
        }

        const teamExists = await Team.findById(team)
        if(!teamExists){
            return res.status(404).json({message:"Team not found"})
        }

        const ownerCount = await Owner.countDocuments({
            _id:{$in:owners}
        });
        if(ownerCount !== owners.length){
            return res.status(404).json({message:"No owners found"})
        }

        const task = new Task({name,project,team,owners,tags,timeToComplete,status})
        await task.save()
        res.status(200).json({task})
    }
    catch(error){
        console.log("Error in create task",error);
        res.status(500).json({
            message:"Server Error",
            error:error.message,
        })
    }
}

//get task
exports.getTask = async(req,res)=>{
    try {
        const task = await Task.find()
                    .populate("project", "name")
                    .populate("team", "name")
                    .populate("owners","name email")
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({
            message:"Failed to fetch tasks",
            error:error.message
        })
    }
}

//get by id
exports.getTaskById = async(req,res)=>{
    try {
        const {id}=req.params
        const task = await Task.findById(id)
                            .populate("project","name")
                            .populate("team","name")
                            .populate("owners","name email")

        if(!task){
            return res.status(404).json({message:"Task not found"})
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({
            message:"Failed to fetch task by id"
        })
    }
}

//update task status
exports.updateTaskStatus = async(req,res)=>{
    try {
        const {id}=req.params;
        const {status}=req.body;
        if(!status){
            return res.status(400).json({message:"Status is required"})
        }
        const task = await Task.findByIdAndUpdate(id,{status},{new:true})
                                .populate("project","name")
                                .populate("team","name")
                                .populate("owners","name email")

        if(!task){
            return res.status(404).json({message:"Task is not found"})
        }
        res.status(200).json(task)
    } catch (error) {
        console.error("Error updating task status",error)
        res.status(500).json({message:"Failed to update task status",error:error.message})
    }
}

//delete task
exports.deleteTask = async(req,res)=>{
    try {
        const {id} = req.params
        const task = await Task.findByIdAndDelete(id)
        if(!task){
            return res.status(404).json({message:"Task is not found"})
        }
        res.status(201).json({message:"Task deleted successfully",task})
    } catch (error) {
        res.status(500).json({message:"Failed to delete task"})
    }
}