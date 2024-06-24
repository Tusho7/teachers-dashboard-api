import express from "express";
import {
  add_student,
  getStudents,
  getEntrantStudents,
  fromAboadStudents,
  getStudentsByPaymentStatus,
  update_student,
  total_students
} from "../controllers/studentsController.js";

const router = express.Router();

router.get("/get_students", getStudents);
router.get("/entrant_students", getEntrantStudents);
router.get("/abroad_students", fromAboadStudents);
router.get("/get_students/payment_status/:status", getStudentsByPaymentStatus);
router.get("/total_students", total_students);
router.post("/add_student", add_student);
router.put("/update_student/:studentId", update_student);

export default router;
