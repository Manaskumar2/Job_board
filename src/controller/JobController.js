const userModel = require('../models/userModel')
const jobModel = require('../models/jobPostingModel')
const validation = require('../validation/validation')




const createJob = async(req,res)=>{
    try {
        let userId = req.params.userId.trim()
        let data = req.body
        



        if (!(validation.isvalidReqBody(data))) return res.status(400).send({ status: false, message: "Invalid request parameter,Please Provide" })
        let {title,skills,experience,description, email} = data

        if (!validation.isValidElem(title)) return res.status(400).send({ status: false, message: "Title is required" })
        //if (!validation.isValidName(title)) return res.status(400).send({ status: false, message: "please provide valid Title including characters only" })

        let checkTitle = await jobModel.findOne({ title: data.title });
        if (checkTitle) return res.status(409).send({ status: false, message: "title already exist" })

        
        if (!description) return res.status(400).send({ status: false, message: "description is required" })
        if (!validation.isValidElem(description)) return res.status(400).send({ status: false, message: "description is required" })


          if (!skills) return res.status(400)({ status: false, message: "skill  is required " })
        let skill1 = ["JAVA", "JAVASCRIPT", "MONGODB", "NODEJS", "EXPRESS", "REACT", "AWS"]
        let skill2 = skills.split(",").map((x) => x.trim().toUpperCase())
        console.log(skill2)
        for (let i = 0; i < skill2.length; i++) {
            console.log(skill1.includes(skill2[i]))
            if (!(skill1.includes(skill2[i]))) {
                return res.status(400).send({ status: false, message: "Skills Should One of these-'Java', 'Javascript', 'nodeJs', 'Express', 'MongoDB', 'AWS' " })
            }
        }
        data.skills = skill2

        if(!email) return res.status(400).send({status:false,message:"email is require"})
        if(!validation.isValidEmail(email)) return res.status(400).send({status:false,message:"please provide a valid email id"})

        if(!experience) return res.status(400).send({status:false,message:"experiance fild most be filled"})
        if(!validation.experience(experience)) return res.status(400).send({status:false, message:"please provide experience in bettween 0-20"})

  let userCheck = await userModel.findOne({ _id: userId })
        if (!userCheck) {
            return res.status(404).send({ status: false, message: "user id doesn't exist" })
        }
        // (req.token.userId != userId) return res.status(403).send({ status: false, message: "you are unauthorized" })
 data.userId=userId






        let jobPosting = await jobModel.create(data)
        return res.status(201).send({status:true, message:"success",data:jobPosting})
        
    } catch (error) {
        return res.status(500).send({status:true,message:error.message})
    }
}

const getJobs = async(req,res)=>{
    try {
        let data = req.query
        let {title,skill,experience,pageNo} = data
        let document={
            isDeleted:false
        }
         if (title) {
            if (!validation.isValidName(title)) {
                return res.status(400).send({ status: false, message: 'title  is not in correct format' })
            } else {
                document.title =title
            }
        }
            if (skill) {
            if (!validation.isValidElem(skill) || (["Java", "Javascript", "MongoDB", "NodeJs", "Express", "React", "AWS"].indexOf(size) == -1)) {
                return res.status(400).send({ status: false, message: 'skills should be in "Java", "Javascript", "MongoDB", "NodeJs", "Express", "React", "AWS" ' })
            } else {
                document.skills = skill
            }
        }
         if(experience){
                if(!validation.experience(experience)){
                    return res.status(400).send({ status: false, message: 'please Enter experience in between "0-20"' })

                }else{
                    document.experience = experience
                }

            }
            if(!pageNo){
                pageNo = 1
            }

        let jobPosting = await jobModel.find(document).select({title:1,description:1,skills:1,experience:1, email:1}).skip(5*(pageNo-1)).limit(5)

        return res.status(200).send({status:true , message:"successful get job details",data:jobPosting})
        
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}
const getJobById = async (req,res)=>{
 try {

    let userId= req.params.userId


    if (!userId) { return res.status(400).send({ status: false, message: "please give employer Id" }) }
    if (req.token.userId != userId) return res.status(403).send({ status: false, message: "you are unauthorized" })

    if(!validation.isValidObjectId(userId)){return res.status(400).send({status:false,message:"invalid employer id"})}
        const findId = await jobModel.find({ userId:userId, isDeleted: false }).select({title:1,description:1,skills:1,experience:1, email:1})


        if (!findId) { return res.status(404).send({ status: false, message: "No job posted By this Recruiter" }) }
        else{
            return res.status(200).send({status:true , message:"successful get job details",data:findId})
        }

    
 } catch (error) {

      return res.status(500).send({status:false,message:error.message})
 }


}
const updateJob = async (req,res)=>{
try {
    let data=req.body

  let jobId = req.params.jobId

   if (!(validation.isvalidReqBody(data))) return res.status(400).send({ status: false, message: "Invalid request parameter,Please Provide" })
        let {title,skills,experience,description, email} = data
        if(title){

        if (!validation.isValidElem(title)) return res.status(400).send({ status: false, message: "Title is required" })
        //if (!validation.isValidName(title)) return res.status(400).send({ status: false, message: "please provide valid Title including characters only" })
        }
        if(description){
        
        if (!description) return res.status(400).send({ status: false, message: "description is required" })
        if (!validation.isValidElem(description)) return res.status(400).send({ status: false, message: "description is required" })
        }
        if(skills){
        
          if (!skills) return res.status(400)({ status: false, message: "skill  is required " })
        let skill1 = ["JAVA", "JAVASCRIPT", "MONGODB", "NODEJS", "EXPRESS", "REACT", "AWS"]
        let skill2 = skills.split(",").map((x) => x.trim().toUpperCase())
        console.log(skill2)
        for (let i = 0; i < skill2.length; i++) {
            if (!(skill1.includes(skill2[i]))) {
                return res.status(400).send({ status: false, message: "Skills Should One of these-'Java', 'Javascript', 'nodeJs', 'Express', 'MongoDB', 'AWS' " })
            }
        }
        data.skills = skill2
    }
    if(email){

        if(!email) return res.status(400).send({status:false,message:"email is require"})
        if(!validation.isValidEmail(email)) return res.status(400).send({status:false,message:"please provide a valid email id"})
    }
    if(experience){

        if(!experience) return res.status(400).send({status:false,message:"experiance fild most be filled"})
        if(!validation.experience(experience)) return res.status(400).send({status:false, message:"please provide experience in bettween 0-20"})
    }


        if(!jobId) { return res.status(400).send({ status: false, message: "please provide job ID" }) }

        let findJob = await jobModel.findOne({_id:jobId,isDeleted:false})
        
        if(!findJob) {
            return res.status(200).send({ status: true, message: "No job found" })
        }
        if(req.token.userId!=findJob.userId)return res.send(403).send({status:false,message:"you are unauthorized"})


        const updatedJob = await jobModel.findOneAndUpdate({_id:jobId},{...data},{new:true})
        res.status(200).send({ status: true, message: "Successfully updated ",data:updatedJob})




} catch (error) {
    return res.status(500).send({status:false,message:error.message})
}



}


const deleteJob = async(req,res)=> {
    try {
        let jobId = req.params.jobId

        if(!jobId) { return res.status(400).send({ status: false, message: "please provide job ID" }) }

        let findJob = await jobModel.findOne({_id:jobId,isDeleted:false})
        
        if(!findJob) {
            return res.status(200).send({ status: true, message: "No job found" })
        }
        if(req.token.userId!=findJob.userId)return res.send(403).send({status:false,message:"you are unauthorized"})

        await jobModel.findOneAndUpdate({_id:jobId},{isDeleted:true})
        return res.status(200).send({ status: true, message: "successfully deleted" })
    }catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}
module.exports = {createJob,getJobs,getJobById,updateJob,deleteJob}