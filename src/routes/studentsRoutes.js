import express from 'express';
import { add_student, getStudents, getEntrantStudents, fromAboadStudents } from '../controllers/studentsController.js';

const router = express.Router();

router.get("/get_students", getStudents)
router.get("/entrant_students", getEntrantStudents)
router.get("/abroad_students", fromAboadStudents)
router.post("/add_student", add_student)

export default router;