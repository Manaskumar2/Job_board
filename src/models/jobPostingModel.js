const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;


const postingSchema = new mongoose.Schema({
    title:{
        type:String
    },
    discription:{
        type:String
    },
    skills:{
        type:String,
        required:true
    },
   experience:{
    type:Number,
    required:true
   },
   email:{
    type:String,
    require:true
   },
     employerId: {
        type: ObjectId,
        ref: "User",
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports = mongoose.model("Jobposting",postingSchema)