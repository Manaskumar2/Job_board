const userModel = require('../models/userModel')
const validation = require('../validation/validation')
const jwt = require('jsonwebtoken')

 const createUser = async (req,res)=>{
    try {
        let data = req.body

        if(!validation.isvalidReqBody(data)) return res.status(400).send({status:false,message:"please provide data"})
        let {title,name,email,phone,password}=data

        if(!validation.isValidTitle(title)) return res.status(400).send({status:false,message:"please provide title like -'Mr', 'Mrs', 'Miss'"})
        if(!validation.isValidName(name)) return res.status(400).send({ status: false, message: "name is not valid" })
        
        if (!validation.isValidEmail(email)) return res.status(400).send({ status: false, message: "email is not valid" })
            data.email = email.toLowerCase()

        if(!validation.isMobile(phone))  return res.status(400).send({ status: false, message: "phoneNumber is not valid" })
        if(!validation.isValidPassword(password))  return res.status(400).send({ status: false, message: "please provide strong password,it most be contain upercase,lowercase,special char,and password length should be 8-15" })


 

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