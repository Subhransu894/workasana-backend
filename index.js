const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const corOptions ={
    origin:"*",
    credentials:true,
}

const {initializeDatabase} = require("./db/db.connect")

app.use(express.json())
app.use(cors(corOptions))

initializeDatabase()

//testing :- Working fine
// app.get("/",(req,res)=>{
//     res.send("Server is connected")
// })

//project route
const projectRoute = require("./route/project.route")
app.use("/api/projects",projectRoute)

//Team route
const teamRoute = require("./route/team.route")
app.use("/api/teams",teamRoute)

//user route
const ownerRoute = require("./route/owner.route");
app.use("/api/owners",ownerRoute)

//task route
const taskRoute = require("./route/task.route")
app.use("/api/tasks",taskRoute)

//report route
const reportRoute = require("./route/report.route")
app.use("/api/reports",reportRoute)

//register and login route
const authRoutes = require("./route/auth.route")
app.use("/api",authRoutes)

const PORT =3000;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})