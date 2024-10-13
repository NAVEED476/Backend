import express from "express";
import mongoose from "mongoose";
import router from "./src/routes/authRoutes.js";
import dotenv from "dotenv";


const app = express();
dotenv.config();
app.use(express.json());
app.use('/api/auth', router);

mongoose.connect("mongodb+srv://usernamefound1234:interview@interview.su8sv.mongodb.net/?retryWrites=true&w=majority&appName=interview").then(()=>console.log("db connnected successfullly")).catch((e)=>console.log(e));


app.listen((5000),()=>{
    console.log("app is running")
})