import express from 'express';
import { add_student, getStudents } from '../controllers/studentsController.js';

const router = express.Router();

router.get("/get_students", getStudents)
router.post("/add_student", add_student)

export default router;