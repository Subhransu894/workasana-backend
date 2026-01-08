const express = require("express")
const router = express.Router()
const{getReportOverview}=require("../controller/report.controller")

router.get("/overview",getReportOverview)

module.exports = router;