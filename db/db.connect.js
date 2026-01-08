const mongoose = require("mongoose")
require("dotenv").config()

const mongoURL = process.env.MONGODB;

const initializeDatabase=async()=>{
    await mongoose.connect(mongoURL).then(()=>{
        console.log("Connected to Database Successfully");
    }).catch((err)=>console.log("Error connect to DB",err))
}
module.exports = {initializeDatabase}