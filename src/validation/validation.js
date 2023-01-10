const { default: mongoose } = require("mongoose");

const isValidElem= (data) =>{
    if (data == undefined || data == null) return false
    if (typeof(data)===String && data.trim()=="" ) return false
    return true
}

const  experience =(value)=>{
    let regx=/^(1[0-9]|[1-9]|20)$/
    return regx.test(value)
}

const isvalidReqBody=(reqBody)=>{
    return Object.keys(reqBody).length>0

}
const valid=(value)=>{
    if(typeof(value)==='undefined'||value===null)return false
    if(typeof(value)==='string'&& value.trim().length==0)return false
    return true
}
let isValidTitle =(title)=>{
    return ["Mr", "Mrs", "Miss"].indexOf(title) !== -1
}

const isValidObjectId = (ObjectId) => {
    return mongoose.Types.ObjectId.isValid(ObjectId); 
};


const isValidEmail =  (value)=> {
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value)) { return true }
    else return false

}

const isValidPassword = (value)=> {
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/.test(value)) { return true }
    else return false
}

const isMobile=  (mobile) => {
    let regex = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/
    return regex.test(mobile)
}


let isName =  (attribute) => {
    return (/^[a-zA-Z]{2,20}$/.test(attribute.trim()))
}

module.exports ={isValidElem,experience,valid,isvalidReqBody,isValidObjectId,isValidEmail,isValidPassword,isMobile,isName,isValidTitle}