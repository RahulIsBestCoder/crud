const express=require("express");
const app =express();
const http=require("http");
const server =http.createServer(app);
const Port =2023;
const cors =require("cors");
const bodyParser=require("body-parser");
const userRouter =require("./src/route/user");


server.listen(Port,console.log(`listening to the port ${Port}`))
const mongoose =require("mongoose")
mongoose.connect("mongodb+srv://Rahul:Rahul123@cluster0.1vx1l.mongodb.net/crud")
mongoose.connection.on("connected",connected=>{
    console.log("connected with Database");
})
mongoose.connection.on("error",error=>{
    console.log("failed to connect with database");
});
app.use(cors({orgin:true,credentials:true}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use("/",userRouter)