const Team = require("../models/team.models")
//create Team
exports.createTeam = async(req,res)=>{
    try {
        const {name,description}=req.body;
        if(!name || !description){
            return res.status(401).json({message:"name and description are required"})
        }
        const team = new Team({name,description})
        await team.save()
        res.status(201).json(team)
    } catch (error) {
        console.log("Error in create Team",error);
        res.status(500).json({message:"Server Error",error:error.message})
    }
}
//get all team
exports.getTeam = async(req,res)=>{
    try {
        const team = await Team.find()
        res.status(201).json(team)
    } catch (error) {
        res.status(500).json({message:"Failed to fetch teams",error:error.message})
    }
}