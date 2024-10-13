import express from "express";
import Auth from "../models/authModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await Auth.findOne({ email });
        if (user) {
            res.status(400).json({ message: "User is already Exists!" })
        }
        else {
            user = new Auth({ name, email, password });
            await user.save();

            const payload = { userId: user._id };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.status(200).json({ user_token: token })
        }
    }
    catch (e) {
        if (!res.headersSent) {
            console.log(e);
        }
    }
})

router.post('/login', async(req,res)=>{
    const {email, password} = req.body;

    try{
        const existingUser = await Auth.findOne({email});
        if(!existingUser){
            res.status(400).json({message:"user is not exist"});
        }

        let match =  await bcrypt.compare(password,existingUser.password)
        if(!match){
            res.status(400).json({message:"invalid credentials"});
        }

        const payload = {userId:existingUser._id};
        const token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:'24h'})
        res.json({token});

    }catch(e){
        if(!res.headersSent){
            console.log(e)
        }
    }
})

export default router;