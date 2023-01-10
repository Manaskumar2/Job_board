const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

 const createUser = async (req,res)=>{
    try {
        let data = req.body


        let createUser= await userModel.create(data)
        return res.status(201).send({ status: true, message: "success", data: createUser })
    } catch (error) {
        return res.status(500).send({status: true,message: error.message})
    }
 }

 const userLogin = async(req,res)=>{
    try {
        let userName = req.body.email
    let password = req.body.password


    let user = await userModel.findOne({email:userName,password:password})
    if(!user){
        return res.status(400).send({status:false,message:"username or the password is not correct"})
    }
    let token = jwt.sign(
            {
                userId:user._id.toString(),
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + 10 * 60 * 60,
            },
            "job board"
        );
        res.status(201).send({ status: true, data: { token } });
    } catch (error) {
        return res.status(500).send({sattus:true, message:error.message})
    }
   
 }
 module.exports={createUser,userLogin}