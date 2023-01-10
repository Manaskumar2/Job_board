const userModel = require('../models/userModel')
const jobModel = require('../models/jobPostingModel')
const validation = require('../validation/validation')




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
        let {title,skills,experience,pageNo} = data
        let document={
            isDeleted:false
        }
         if (title) {
            if (!validation.isName(title)) {
                return res.status(400).send({ status: false, message: 'title  is not in correct format' })
            } else {
                document.jobtitle =title
            }
        }
            if (skills) {
            if (!validation.isValidElem(size) || (["Java", "Javascript", "MongoDB", "NodeJs", "Express", "React", "AWS"].indexOf(size) == -1)) {
                return res.status(400).send({ status: false, message: 'skills should be in "Java", "Javascript", "MongoDB", "NodeJs", "Express", "React", "AWS" ' })
            } else {
                document.reqSkills = skills
            }
        }
         if(experience){
                if(!validation.experience(experience)){
                    return res.status(400).send({ status: false, message: 'please Enter experience in between "0-20"' })

                }else{
                    document.reqExperience = experience
                }

            }
            if(!pageNo){
                pageNo = 1
            }

        let jobPosting = await jobModel.find(document).skip(5*(pageNo-1)).limit(5)

        return res.status(200).send({status:true , message:"successful get job details",data:jobPosting})
        
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}
const getJobById = async (req,res)=>{
 try {

    let employerId = req.params.employerId


    if (!employerId) { return res.status(400).send({ status: false, message: "please give employer Id" }) }
    if(validation.isValidObjectId(employerId)){return res.status(400).send({status:false,message:"invalid employer id"})}
        const findId = await jobModel.find({ _id: employerId, isDeleted: false })

        if (!findId) { return res.status(404).send({ status: false, message: "No job posted By this Recruiter" }) }
        else{
            return res.status(200).send({status:true , message:"successful get job details",data:findId})
        }

    
 } catch (error) {

      return res.status(500).send({status:false,message:error.message})
 }





}

module.exports = {createJob,getJobs,getJobById}