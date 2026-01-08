const Project = require("../models/project.models")

//create agent
exports.createProject=async(req,res)=>{
    try {
        const {name,description} = req.body
        if(!name || !description){
            res.status(400).json({message:"name and description are required"})
        }
        const project = new Project({name,description})
        await project.save()
        res.status(201).json(project)
    } catch (error) {
        console.log("Error in create project ",error)
        res.status(500).json({message:"Server Error",error:error.message})
    }
}

//get project
exports.getProject = async(req,res)=>{
    try {
        const project = await Project.find()
        res.status(200).json(project)
    } catch (error) {
        res.status(500).json({message:"Failed to fetch project",error:error.message})
    }
}
//get by id
exports.getProjectById = async(req,res)=>{
    try {
        const project = await Project.findById(req.params.id)
        if(!project){
            return res.status(400).json({message:"Project not found"})
        }
        res.json(project)
    } catch (error) {
        res.status(500).json({message:"Failed to fetch project",error:error.message})
    }
}
//delete project
exports.deleteProject = async(req,res)=>{
    try {
        const {id} = req.params;
        const project = await Project.findByIdAndDelete(id);
        if(!project){
            return res.status(400).json({message:"project not found"})
        }
        res.status(200).json({message:"Project deleted successfully",project})
    } catch (error) {
        res.status(500).json({message:"Failed to delete project"})
    }
}