import express from "express";
import mongoose  from "mongoose";
import router from "./src/routes/student.router.js";
import dotenv from "dotenv";


dotenv.config();
const app = express();
app.use(express.json());


mongoose.connect("mongodb+srv://usernamefound1234:interview@interview.su8sv.mongodb.net/?retryWrites=true&w=majority&appName=interview").then((e) => console.log("db connection is successful")).catch((e) => console.log("error connecting DB", e))

app.get("/",(req,res)=>{
    res.send("welcome to MERN app");
})
app.use('/api/student',router);

app.listen(4000, () => {
    console.log("app started")
})