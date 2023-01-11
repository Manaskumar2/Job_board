const applyModel = require('../models/jobApply')
const userModel = require('../models/userModel')
const jobModel =require('../models/jobPostingModel')
const validation = require('../validation/validation')
const aws = require('../AWS/S3')


const applyJob = async (req,res)=>{
    try {
        let userId = req.params.userId.trim()
    let data= req.body
    let files =req.files



    if(!validation.isvalidReqBody(data)) return res.status(400).send({status:false,message:"please provide details like email id and name"})

    let {name,email,jobId}=data

    if(!validation.isValidName(name))return res.status(400).send({status:false,message:"please provide name"})
    if(!validation.isValidEmail(email))return res.status(400).send({status:false,message:"in valid emailID please provide currect email address"})
    let apply = await applyModel.findOne({email:email})
    if(apply) return res.status(400).send({status:false,message:"THIS EMAIL ID IS ALREADY USED PLEASE PROVIDE ANOTHER EMAIL ID"})

    if(!validation.isValidObjectId(jobId)) return res.status(400).send({status:false,message:"please provide a valid JobId"})

    let jobDetails= await jobModel.findOne({_id:jobId,isDeleted:false})
    if(!jobDetails) return res.status(404).send({status:false,message:"No such Job found in this id"})

    let document={
             name: name,
             email: email,
            resume:files.resume,
            coverLetter:files.coverLetter,
            jobId:jobId
        


    }
    if (files && files.length > 0) {
        
            let uploadedFileURL = await aws.uploadFile(files[0])
            document.resume = uploadedFileURL
            let uploadedFileURL1 =await aws.uploadFile(files[1])
            document.coverLetter=uploadedFileURL1

    }
        else {
            return res.status(400).send({ status: false, message: "no resume and coverLetter present,provide resume " })
        }


        if (!validation.isValidObjectId(userId)) return res.status(400).send({ status: false, message: "Please provide Valid userId" })
         let userCheck = await userModel.findOne({ _id: userId })
        if (!userCheck) {
            return res.status(404).send({ status: false, message: "user id doesn't exist" })
        }
        
        document.userId=userId

        let savedata = await applyModel.create(document)
        return res.status(201).send({status:true,message:"sucessfull apply ",data:savedata})





    } catch (error){
        return res.status(500).send({status:false,error:error.message})
    }

}
const getApplyers = async (req,res) =>{
    try {
        let jobId = req.params.jobId
        let pageNo=req.body

        if(!jobId)return res.status(400).send({status:false,message:"please provide Jobid to get details of applyer"})
        if(!validation.isValidObjectId(jobId)) return res.status(400).send({status:false,message:"invalid jobId "})

         if(!pageNo){
                pageNo = 1
            }

        let appylers = await applyModel.find({jobId:jobId,isDeleted:false}).skip(5*(pageNo-1)).limit(5)
        if(!appylers) {return res.status(404).send({status:false,message:"No applyers apply for this job"})
    }else{
            return res.status(200).send({status:true , message:"successful get job details",data:appylers})
        }
    } catch (error) {
        return res.status(500).send({status:false,error:error.message})
        
    }
}
const updateAppliedJob = async (req, res) => {
    try {
        let appliedJobId = req.params.appliedJobId
        let data = req.body
        let files =req.files

    

        if (!validation.isvalidReqBody(data)) return res.status(400).send({ status: false, message: "provide the required details for updation" })
        let { name, email } = data
        if(name){

            if (!validation.isValidName(name)) return res.status(400).send({ status: false, message: "name is not valid" })
        }
        if(email){
            if (!validation.isValidEmail(email)) return res.status(400).send({ status: false, message: "email is not valid" })
            data.email = email.toLowerCase()
        }
    

let document={
             name: name,
             email: email,
            resume:files.resume,
            coverLetter:files.coverLetter
    }
    if (files.length) {

    if (files[0].fieldname == "resume") {
        
            let uploadedFileURL = await aws.uploadFile(files[0])
            document.resume = uploadedFileURL
    }else{
            let uploadedFileURL1 =await aws.uploadFile(files[1])
            document.coverLetter=uploadedFileURL1
    }
    if(files[1].fieldname == "coverLetter"){
        let uploadedFileURL1 =await aws.uploadFile(files[1])
            document.coverLetter=uploadedFileURL1

    }

    }

        const updateAppliedJob = await applyModel.findOneAndUpdate({_id:appliedJobId},{...document},{new:true})
        res.status(200).send({ status: true, message: "Successfully updated ",data:updateAppliedJob})

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}
const deleteAppliedJob = async(req,res)=> {
    try {
        let appliedJobId = req.params.appliedJobId

        let appliedJob = await applyModel.findOne({_id:appliedJobId,isDeleted:false})

        if(!appliedJob) {
            return res.status(200).send({ status: true, message: "No applied jobs found" })
        }

        await applyModel.findOneAndUpdate({_id:appliedJobId},{isDeleted:true})
        return res.status(200).send({ status: true, message: "successfully deleted" })
    }catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = {applyJob,getApplyers,updateAppliedJob,deleteAppliedJob}
