const express = require('express')
const route = require("./router/router")
const mongoose = require('mongoose')

const app =express();

 app.use(express.json())

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://manaskumar:iFVJhjYrsH7iars8@cluster0.s4pqkzd.mongodb.net/Job_board?retryWrites=true&w=majority",
{
    useNewUrlparser:true
}
)
.then(()=>console.log("MongoDb connected"))
.catch((err)=>console.log(err))

app.use("/",route);

app.listen(process.env.PORT|| 3000,function(){
    console.log("Port running on "+(process.env.PORT||3000));
});
