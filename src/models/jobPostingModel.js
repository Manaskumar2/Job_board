const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;


const postingSchema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    skills:{
        type:[String],
        required:true,
        enum: ["JAVA", "JAVASCRIPT", "MONGODB", "NODEJS", "EXPRESS", "REACT", "AWS"],
        toUpperCase: true,
            trim: true
    },
   experience:{
    type:Number,
    required:true
   },
   email:{
    type:String,
    require:true
   },
     userId: {
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