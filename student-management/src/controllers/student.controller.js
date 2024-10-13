import studentModel from "../models/studentModel.js";
import Student from "../models/studentModel.js"

export const getStudents = async (req, res) => {
    const students = await Student.find();

    res.status(200).json({ studentList: students });
}
export const createStudent = async (req,res) =>{
    const {name, email, number} = req.body;

   const newStudent = new Student({name, email, number});
   try{
    const checkExisting = await Student.findOne({email});
    if(checkExisting){
        res.status(409).json({message:"already exisinng user"})
    }
    else{
        await newStudent.save();
        res.status(201).json({message:"user created successfully"});
    }
   }catch(e){
    console.log(e);
   }
} 


export const updateStudent = async(req,res)=>{
    const {id} = req.params;
    const {name, email, number} = req.body;

    try{
        const update = await Student.findOneAndUpdate({_id:id},{name,email,number},{new:true})
        res.status(200).json(update);

    }catch(e){
        console.log(e);
    }
}


export const deleteStudent = async (req,res) =>{
    const {id} = req.params;
    try{
        const studentList = await Student.findByIdAndDelete({_id:id});
        res.status(200).json(studentList);
    }catch(e){

        console.log(e);
    }
}