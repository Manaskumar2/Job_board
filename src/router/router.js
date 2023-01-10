const express=require('express')
const router=express.Router()

const {createEmployer,login}= require('../controller/employerController')
const{createUser,userLogin} = require('../controller/userController')





router.get('/test-me',function(req,res){
    res.send("server is sucessfull running")
})

router.post('/employerRegister',createEmployer)

router.post('/login',login)

router.post('/createUser',createUser)
router.post('/loginUser',userLogin)


module.exports=router