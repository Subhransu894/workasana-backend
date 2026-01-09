const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Owner = require("../models/owner.models")

//register auth
exports.register = async(req,res)=>{
    try {
        const {name , email , password}= req.body;
        if(!name || !email || !password){
            return res.status(404).json({message:"All fields are required"})
        }
        const existingUser = await Owner.findOne({email});
        if(existingUser){
            return res.status(404).json({message:"User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const owner = new Owner({
            name,email,password:hashedPassword
        })
        await owner.save();
        res.status(201).json({message:"Registration Successful. Please login"})
    } catch (error) {
        res.status(500).json({message:"Server Error"})
    }
}
//login
exports.login = async(req,res)=>{
    try {
        const {email , password}=req.body;
        if(!email || !password){
            return res.status(404).json({message:"All fields are required"})
        }
        const owner = await Owner.findOne({email})
        if(!owner || !owner.password){
            return res.status(404).json({message:"Invalid credntials"});
        }
        const isMatch = await bcrypt.compare(password,owner.password);
        if(!isMatch){
            return res.status(404).json({message:"Invalid credntials"});
        }
        const token = jwt.sign(
            {userId: owner._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )
        res.status(201).json({token})
    } catch (error) {
        res.status(500).json({message:"Server Error"})
    }
}