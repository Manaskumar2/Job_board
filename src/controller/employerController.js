const employerModel = require('../models/employerModel')
const jwt = require('jsonwebtoken')

const createEmployer = async (req,res)=>{
    try {
        let data = req.body


 const CreatedData = await employerModel.create(data)
        return res.status(201).send({ status: true, message: "success", data: CreatedData })


        
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
        
    }


}
const login = async (req,res)=>{
try {
    let userName = req.body.email;
    let password = req.body.password;

    let employer = await employerModel.findOne({ email: userName, password: password });
        if (!employer) return res.status(400).send({ status: false, msg: "username or the password is not correct", });

    

        let token = jwt.sign(
            {
                employerId:employer._id.toString(),
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + 10 * 60 * 60,
            
            },
            "job board"
        );
        res.status(201).send({ status: true, data: { token } });

    
} catch (error) {

    return res.status(500).send({ status: false, message: error.message })
}


}

module.exports ={createEmployer,login}