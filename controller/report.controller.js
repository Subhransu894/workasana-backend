const Task = require("../models/task.models")
exports.getReportOverview = async(req,res)=>{
    try {
        const lastWeek = new Date()
        lastWeek.setDate(lastWeek.getDate()-7);

        //work done in lastweek
        const workDoneLastWeek = await Task.countDocuments({
            status:"Completed",
            updatedAt:{$gte: lastWeek}
        })
        
        //total panding works days
        const pendingTask = await Task.find({status:{$ne:"Completed"}})

        const pendingWorkDays = pendingTask.reduce((sum,task)=>sum + (sum + task.timeToComplete || 0),0);

        //task closes by team
        const taskClosedByTeam = await Task.aggregate([
            {$match:{status:"Completed"}},
            {
                $group:{
                    _id:"$team",
                    count:{$sum:1}
                }
            },
            {
                $lookup:{
                    from:"teams",
                    localField:"_id",
                    foreignField:"_id",
                    as:"team"
                }
            },
            {$unwind:"$team"},
            {
                $project:{
                    _id:0,
                    team:"$team.name",
                    count:1,
                }
            },
        ]);

        //task close by owners
        const taskCloseByOwners = await Task.aggregate([
            {$match:{status:"Completed"}},
            {$unwind:"$owners"},
            {
                $lookup:{
                    from:"owners",
                    localField:"owners",
                    foreignField:"_id",
                    as:"ownerInfo"
                }
            },
            {$unwind:"$ownerInfo"},
            {
                $group:{
                    _id:"$ownerInfo._id",
                    owner:{$first:"$ownerInfo.name"},
                    count:{$sum:1},
                }
            },
            {
                $project:{
                    _id:0,
                    owner:1,
                    count:1,
                }
            }
        ]);
        res.status(201).json({
            workDoneLastWeek,
            pendingWorkDays,
            taskClosedByTeam,
            taskCloseByOwners
        })
        
    } catch (error) {
        console.error("Report Error: ",error)
        res.status(500).json({message:"Failed to load report"})
    }
} 