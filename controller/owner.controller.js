const Owner = require("../models/owner.models")

//create a user
exports.createUser=async(req,res)=>{
    try {
        const {name,email} = req.body
        if(!name || !email){
            res.status(400).json({message:"name and email are required"})
        }
        // check duplicate email
        const existingOwner = await Owner.findOne({email})
        if(existingOwner){
            return res.status(404).json({message:"Owner already exists"})
        }
        const owner = new Owner({name,email});
        await owner.save()
        res.status(201).json({owner})
    } catch (error) {
        console.log("Error in create User");
        res.status(500).json({message:"Server Error",error:error.message})
    }
}

//get owners
exports.getUser = async(req,res)=>{
    try {
        const owners = await Owner.find({},"name email");
        res.status(201).json({owners})
    } catch (error) {
        console.log("Error in get user")
        res.status(500).json({message:"Server Error",error:error.message})
    }
}