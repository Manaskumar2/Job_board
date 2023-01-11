const express=require('express')
const router=express.Router()
const{createUser,userLogin} = require('../controller/userController')
const{createJob,getJobs,getJobById,updateJob,deleteJob} = require('../controller/JobController')
const{applyJob,getApplyers,updateAppliedJob,deleteAppliedJob} = require('../controller/jobApplyController')
const{auth} = require('../Middlewere/auth')





router.get('/test-me',function(req,res){
    res.send("server is sucessfull running")
})


router.post('/createUser',createUser)
router.post('/loginUser',userLogin)



router.post('/createjob/:userId',createJob)
router.get('/getJob',auth,getJobs)
router.get('/getJobById/:userId',auth,getJobById)
router.put('/updateJob/:jobId',auth,updateJob)
router.delete('/deleteJob/:jobId',auth,deleteJob)





router.post('/applyJob/:userId',auth,applyJob)
router.get('/getapplyers/:jobId',auth,getApplyers)
router.put('/updateAppliedJob/:appliedJobId',auth,updateAppliedJob)
router.delete('/deleteAppliedJob/:appliedJobId',auth,deleteAppliedJob)
module.exports=router