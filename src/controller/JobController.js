const jobModel = require('../models/jobPostingModel')




const createJob = async(req,res)=>{
    try {
        let data = req.body


        let jobPosting = await jobModel.create(data)
        return res.status(201).send({status:true, message:"success",data:jobPosting})
        
    } catch (error) {
        return res.status(500).send({status:true,message:error.message})
    }
}

const getJobs = async(req,res)=>{
    try {
        let data = req.query


        let jobPosting = await jobModel.find(data)
        
        
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}

module.exports = {createJob}