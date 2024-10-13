import express from "express";
import { createStudent, deleteStudent, getStudents, updateStudent } from "../controllers/student.controller.js";
const router = express.Router()

router.get('/',getStudents);
router.post('/create', createStudent);
router.put('/update/:id',updateStudent)
router.delete('/delete/:id',deleteStudent);

export default router;