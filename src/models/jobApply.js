const mongoose = require('mongoose')
 const ObjectId = mongoose.Types.ObjectId


 const applySchema = mongoose.Schema({


    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    resume:{
        type:String,
        required: true
    },
    coverLetter:{
        type:String,
        required:true
    },
    userId:{
        type: ObjectId,
        ref: "User",
        required:true

    },
     jobId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Jobposting'
        },

isDeleted:{
    type:Boolean,
    default:false
}

 },{timestamp:true})

module.exports = mongoose.model("JobApply",applySchema)